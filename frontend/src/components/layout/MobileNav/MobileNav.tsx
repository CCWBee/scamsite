/**
 * MobileNav Component
 *
 * A slide-in navigation drawer for mobile devices that provides accessible
 * navigation for ScamAware Jersey. Features smooth animations, focus trap,
 * backdrop overlay, and comprehensive keyboard support.
 *
 * ## Features
 * - Slide-in animation from right side (300ms, respects reduced-motion)
 * - Semi-transparent backdrop overlay (click to close)
 * - Focus trap when open (Tab cycles through drawer elements)
 * - Close on Escape key press
 * - Prevents body scroll when open
 * - Full height, fixed position (z-modal: 1050)
 * - Active state styling for current page
 * - Highlighted emergency help link
 *
 * ## Accessibility
 * - role="dialog" with aria-modal="true"
 * - aria-label="Navigation menu"
 * - Focus first focusable element when opened
 * - Return focus to trigger when closed
 * - Full keyboard navigation support
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <MobileNav
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   navItems={[
 *     { label: 'Home', href: '/' },
 *     { label: 'About', href: '/about' },
 *     { label: 'Emergency Help', href: '/help/ive-been-scammed', highlight: true },
 *   ]}
 * />
 * ```
 */

"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { NavItem } from "@/components/layout/Header";

/**
 * Props for the MobileNav component
 */
export interface MobileNavProps {
  /**
   * Whether the drawer is currently open
   */
  isOpen: boolean;

  /**
   * Callback function to close the drawer
   */
  onClose: () => void;

  /**
   * Array of navigation items to display
   */
  navItems: NavItem[];

  /**
   * Additional CSS classes to apply to the drawer container
   */
  className?: string;

  /**
   * The current pathname for active state detection.
   * If not provided, will be auto-detected using usePathname().
   */
  currentPath?: string;
}

/**
 * Determines if a navigation item is active based on the current path
 * @param href - The navigation item's href
 * @param currentPath - The current pathname
 * @returns Whether the navigation item should be marked as active
 */
function isNavItemActive(href: string, currentPath: string): boolean {
  // Exact match for home
  if (href === "/") {
    return currentPath === "/";
  }
  // For other routes, check if current path starts with the href
  return currentPath.startsWith(href);
}

/**
 * Get all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors));
}

/**
 * MobileNav Component
 *
 * A slide-in navigation drawer for mobile devices with full accessibility support.
 * Automatically detects active navigation item based on current path.
 */
export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  navItems,
  className = "",
  currentPath,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Get current pathname for active state detection
  const pathname = usePathname();
  const activePath = currentPath ?? pathname;

  /**
   * Handle Escape key press to close the drawer
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      // Focus trap: cycle through focusable elements
      if (event.key === "Tab" && drawerRef.current) {
        const focusableElements = getFocusableElements(drawerRef.current);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab: moving backward
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab: moving forward
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    },
    [onClose]
  );

  /**
   * Handle nav link click - close drawer and allow navigation
   */
  const handleNavLinkClick = () => {
    onClose();
  };

  /**
   * Effect: Manage focus and body scroll when drawer opens/closes
   */
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element to restore later
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Focus the close button when drawer opens
      // Use setTimeout to ensure the element is rendered
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);

      // Add keyboard event listener
      document.addEventListener("keydown", handleKeyDown);
    } else {
      // Restore body scroll
      document.body.style.overflow = "";

      // Return focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }

      // Remove keyboard event listener
      document.removeEventListener("keydown", handleKeyDown);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Don't render anything if not open (for cleaner DOM)
  // Using CSS visibility/opacity for animation, but the component still needs to be in DOM
  // Actually, we need it in DOM for animation, so we'll use CSS to control visibility

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`
          fixed inset-0 z-modal-backdrop bg-black/50
          transition-opacity duration-300
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          motion-reduce:transition-none
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Navigation drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        id="mobile-menu"
        className={`
          fixed top-0 right-0 z-modal h-full w-80 max-w-[85vw]
          bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          motion-reduce:transition-none
          ${className}
        `.trim()}
      >
        <div className="flex h-full flex-col">
          {/* Header with close button */}
          <div className="flex items-center justify-end p-4 border-b border-[var(--color-navy-100)]">
            <Button
              ref={closeButtonRef}
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <Icon name="X" size="lg" aria-hidden />
            </Button>
          </div>

          {/* Logo section */}
          <div className="px-4 py-6 border-b border-[var(--color-navy-100)]">
            <Link
              href="/"
              className="flex items-center gap-3 text-[var(--color-navy)] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-trust-blue)]"
              onClick={handleNavLinkClick}
              aria-label="ScamAware Jersey - Home"
            >
              <Icon name="Shield" size="lg" aria-hidden />
              <span className="text-lg font-bold">ScamAware Jersey</span>
            </Link>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = item.active ?? isNavItemActive(item.href, activePath);
                const isHighlighted = item.highlight;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleNavLinkClick}
                      className={`
                        flex items-center justify-between px-4 py-3
                        text-base font-medium
                        transition-colors duration-[var(--transition-fast)]
                        focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-trust-blue)]
                        ${
                          isHighlighted
                            ? isActive
                              ? "bg-[var(--color-alert-red)] text-white border-l-4 border-[var(--color-alert-red-700)]"
                              : "bg-[var(--color-alert-red-50)] text-[var(--color-alert-red-700)] hover:bg-[var(--color-alert-red)] hover:text-white"
                            : isActive
                              ? "bg-[var(--color-navy-50)] text-[var(--color-navy)] border-l-4 border-[var(--color-navy)]"
                              : "text-[var(--color-navy-700)] hover:bg-[var(--color-navy-50)] hover:text-[var(--color-navy)]"
                        }
                      `.trim()}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span>{item.label}</span>
                      <Icon
                        name={isHighlighted ? "TriangleAlert" : "ChevronRight"}
                        size="sm"
                        className={isHighlighted ? "" : "text-[var(--color-navy-400)]"}
                        aria-hidden
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Emergency contact footer */}
          <div className="mt-auto border-t border-[var(--color-navy-100)] p-4">
            <a
              href="tel:01534612612"
              className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-alert-red-50)] text-[var(--color-alert-red-700)] font-medium transition-colors hover:bg-[var(--color-alert-red-100)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-alert-red)]"
            >
              <Icon name="Phone" size="md" aria-hidden />
              <span>Emergency: 01534 612612</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

MobileNav.displayName = "MobileNav";

export default MobileNav;

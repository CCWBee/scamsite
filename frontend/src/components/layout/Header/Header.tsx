/**
 * Header Component
 *
 * A responsive header component for ScamAware Jersey with navigation.
 * Features sticky positioning, logo with Shield icon, and mobile hamburger menu.
 *
 * ## Layout
 * - Desktop (md+): Logo on left, horizontal navigation links on right
 * - Mobile (<md): Logo on left, hamburger menu button on right
 *
 * ## Accessibility
 * - Uses semantic nav landmark
 * - Skip link target (id="main-nav")
 * - Proper aria-labels for interactive elements
 * - Keyboard navigable links
 *
 * @example
 * ```tsx
 * // Basic usage with default navigation
 * <Header />
 *
 * // With custom navigation items
 * <Header navItems={[
 *   { label: 'Home', href: '/', active: true },
 *   { label: 'About', href: '/about' },
 * ]} />
 *
 * // With mobile menu control
 * const [isOpen, setIsOpen] = useState(false);
 * <Header
 *   isMobileMenuOpen={isOpen}
 *   onMobileMenuToggle={() => setIsOpen(!isOpen)}
 * />
 * ```
 */

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Navigation item interface
 */
export interface NavItem {
  /** Display label for the navigation item */
  label: string;
  /** URL path the navigation item links to */
  href: string;
  /** Whether this navigation item represents the current page */
  active?: boolean;
}

/**
 * Props for the Header component
 */
export interface HeaderProps {
  /**
   * Array of navigation items to display.
   * If not provided, uses default navigation items.
   */
  navItems?: NavItem[];

  /**
   * Callback function triggered when mobile menu toggle is clicked.
   * Used to control the mobile menu open/close state.
   */
  onMobileMenuToggle?: () => void;

  /**
   * Whether the mobile menu is currently open.
   * Controls the hamburger/X icon display.
   * @default false
   */
  isMobileMenuOpen?: boolean;

  /**
   * Additional CSS classes to apply to the header element.
   */
  className?: string;
}

/**
 * Default navigation items for ScamAware Jersey
 */
const defaultNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Scam Types", href: "/scams" },
  { label: "Warning Signs", href: "/warning-signs" },
  { label: "Get Help", href: "/help" },
  { label: "Resources", href: "/resources" },
];

/**
 * Header Component
 *
 * Responsive header with logo, navigation, and mobile menu support.
 * Implements sticky positioning and proper accessibility features.
 */
export const Header: React.FC<HeaderProps> = ({
  navItems = defaultNavItems,
  onMobileMenuToggle,
  isMobileMenuOpen = false,
  className = "",
}) => {
  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white shadow-sm ${className}`.trim()}
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-6">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--color-navy)] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-trust-blue)]"
          aria-label="ScamAware Jersey - Home"
        >
          <Icon name="Shield" size="lg" aria-hidden />
          <span className="text-lg font-bold md:text-xl">ScamAware Jersey</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          id="main-nav"
          className="hidden md:flex md:items-center md:gap-1"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium
                transition-colors duration-[var(--transition-fast)]
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-trust-blue)]
                ${
                  item.active
                    ? "bg-[var(--color-navy-50)] text-[var(--color-navy)]"
                    : "text-[var(--color-navy-700)] hover:bg-[var(--color-navy-50)] hover:text-[var(--color-navy)]"
                }
              `.trim()}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileMenuToggle}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Icon
              name={isMobileMenuOpen ? "X" : "Menu"}
              size="lg"
              aria-hidden
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

Header.displayName = "Header";

export default Header;

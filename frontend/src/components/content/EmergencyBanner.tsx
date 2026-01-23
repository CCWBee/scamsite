/**
 * EmergencyBanner Component
 *
 * A high-visibility banner for scam victim emergency guidance.
 * Designed to catch attention and direct users who have already fallen victim
 * to scams toward immediate help resources.
 *
 * Features:
 * - High-visibility alert-red (#c8102e) background with white text
 * - Links to emergency guidance page (/help/ive-been-scammed)
 * - Dismissible option with X button
 * - Dismissed state stored in sessionStorage (reappears on new session)
 * - Full-width sticky position option
 * - WCAG 2.1 AA compliant contrast ratios
 *
 * @example
 * ```tsx
 * // Basic usage - non-dismissible
 * <EmergencyBanner />
 *
 * // Dismissible banner
 * <EmergencyBanner dismissible onDismiss={() => console.log('dismissed')} />
 *
 * // Custom text and link
 * <EmergencyBanner
 *   text="Think you've been scammed?"
 *   linkText="Get help now"
 *   href="/help/emergency"
 *   dismissible
 * />
 *
 * // Sticky positioning at top of page
 * <EmergencyBanner sticky dismissible />
 * ```
 *
 * @accessibility
 * - Uses role="alert" for screen reader announcements
 * - Proper color contrast (white on alert-red meets WCAG AA 4.64:1)
 * - Focus-visible states for keyboard navigation
 * - Dismiss button has accessible label
 */

"use client";

import React, { useState, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { X, AlertTriangle, ChevronRight } from "@/components/ui/Icon";

/**
 * Storage key for dismissed state in sessionStorage
 */
const STORAGE_KEY = "scamaware-emergency-banner-dismissed";

/**
 * Helper to safely get session storage value
 */
function getSessionStorageValue(key: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const item = window.sessionStorage.getItem(key);
    return item !== null ? (JSON.parse(item) as boolean) : false;
  } catch {
    return false;
  }
}

/**
 * Helper to safely set session storage value
 */
function setSessionStorageValue(key: string, value: boolean): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting sessionStorage key "${key}":`, error);
  }
}

/**
 * Custom hook for managing sessionStorage state using useSyncExternalStore
 * Handles SSR gracefully and avoids hydration mismatches
 *
 * @param key - Storage key
 * @returns Tuple of [value, setValue] similar to useState
 */
function useSessionStorage(
  key: string
): [boolean, (value: boolean) => void] {
  // Create stable references for subscribe and getSnapshot
  const subscribe = useCallback(
    (callback: () => void) => {
      // Listen for storage events (cross-tab synchronization)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === key) {
          callback();
        }
      };
      window.addEventListener("storage", handleStorageChange);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    },
    [key]
  );

  const getSnapshot = useCallback(() => {
    return getSessionStorageValue(key);
  }, [key]);

  const getServerSnapshot = useCallback(() => {
    // Always return false on server to avoid hydration mismatch
    return false;
  }, []);

  // Use useSyncExternalStore for safe external state synchronization
  const storedValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Setter function that updates sessionStorage and triggers re-render
  const setValue = useCallback(
    (value: boolean) => {
      setSessionStorageValue(key, value);
      // Dispatch a storage event to trigger re-render
      // This is needed because the storage event only fires in other tabs
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: JSON.stringify(value),
        })
      );
    },
    [key]
  );

  return [storedValue, setValue];
}

/**
 * Props for the EmergencyBanner component
 */
export interface EmergencyBannerProps {
  /**
   * The main message text displayed in the banner
   * @default "Already given money or personal details? Act now"
   */
  text?: string;

  /**
   * The text for the call-to-action link
   * @default "Get emergency help"
   */
  linkText?: string;

  /**
   * The URL the banner links to
   * @default "/help/ive-been-scammed"
   */
  href?: string;

  /**
   * Whether the banner can be dismissed by the user
   * When true, shows an X button to close the banner
   * Dismissed state is stored in sessionStorage
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback function called when the banner is dismissed
   * Only called if dismissible is true
   */
  onDismiss?: () => void;

  /**
   * Whether the banner should be sticky at the top of the viewport
   * @default false
   */
  sticky?: boolean;

  /**
   * Additional CSS classes to apply to the banner container
   */
  className?: string;
}

/**
 * EmergencyBanner Component
 *
 * A high-visibility banner designed to help scam victims quickly find
 * emergency assistance. Uses alert-red background for maximum visibility
 * and urgency, following JFSC design guidelines.
 *
 * The banner is designed to be non-intrusive for regular users while
 * being immediately visible to those who need urgent help.
 */
export function EmergencyBanner({
  text = "Already given money or personal details? Act now",
  linkText = "Get emergency help",
  href = "/help/ive-been-scammed",
  dismissible = false,
  onDismiss,
  sticky = false,
  className = "",
}: EmergencyBannerProps) {
  // Track dismissed state in sessionStorage
  const [isDismissed, setIsDismissed] = useSessionStorage(STORAGE_KEY);

  // Track animation state for smooth dismiss
  const [isAnimating, setIsAnimating] = useState(false);

  /**
   * Handle dismiss action with animation
   */
  const handleDismiss = useCallback(() => {
    setIsAnimating(true);
    // Wait for animation to complete before updating state
    setTimeout(() => {
      setIsDismissed(true);
      onDismiss?.();
    }, 150); // Match CSS transition duration
  }, [setIsDismissed, onDismiss]);

  // Don't render if dismissed
  if (isDismissed) {
    return null;
  }

  // Build container styles
  const containerStyles = [
    // Base layout
    "w-full",
    // Background color - alert-red for high visibility
    "bg-alert-red",
    // Text color - white for contrast
    "text-white",
    // Padding
    "py-3 px-4",
    // Sticky positioning (optional)
    sticky ? "sticky top-0 z-sticky" : "",
    // Transitions for smooth dismiss
    "transition-all duration-150 ease-in-out",
    // Animation state
    isAnimating ? "opacity-0 transform -translate-y-full" : "opacity-100",
    // Custom classes
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Build inner wrapper styles
  const innerStyles = [
    // Center content with max-width
    "max-w-content mx-auto",
    // Flex layout for content alignment
    "flex items-center justify-between gap-4",
    // Responsive layout
    "flex-wrap sm:flex-nowrap",
  ].join(" ");

  // Build link styles
  const linkStyles = [
    // Layout
    "inline-flex items-center gap-1",
    // Typography
    "font-semibold text-sm sm:text-base",
    // Colors - white text with underline on hover
    "text-white",
    "underline underline-offset-2",
    // Focus styles for accessibility
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    "rounded-sm",
    // Hover state
    "hover:opacity-90",
    // Transitions
    "transition-opacity duration-150",
  ].join(" ");

  // Build dismiss button styles
  const dismissStyles = [
    // Layout
    "flex-shrink-0",
    "p-1.5",
    // Shape
    "rounded-md",
    // Colors
    "text-white",
    // Hover state - subtle background
    "hover:bg-white/20",
    // Focus styles for accessibility
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    // Transitions
    "transition-colors duration-150",
  ].join(" ");

  return (
    <div
      role="alert"
      aria-live="polite"
      className={containerStyles}
    >
      <div className={innerStyles}>
        {/* Icon and text content */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <AlertTriangle
            size={20}
            className="flex-shrink-0 hidden sm:block"
            aria-hidden="true"
          />
          <span className="text-sm sm:text-base font-medium">
            {text}
          </span>
        </div>

        {/* Call-to-action link */}
        <Link href={href} className={linkStyles}>
          <span>{linkText}</span>
          <ChevronRight
            size={16}
            className="flex-shrink-0"
            aria-hidden="true"
          />
        </Link>

        {/* Dismiss button (optional) */}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={dismissStyles}
            aria-label="Dismiss emergency banner"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

// Display name for React DevTools
EmergencyBanner.displayName = "EmergencyBanner";

export default EmergencyBanner;

/**
 * Button Component
 *
 * A fully-featured button component for ScamAware Jersey that supports:
 * - Multiple visual variants (primary, secondary, danger, ghost)
 * - Three sizes (sm, md, lg)
 * - Loading and disabled states
 * - Left and right icon slots
 * - Full width option
 * - Ref forwarding for advanced use cases
 *
 * Accessibility features:
 * - Proper focus-visible ring for keyboard navigation
 * - aria-disabled for screen readers
 * - aria-busy during loading state
 * - Disabled buttons remain in tab order for discoverability
 *
 * @example
 * // Primary button (default)
 * <Button>Click me</Button>
 *
 * @example
 * // Secondary button with icon
 * <Button variant="secondary" leftIcon={<SearchIcon />}>Search</Button>
 *
 * @example
 * // Loading state
 * <Button loading>Submitting...</Button>
 */

import React, { forwardRef } from "react";

/**
 * Props for the Button component
 */
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  /**
   * Visual variant of the button
   * - primary: Navy background, white text (main CTAs)
   * - secondary: Trust-blue outline, trust-blue text
   * - danger: Alert-red background, white text
   * - ghost: Transparent, navy text, subtle hover
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "danger" | "ghost";

  /**
   * Size of the button
   * - sm: Small (text-sm, px-3 py-1.5)
   * - md: Medium (text-base, px-4 py-2) - default
   * - lg: Large (text-lg, px-6 py-3)
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the button is disabled
   * When disabled, the button has reduced opacity and doesn't respond to interactions
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button is in a loading state
   * Shows a spinner and prevents interactions
   * @default false
   */
  loading?: boolean;

  /**
   * Icon to display on the left side of the button text
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right side of the button text
   */
  rightIcon?: React.ReactNode;

  /**
   * Whether the button should take full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * HTML button type attribute
   * @default "button"
   */
  type?: "button" | "submit" | "reset";

  /**
   * Button content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * Loading spinner component
 * Displays an animated spinner during loading state
 */
const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={`animate-spin ${className || ""}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Style mappings for button variants
 * Uses CSS custom properties for consistency with design system
 */
const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: [
    // Background and text colors
    "bg-[var(--color-navy)] text-white",
    // Hover state
    "hover:bg-[var(--color-navy-800)]",
    // Active/pressed state
    "active:bg-[var(--color-navy-950)]",
  ].join(" "),

  secondary: [
    // Outline style with trust-blue
    "bg-transparent text-[var(--color-trust-blue)]",
    "border-2 border-[var(--color-trust-blue)]",
    // Hover state - filled background
    "hover:bg-[var(--color-trust-blue)] hover:text-white",
    // Active/pressed state
    "active:bg-[var(--color-trust-blue-700)]",
  ].join(" "),

  danger: [
    // Alert-red background
    "bg-[var(--color-alert-red)] text-white",
    // Hover state
    "hover:bg-[var(--color-alert-red-700)]",
    // Active/pressed state
    "active:bg-[var(--color-alert-red-800)]",
  ].join(" "),

  ghost: [
    // Transparent with navy text
    "bg-transparent text-[var(--color-navy)]",
    // Hover state - subtle background
    "hover:bg-[var(--color-navy-50)]",
    // Active/pressed state
    "active:bg-[var(--color-navy-100)]",
  ].join(" "),
};

/**
 * Style mappings for button sizes
 */
const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
};

/**
 * Icon size mappings based on button size
 */
const iconSizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

/**
 * Button Component
 *
 * A versatile button component that follows ScamAware Jersey design guidelines.
 * Supports multiple variants, sizes, and states for various use cases.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      type = "button",
      children,
      className = "",
      onClick,
      ...props
    },
    ref
  ) => {
    // Determine if button should be non-interactive
    const isDisabled = disabled || loading;

    // Build base styles
    const baseStyles = [
      // Layout and alignment
      "inline-flex items-center justify-center gap-2",
      // Typography
      "font-semibold",
      // Shape
      "rounded-[var(--radius-md)]",
      // Transitions
      "transition-all duration-[var(--transition-fast)]",
      // Focus styles for accessibility (focus-visible for keyboard only)
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-trust-blue)]",
      "focus-visible:ring-2 focus-visible:ring-[var(--color-trust-blue)] focus-visible:ring-offset-2",
      // Disabled/loading styles
      isDisabled
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : "cursor-pointer",
      // Full width option
      fullWidth ? "w-full" : "",
    ].join(" ");

    // Handle click - prevent if disabled or loading
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type={type}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        onClick={handleClick}
        {...props}
      >
        {/* Loading spinner or left icon */}
        {loading ? (
          <LoadingSpinner className={iconSizes[size]} />
        ) : leftIcon ? (
          <span className={`flex-shrink-0 ${iconSizes[size]}`} aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}

        {/* Button text content */}
        <span>{children}</span>

        {/* Right icon (hidden during loading) */}
        {rightIcon && !loading && (
          <span className={`flex-shrink-0 ${iconSizes[size]}`} aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {/* Screen reader loading text */}
        {loading && <span className="sr-only">Loading, please wait...</span>}
      </button>
    );
  }
);

// Display name for React DevTools
Button.displayName = "Button";

export default Button;

/**
 * Example Component
 *
 * A simple demonstration component to verify Storybook setup.
 * This component showcases:
 * - TypeScript props typing
 * - Tailwind CSS styling with design tokens
 * - Accessibility best practices
 * - Multiple visual variants
 *
 * This component can be safely removed once the Storybook setup is verified
 * and real components are created.
 */

import React from "react";

/**
 * Props for the Example component
 */
export interface ExampleProps {
  /**
   * The text content to display
   */
  label: string;

  /**
   * Visual variant of the component
   * - primary: Uses trust-blue (main call-to-action)
   * - secondary: Uses navy (secondary actions)
   * - danger: Uses alert-red (destructive/warning actions)
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "danger";

  /**
   * Size of the component
   * - small: Compact size for tight spaces
   * - medium: Default size for most uses
   * - large: Prominent size for emphasis
   * @default "medium"
   */
  size?: "small" | "medium" | "large";

  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Style mappings for variants
 * Uses CSS custom properties defined in globals.css for consistency
 */
const variantStyles: Record<NonNullable<ExampleProps["variant"]>, string> = {
  primary:
    "bg-[var(--color-trust-blue)] hover:bg-[var(--color-trust-blue-700)] text-white",
  secondary:
    "bg-[var(--color-navy)] hover:bg-[var(--color-navy-800)] text-white",
  danger:
    "bg-[var(--color-alert-red)] hover:bg-[var(--color-alert-red-700)] text-white",
};

/**
 * Style mappings for sizes
 */
const sizeStyles: Record<NonNullable<ExampleProps["size"]>, string> = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

/**
 * Example Component
 *
 * A button-like element demonstrating ScamAware Jersey design tokens
 * and Storybook integration.
 */
export function Example({
  label,
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
}: ExampleProps) {
  const baseStyles = [
    // Base layout and typography
    "inline-flex items-center justify-center",
    "font-semibold",
    "rounded-[var(--radius-md)]",
    // Transitions
    "transition-colors duration-[var(--transition-fast)]",
    // Focus styles for accessibility
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-trust-blue)]",
    // Disabled styles
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
  ].join(" ");

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Example;

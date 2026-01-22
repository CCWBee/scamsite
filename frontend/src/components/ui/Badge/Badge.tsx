/**
 * Badge Component
 *
 * A status indicator and label component for ScamAware Jersey.
 * Used for:
 * - Danger level indicators on scam types (HIGH, MODERATE, LOW)
 * - Category labels
 * - Status indicators
 *
 * Features:
 * - Multiple semantic variants (info, success, warning, danger, neutral)
 * - Two sizes (sm, md)
 * - Optional dot indicator for status visualization
 * - Accessible by default with proper semantic markup
 */

import React from "react";

/**
 * Props for the Badge component
 */
export interface BadgeProps {
  /**
   * Visual variant determining the color scheme
   * - info: Trust-blue for informational content
   * - success: Green for positive/verified status
   * - warning: Amber for moderate warnings
   * - danger: Red for high-risk indicators
   * - neutral: Gray for generic labels
   * @default "neutral"
   */
  variant?: "info" | "success" | "warning" | "danger" | "neutral";

  /**
   * Size of the badge
   * - sm: Smaller text, less padding (for inline use)
   * - md: Default size
   * @default "md"
   */
  size?: "sm" | "md";

  /**
   * Shows a colored dot indicator before text
   * Useful for status visualization
   * @default false
   */
  dot?: boolean;

  /**
   * The content to display inside the badge
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * Style mappings for variants
 * Each variant uses subtle background with matching text color for readability
 */
const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  info: "bg-trust-blue-50 text-trust-blue-700",
  success: "bg-success-50 text-success-700",
  warning: "bg-warning-50 text-warning-800",
  danger: "bg-alert-red-50 text-alert-red-700",
  neutral: "bg-gray-100 text-gray-700",
};

/**
 * Dot color mappings for variants
 */
const dotStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  info: "bg-trust-blue-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  danger: "bg-alert-red-600",
  neutral: "bg-gray-500",
};

/**
 * Style mappings for sizes
 */
const sizeStyles: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

/**
 * Dot size mappings
 */
const dotSizeStyles: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
};

/**
 * Badge Component
 *
 * A pill-shaped label component for displaying status indicators and categories.
 * Follows JFSC design guidelines with accessible color combinations.
 *
 * @example
 * // Danger level badge
 * <Badge variant="danger">HIGH RISK</Badge>
 *
 * @example
 * // Status badge with dot
 * <Badge variant="warning" dot>MODERATE</Badge>
 *
 * @example
 * // Small inline badge
 * <Badge variant="success" size="sm">Verified</Badge>
 */
export function Badge({
  variant = "neutral",
  size = "md",
  dot = false,
  children,
  className = "",
}: BadgeProps) {
  const baseStyles = [
    // Layout and shape
    "inline-flex items-center gap-1.5",
    "rounded-full",
    // Typography
    "font-medium",
    "leading-none",
    // Ensure proper vertical alignment
    "whitespace-nowrap",
  ].join(" ");

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      role="status"
    >
      {dot && (
        <span
          className={`${dotStyles[variant]} ${dotSizeStyles[size]} rounded-full flex-shrink-0`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export default Badge;

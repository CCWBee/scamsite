/**
 * Skeleton Component
 *
 * A base skeleton component with shimmer animation for loading placeholders.
 * This component provides:
 * - Customizable width and height
 * - Multiple border-radius options
 * - Shimmer animation with prefers-reduced-motion support
 * - Full accessibility with aria attributes
 *
 * Usage:
 * <Skeleton width={200} height={20} rounded="md" />
 */

import React from "react";

/**
 * Props for the Skeleton component
 */
export interface SkeletonProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;

  /**
   * Width of the skeleton
   * Can be a number (pixels) or a string (e.g., "100%", "10rem")
   */
  width?: string | number;

  /**
   * Height of the skeleton
   * Can be a number (pixels) or a string (e.g., "100%", "2rem")
   */
  height?: string | number;

  /**
   * Border radius variant
   * @default "md"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

/**
 * Border radius mappings using CSS custom properties
 */
const roundedStyles: Record<NonNullable<SkeletonProps["rounded"]>, string> = {
  none: "rounded-none",
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  full: "rounded-full",
};

/**
 * Skeleton Component
 *
 * Renders an animated placeholder element for loading states.
 * The shimmer animation creates a moving highlight effect that
 * indicates content is being loaded.
 */
export function Skeleton({
  className = "",
  width,
  height,
  rounded = "md",
}: SkeletonProps) {
  // Convert numeric dimensions to pixel strings
  const widthStyle = typeof width === "number" ? `${width}px` : width;
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  const baseStyles = [
    // Background color
    "bg-[var(--color-gray-200)]",
    // Shimmer animation gradient
    "skeleton-shimmer",
    // Border radius
    roundedStyles[rounded],
  ].join(" ");

  return (
    <div
      className={`${baseStyles} ${className}`}
      style={{
        width: widthStyle,
        height: heightStyle,
      }}
      aria-busy="true"
      aria-label="Loading..."
      role="status"
    />
  );
}

export default Skeleton;

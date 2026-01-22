/**
 * SkeletonButton Component
 *
 * A skeleton component for button placeholders with
 * size variants matching the design system.
 *
 * Usage:
 * <SkeletonButton size="md" />
 * <SkeletonButton size="lg" width={200} />
 */

import React from "react";
import { Skeleton } from "./Skeleton";

/**
 * Props for the SkeletonButton component
 */
export interface SkeletonButtonProps {
  /**
   * Size variant matching button component sizes
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Custom width override
   * Can be a number (pixels) or a string (e.g., "100%", "10rem")
   * If not provided, uses default width based on size
   */
  width?: string | number;
}

/**
 * Size dimension mappings
 * Matches the button component's sizing
 */
const sizeConfig: Record<
  NonNullable<SkeletonButtonProps["size"]>,
  { height: number; defaultWidth: number }
> = {
  sm: { height: 32, defaultWidth: 80 },
  md: { height: 40, defaultWidth: 100 },
  lg: { height: 48, defaultWidth: 120 },
};

/**
 * SkeletonButton Component
 *
 * Renders a button-shaped skeleton with proper sizing
 * to match the actual button components.
 */
export function SkeletonButton({
  size = "md",
  width,
}: SkeletonButtonProps) {
  const config = sizeConfig[size];
  const buttonWidth = width ?? config.defaultWidth;

  return (
    <Skeleton
      width={buttonWidth}
      height={config.height}
      rounded="md"
    />
  );
}

export default SkeletonButton;

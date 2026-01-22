/**
 * SkeletonText Component
 *
 * A skeleton component optimized for text placeholders.
 * Renders multiple lines with varying widths for a natural look.
 *
 * Usage:
 * <SkeletonText lines={3} />
 */

import React from "react";
import { Skeleton } from "./Skeleton";

/**
 * Props for the SkeletonText component
 */
export interface SkeletonTextProps {
  /**
   * Number of text lines to render
   * @default 3
   */
  lines?: number;

  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
}

/**
 * Generate varying widths for text lines
 * Makes the skeleton look more natural by varying line lengths
 *
 * @param index - The line index
 * @param total - Total number of lines
 * @returns Width as a percentage string
 */
function getLineWidth(index: number, total: number): string {
  // Last line is typically shorter
  if (index === total - 1 && total > 1) {
    return "60%";
  }
  // Alternate between full and slightly shorter lines
  return index % 2 === 0 ? "100%" : "92%";
}

/**
 * SkeletonText Component
 *
 * Renders multiple skeleton lines to represent loading text content.
 * Line widths vary naturally, with the last line being shorter.
 */
export function SkeletonText({ lines = 3, className = "" }: SkeletonTextProps) {
  return (
    <div
      className={`flex flex-col gap-2 ${className}`}
      aria-busy="true"
      aria-label="Loading text content..."
      role="status"
    >
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          width={getLineWidth(index, lines)}
          height={16}
          rounded="sm"
        />
      ))}
    </div>
  );
}

export default SkeletonText;

/**
 * SkeletonCard Component
 *
 * A skeleton component for card placeholders with optional image
 * and configurable text lines.
 *
 * Usage:
 * <SkeletonCard hasImage={true} lines={3} />
 */

import React from "react";
import { Skeleton } from "./Skeleton";
import { SkeletonText } from "./SkeletonText";

/**
 * Props for the SkeletonCard component
 */
export interface SkeletonCardProps {
  /**
   * Whether to include an image placeholder at the top
   * @default true
   */
  hasImage?: boolean;

  /**
   * Number of text lines to show
   * @default 3
   */
  lines?: number;

  /**
   * Additional CSS classes to apply to the card container
   */
  className?: string;
}

/**
 * SkeletonCard Component
 *
 * Renders a card-shaped skeleton with:
 * - Optional image placeholder (16:9 aspect ratio)
 * - Title placeholder
 * - Text lines for description
 */
export function SkeletonCard({
  hasImage = true,
  lines = 3,
  className = "",
}: SkeletonCardProps) {
  return (
    <div
      className={`
        bg-white
        rounded-[var(--radius-lg)]
        shadow-[var(--shadow-card)]
        overflow-hidden
        ${className}
      `}
      aria-busy="true"
      aria-label="Loading card content..."
      role="status"
    >
      {/* Image placeholder with 16:9 aspect ratio */}
      {hasImage && (
        <Skeleton
          width="100%"
          height={0}
          rounded="none"
          className="pb-[56.25%]"
        />
      )}

      {/* Content area with padding */}
      <div className="p-4 space-y-3">
        {/* Title placeholder */}
        <Skeleton
          width="75%"
          height={24}
          rounded="sm"
        />

        {/* Text lines */}
        <SkeletonText lines={lines} />
      </div>
    </div>
  );
}

export default SkeletonCard;

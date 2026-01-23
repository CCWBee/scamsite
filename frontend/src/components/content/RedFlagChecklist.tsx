/**
 * RedFlagChecklist Component
 *
 * A checklist component for displaying scam red flags with visual warning indicators.
 * Used to help users identify potential scam characteristics through a clear,
 * visually distinct checklist format.
 *
 * Features:
 * - Warning triangle icon (alert-red) for each item
 * - Flag text prominently displayed
 * - Optional expandable detail (accordion style)
 * - List variant: vertical stack layout
 * - Grid variant: 2-column layout on desktop
 * - Subtle background on each item
 * - Smooth expand/collapse animation
 * - Full keyboard accessibility
 * - ARIA attributes for screen readers
 * - Respects prefers-reduced-motion
 *
 * @example
 * ```tsx
 * // Basic list usage
 * <RedFlagChecklist
 *   flags={[
 *     { id: '1', text: 'Unsolicited contact' },
 *     { id: '2', text: 'Pressure to act quickly' },
 *   ]}
 * />
 *
 * // Grid layout with expandable details
 * <RedFlagChecklist
 *   flags={[
 *     {
 *       id: '1',
 *       text: 'Requests for personal information',
 *       detail: 'Legitimate organizations rarely ask for passwords or PINs.',
 *     },
 *     {
 *       id: '2',
 *       text: 'Too good to be true offers',
 *       detail: 'If an offer seems unrealistically beneficial, it likely is.',
 *     },
 *   ]}
 *   expandable
 *   variant="grid"
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic list markup for screen readers
 * - Expandable items use button role with aria-expanded
 * - aria-controls links buttons to expandable content
 * - Focus visible outlines for keyboard navigation
 * - Motion-reduced transitions for users with vestibular disorders
 */

"use client";

import React, { useState, useId, useCallback } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Individual red flag item data structure
 */
export interface RedFlag {
  /**
   * Unique identifier for the red flag
   */
  id: string;

  /**
   * The main warning text to display
   */
  text: string;

  /**
   * Optional detailed explanation shown when expanded
   */
  detail?: string;
}

/**
 * Props for the RedFlagChecklist component
 */
export interface RedFlagChecklistProps {
  /**
   * Array of red flag items to display
   */
  flags: RedFlag[];

  /**
   * Whether items with details can be expanded/collapsed
   * When false, details are always hidden
   * @default false
   */
  expandable?: boolean;

  /**
   * Layout variant for the checklist
   * - 'list': Vertical stack (default)
   * - 'grid': 2-column grid on desktop, single column on mobile
   * @default 'list'
   */
  variant?: "list" | "grid";

  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
}

/**
 * Individual red flag item component
 */
interface RedFlagItemProps {
  flag: RedFlag;
  expandable: boolean;
  uniqueIdPrefix: string;
}

/**
 * RedFlagItem - Internal component for rendering a single red flag
 *
 * @param props - Component props
 * @returns JSX element for a single red flag item
 */
function RedFlagItem({ flag, expandable, uniqueIdPrefix }: RedFlagItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasDetail = Boolean(flag.detail);
  const canExpand = expandable && hasDetail;

  const contentId = `${uniqueIdPrefix}-content-${flag.id}`;
  const buttonId = `${uniqueIdPrefix}-button-${flag.id}`;

  /**
   * Toggle expanded state for accordion behavior
   */
  const handleToggle = useCallback(() => {
    if (canExpand) {
      setIsExpanded((prev) => !prev);
    }
  }, [canExpand]);

  /**
   * Handle keyboard interactions for accessibility
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (canExpand && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        handleToggle();
      }
    },
    [canExpand, handleToggle]
  );

  // Base container styles
  const containerStyles = [
    // Layout
    "flex flex-col",
    // Spacing
    "p-4",
    // Background
    "bg-alert-red-50",
    // Border
    "border border-alert-red-200",
    "rounded-lg",
    // Transitions
    "transition-colors duration-150",
  ].join(" ");

  // Header styles (clickable when expandable)
  const headerStyles = [
    "flex items-start gap-3",
    canExpand && [
      "cursor-pointer",
      "select-none",
      // Hover state
      "hover:bg-alert-red-100",
      "-m-4 p-4",
      "rounded-lg",
      // Focus styles
      "focus-visible:outline-2",
      "focus-visible:outline-offset-2",
      "focus-visible:outline-alert-red-500",
      "focus-visible:ring-2",
      "focus-visible:ring-alert-red-500",
      "focus-visible:ring-offset-2",
    ],
  ]
    .flat()
    .filter(Boolean)
    .join(" ");

  return (
    <li className={containerStyles}>
      {/* Header with icon and text */}
      <div
        id={canExpand ? buttonId : undefined}
        role={canExpand ? "button" : undefined}
        tabIndex={canExpand ? 0 : undefined}
        aria-expanded={canExpand ? isExpanded : undefined}
        aria-controls={canExpand ? contentId : undefined}
        onClick={canExpand ? handleToggle : undefined}
        onKeyDown={canExpand ? handleKeyDown : undefined}
        className={headerStyles}
      >
        {/* Warning triangle icon */}
        <div className="flex-shrink-0 mt-0.5">
          <Icon
            name="TriangleAlert"
            size="md"
            className="text-alert-red-500"
            aria-hidden
          />
        </div>

        {/* Flag text and expand indicator */}
        <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
          <span className="font-medium text-alert-red-900">{flag.text}</span>

          {/* Expand/collapse chevron */}
          {canExpand && (
            <div
              className={[
                "flex-shrink-0",
                "text-alert-red-500",
                "transition-transform duration-200 ease-out",
                "motion-reduce:transition-none",
                isExpanded ? "rotate-180" : "rotate-0",
              ].join(" ")}
            >
              <Icon name="ChevronDown" size="sm" aria-hidden />
            </div>
          )}
        </div>
      </div>

      {/* Expandable detail content using CSS grid for smooth animation */}
      {hasDetail && expandable && (
        <div
          id={contentId}
          role="region"
          aria-labelledby={buttonId}
          className={[
            "grid",
            "transition-[grid-template-rows] duration-200 ease-out",
            "motion-reduce:transition-none",
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <div className="pt-3 mt-3 border-t border-alert-red-200">
              <p className="text-sm text-alert-red-800">{flag.detail}</p>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

/**
 * RedFlagChecklist Component
 *
 * Displays a list of scam warning signs (red flags) with visual warning indicators.
 * Supports list and grid layouts with optional expandable details for each item.
 *
 * @param props - Component props
 * @returns JSX element containing the red flag checklist
 *
 * @example
 * // Simple list
 * <RedFlagChecklist
 *   flags={[
 *     { id: '1', text: 'Unknown sender' },
 *     { id: '2', text: 'Urgent language' },
 *   ]}
 * />
 *
 * @example
 * // Grid with expandable details
 * <RedFlagChecklist
 *   flags={[
 *     { id: '1', text: 'Unknown sender', detail: 'Always verify...' },
 *     { id: '2', text: 'Urgent language', detail: 'Scammers create...' },
 *   ]}
 *   expandable
 *   variant="grid"
 * />
 */
export function RedFlagChecklist({
  flags,
  expandable = false,
  variant = "list",
  className = "",
}: RedFlagChecklistProps) {
  // Generate unique ID prefix for accessibility
  const uniqueIdPrefix = useId();

  // Container layout styles based on variant
  const containerStyles = [
    // Reset list styles
    "list-none",
    "m-0",
    "p-0",
    // Spacing between items
    "gap-3",
    // Layout based on variant
    variant === "grid"
      ? [
          "grid",
          "grid-cols-1",
          // 2 columns on medium screens and up
          "md:grid-cols-2",
        ].join(" ")
      : "flex flex-col",
    // Custom classes
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Don't render if no flags
  if (!flags || flags.length === 0) {
    return null;
  }

  return (
    <ul className={containerStyles} aria-label="Scam warning signs">
      {flags.map((flag) => (
        <RedFlagItem
          key={flag.id}
          flag={flag}
          expandable={expandable}
          uniqueIdPrefix={uniqueIdPrefix}
        />
      ))}
    </ul>
  );
}

RedFlagChecklist.displayName = "RedFlagChecklist";

export default RedFlagChecklist;

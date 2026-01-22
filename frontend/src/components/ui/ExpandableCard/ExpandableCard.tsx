/**
 * ExpandableCard Component
 *
 * An extension of the Card component with expand/collapse behavior.
 * Used for:
 * - FAQ sections
 * - Collapsible information panels
 * - Detailed scam information that can be expanded on demand
 *
 * Features:
 * - Click header to toggle expand/collapse
 * - Smooth chevron rotation animation
 * - Content slides in/out with CSS grid animation
 * - Full keyboard accessibility (Enter/Space to toggle)
 * - ARIA attributes for screen readers
 * - Respects prefers-reduced-motion
 */

"use client";

import React, { useState, useId } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

/**
 * Props for the ExpandableCard component
 */
export interface ExpandableCardProps {
  /**
   * The title displayed in the card header
   */
  title: string;

  /**
   * Optional description displayed below the title
   */
  description?: string;

  /**
   * Content shown when the card is expanded
   */
  children: React.ReactNode;

  /**
   * Whether the card starts expanded
   * @default false
   */
  defaultExpanded?: boolean;

  /**
   * Callback fired when the expanded state changes
   */
  onExpandChange?: (expanded: boolean) => void;

  /**
   * Additional CSS classes to apply to the card
   */
  className?: string;
}

/**
 * ExpandableCard Component
 *
 * A card that can be expanded or collapsed by clicking on the header.
 * Built on top of the base Card component with added interaction behavior.
 *
 * @example
 * // Basic usage
 * <ExpandableCard title="What is phishing?">
 *   <p>Phishing is a type of scam where...</p>
 * </ExpandableCard>
 *
 * @example
 * // With description and default expanded
 * <ExpandableCard
 *   title="Bank Impersonation Scam"
 *   description="Common tactics used by scammers"
 *   defaultExpanded={true}
 *   onExpandChange={(expanded) => console.log('Expanded:', expanded)}
 * >
 *   <p>Detailed information here...</p>
 * </ExpandableCard>
 */
export function ExpandableCard({
  title,
  description,
  children,
  defaultExpanded = false,
  onExpandChange,
  className = "",
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Generate unique IDs for accessibility
  const uniqueId = useId();
  const headerId = `expandable-header-${uniqueId}`;
  const contentId = `expandable-content-${uniqueId}`;

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpandChange?.(newExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <Card className={className}>
      {/* Clickable header area */}
      <div
        id={headerId}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={[
          "cursor-pointer",
          "select-none",
          "focus-visible:outline-2",
          "focus-visible:outline-offset-2",
          "focus-visible:outline-[var(--color-trust-blue)]",
          "focus-visible:ring-2",
          "focus-visible:ring-[var(--color-trust-blue)]",
          "focus-visible:ring-offset-2",
          "rounded-t-[var(--radius-lg)]",
          // Hover state
          "hover:bg-gray-50",
          "transition-colors duration-200",
        ].join(" ")}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle>{title}</CardTitle>
              {description && (
                <CardDescription className="mt-1.5">
                  {description}
                </CardDescription>
              )}
            </div>
            {/* Chevron icon with rotation animation */}
            <div
              className={[
                "flex-shrink-0",
                "text-gray-500",
                "transition-transform duration-200 ease-out",
                "motion-reduce:transition-none",
                isExpanded ? "rotate-180" : "rotate-0",
              ].join(" ")}
            >
              <Icon name="ChevronDown" size="lg" aria-hidden />
            </div>
          </div>
        </CardHeader>
      </div>

      {/* Expandable content panel using CSS grid for smooth height animation */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={[
          "grid",
          "transition-[grid-template-rows] duration-200 ease-out",
          "motion-reduce:transition-none",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <CardContent className="pt-0 border-t border-gray-100">
            {children}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

ExpandableCard.displayName = "ExpandableCard";

export default ExpandableCard;

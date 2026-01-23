/**
 * WarningSignCard Component
 *
 * A card component for displaying universal warning signs of scams.
 * Used for:
 * - Educational pages showing common scam indicators
 * - Warning sign reference guides
 * - Interactive scam awareness content
 *
 * Features:
 * - Prominent icon display with amber/yellow warning accent
 * - Bold navy title for clarity
 * - Description always visible
 * - Optional expandable section for examples
 * - Smooth expand/collapse animation
 * - Full accessibility support (ARIA attributes)
 * - Keyboard navigation
 */

"use client";

import React, { useState, useId } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Icon, IconName } from "@/components/ui/Icon";

/**
 * Props for the WarningSignCard component
 */
export interface WarningSignCardProps {
  /**
   * The name of the Lucide icon to display prominently
   * @see https://lucide.dev/icons for available icons
   */
  icon: string;

  /**
   * The title of the warning sign
   * Displayed in bold navy text
   */
  title: string;

  /**
   * A short description of the warning sign
   * Always visible regardless of expansion state
   */
  description: string;

  /**
   * Optional list of examples illustrating this warning sign
   * Displayed as a bullet list when expanded
   */
  examples?: string[];

  /**
   * Whether the card can be expanded to show examples
   * Only relevant when examples are provided
   * @default true when examples are provided
   */
  expandable?: boolean;

  /**
   * Whether the card starts in an expanded state
   * Only relevant when expandable is true
   * @default false
   */
  defaultExpanded?: boolean;

  /**
   * Additional CSS classes to apply to the card
   */
  className?: string;
}

/**
 * WarningSignCard Component
 *
 * Displays a warning sign with an icon, title, description, and optional
 * expandable examples section. Features a distinctive amber/yellow border
 * accent to emphasize the warning nature of the content.
 *
 * @example
 * // Basic usage without examples
 * <WarningSignCard
 *   icon="Clock"
 *   title="Urgency Tactics"
 *   description="Scammers create artificial time pressure to prevent you from thinking clearly."
 * />
 *
 * @example
 * // With expandable examples
 * <WarningSignCard
 *   icon="Clock"
 *   title="Urgency Tactics"
 *   description="Scammers create artificial time pressure to prevent you from thinking clearly."
 *   examples={[
 *     "\"Act now or lose your account!\"",
 *     "\"This offer expires in 24 hours\"",
 *     "\"Immediate action required\""
 *   ]}
 *   defaultExpanded={false}
 * />
 *
 * @example
 * // Non-expandable with examples always shown
 * <WarningSignCard
 *   icon="AlertTriangle"
 *   title="Suspicious Links"
 *   description="Links that don't match the claimed sender."
 *   examples={["Misspelled URLs", "Shortened links"]}
 *   expandable={false}
 * />
 */
export function WarningSignCard({
  icon,
  title,
  description,
  examples,
  expandable,
  defaultExpanded = false,
  className = "",
}: WarningSignCardProps) {
  // Determine if the card should be expandable
  // Default to true if examples exist and expandable isn't explicitly set
  const isExpandable = expandable ?? (examples && examples.length > 0);

  const [isExpanded, setIsExpanded] = useState(
    isExpandable ? defaultExpanded : true
  );

  // Generate unique IDs for accessibility
  const uniqueId = useId();
  const buttonId = `warning-sign-button-${uniqueId}`;
  const examplesId = `warning-sign-examples-${uniqueId}`;

  /**
   * Toggle the expanded state
   */
  const handleToggle = () => {
    if (isExpandable) {
      setIsExpanded((prev) => !prev);
    }
  };

  /**
   * Handle keyboard interaction for expand/collapse
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isExpandable && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      handleToggle();
    }
  };

  // Determine if we should show the examples section
  const hasExamples = examples && examples.length > 0;
  const showExamples = hasExamples && (isExpanded || !isExpandable);

  return (
    <Card
      className={[
        // Warning accent border (amber/yellow)
        "border-l-4 border-l-amber-500",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          {/* Icon container with amber background */}
          <div
            className={[
              "flex-shrink-0",
              "flex items-center justify-center",
              "w-12 h-12",
              "rounded-full",
              "bg-amber-100",
              "text-amber-700",
            ].join(" ")}
          >
            <Icon name={icon as IconName} size="lg" aria-hidden />
          </div>

          {/* Title and description */}
          <div className="flex-1 min-w-0">
            <h3
              className={[
                "text-lg md:text-xl",
                "font-bold",
                "text-navy",
                "leading-tight",
              ].join(" ")}
            >
              {title}
            </h3>
            <p
              className={[
                "mt-1",
                "text-sm md:text-base",
                "text-gray-600",
                "leading-relaxed",
              ].join(" ")}
            >
              {description}
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Expandable examples section */}
      {hasExamples && (
        <>
          {/* Expand/collapse button (only if expandable) */}
          {isExpandable && (
            <div className="px-6">
              <button
                id={buttonId}
                type="button"
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                aria-expanded={isExpanded}
                aria-controls={examplesId}
                className={[
                  "flex items-center gap-2",
                  "text-sm",
                  "font-medium",
                  "text-trust-blue-600",
                  "hover:text-trust-blue-800",
                  "transition-colors duration-200",
                  "focus-visible:outline-2",
                  "focus-visible:outline-offset-2",
                  "focus-visible:outline-trust-blue-500",
                  "rounded",
                  "py-1",
                ].join(" ")}
              >
                <span>{isExpanded ? "Hide examples" : "Show examples"}</span>
                <div
                  className={[
                    "transition-transform duration-200 ease-out",
                    "motion-reduce:transition-none",
                    isExpanded ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                >
                  <Icon name="ChevronDown" size="sm" aria-hidden />
                </div>
              </button>
            </div>
          )}

          {/* Examples content with smooth animation */}
          <div
            id={examplesId}
            role="region"
            aria-labelledby={isExpandable ? buttonId : undefined}
            className={[
              "grid",
              "transition-[grid-template-rows] duration-200 ease-out",
              "motion-reduce:transition-none",
              showExamples ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            ].join(" ")}
          >
            <div className="overflow-hidden">
              <CardContent className="pt-3">
                <div className="border-t border-gray-100 pt-3">
                  <p
                    className={[
                      "text-xs",
                      "font-semibold",
                      "uppercase",
                      "tracking-wide",
                      "text-gray-500",
                      "mb-2",
                    ].join(" ")}
                  >
                    Examples
                  </p>
                  <ul
                    className={[
                      "list-disc",
                      "list-inside",
                      "space-y-1",
                      "text-sm",
                      "text-gray-700",
                    ].join(" ")}
                  >
                    {examples.map((example, index) => (
                      <li key={index} className="leading-relaxed">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

WarningSignCard.displayName = "WarningSignCard";

export default WarningSignCard;

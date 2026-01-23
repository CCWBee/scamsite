/**
 * ScamTypeCard Component
 *
 * A specialized card component for displaying scam types in the homepage grid.
 * Each card represents a different type of scam with visual indicators for
 * danger level and navigates to detailed information pages.
 *
 * Features:
 * - Prominent icon display at top
 * - Danger level badge (high/medium/low) in top-right corner
 * - Hover animation with lift effect
 * - Full card clickable as a link
 * - Accessible keyboard navigation with focus ring
 * - Responsive padding and typography
 *
 * @example
 * ```tsx
 * <ScamTypeCard
 *   icon="Phone"
 *   title="Phone Scams"
 *   description="Fraudulent calls claiming to be from banks, government agencies, or tech support."
 *   href="/scams/phone-scams"
 *   dangerLevel="high"
 * />
 * ```
 */

import React from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";

/**
 * Danger level type for categorizing scam severity
 */
export type DangerLevel = "high" | "medium" | "low";

/**
 * Props for the ScamTypeCard component
 */
export interface ScamTypeCardProps {
  /**
   * The name of the Lucide icon to display at the top of the card.
   * Should be descriptive of the scam type (e.g., "Phone", "Mail", "Globe").
   *
   * @see https://lucide.dev/icons for available icons
   */
  icon: IconName;

  /**
   * The title of the scam type.
   * Will be truncated with ellipsis if too long.
   */
  title: string;

  /**
   * A brief description of the scam type.
   * Limited to 2 lines with ellipsis overflow.
   */
  description: string;

  /**
   * The URL to navigate to when the card is clicked.
   * Should link to a detailed page about this scam type.
   */
  href: string;

  /**
   * The danger level indicator for this scam type.
   * - high: Alert red background - most prevalent/dangerous scams
   * - medium: Warning yellow background - moderately common scams
   * - low: Success green background - less common scams
   */
  dangerLevel: DangerLevel;

  /**
   * Additional CSS classes to apply to the card container.
   */
  className?: string;
}

/**
 * Maps danger levels to Badge variants
 */
const dangerLevelVariantMap: Record<DangerLevel, "danger" | "warning" | "success"> = {
  high: "danger",
  medium: "warning",
  low: "success",
};

/**
 * Maps danger levels to display labels
 */
const dangerLevelLabelMap: Record<DangerLevel, string> = {
  high: "High Risk",
  medium: "Medium Risk",
  low: "Low Risk",
};

/**
 * Maps danger levels to icon container background colors
 */
const iconBackgroundMap: Record<DangerLevel, string> = {
  high: "bg-alert-red-50",
  medium: "bg-warning-50",
  low: "bg-success-50",
};

/**
 * Maps danger levels to icon colors
 */
const iconColorMap: Record<DangerLevel, string> = {
  high: "text-alert-red-600",
  medium: "text-warning-600",
  low: "text-success-600",
};

/**
 * ScamTypeCard Component
 *
 * Displays a scam type card with icon, title, description, and danger level badge.
 * The entire card is clickable and links to the detailed scam information page.
 *
 * @param props - Component props
 * @returns A card component for displaying a scam type
 *
 * @example
 * // High risk scam card
 * <ScamTypeCard
 *   icon="CreditCard"
 *   title="Bank Fraud"
 *   description="Criminals impersonating banks to steal your account details and money."
 *   href="/scams/bank-fraud"
 *   dangerLevel="high"
 * />
 *
 * @example
 * // Medium risk scam card
 * <ScamTypeCard
 *   icon="Package"
 *   title="Delivery Scams"
 *   description="Fake delivery notifications requesting payment for non-existent packages."
 *   href="/scams/delivery-scams"
 *   dangerLevel="medium"
 * />
 *
 * @example
 * // Low risk scam card
 * <ScamTypeCard
 *   icon="Gift"
 *   title="Prize Scams"
 *   description="Notifications claiming you've won a prize or lottery you never entered."
 *   href="/scams/prize-scams"
 *   dangerLevel="low"
 * />
 */
export function ScamTypeCard({
  icon,
  title,
  description,
  href,
  dangerLevel,
  className = "",
}: ScamTypeCardProps) {
  // Card container styles with hover animation
  const cardStyles = [
    // Base styles
    "relative",
    "block",
    "bg-white",
    "rounded-[var(--radius-lg)]",
    "border border-gray-200",
    "shadow-sm",
    "overflow-hidden",
    // Hover state with lift effect
    "hover:shadow-lg",
    "hover:-translate-y-1",
    // Active state
    "active:shadow-md",
    "active:translate-y-0",
    // Transition for smooth animation
    "transition-all",
    "duration-200",
    "ease-out",
    // Focus styles for keyboard navigation
    "focus:outline-none",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-trust-blue-500",
    "focus-visible:ring-2",
    "focus-visible:ring-trust-blue-500",
    "focus-visible:ring-offset-2",
    // Cursor
    "cursor-pointer",
  ].join(" ");

  // Responsive padding styles
  const contentStyles = [
    "p-4",
    "sm:p-5",
    "md:p-6",
  ].join(" ");

  // Icon container styles
  const iconContainerStyles = [
    "w-12 h-12",
    "sm:w-14 sm:h-14",
    "rounded-lg",
    "flex items-center justify-center",
    "mb-4",
    iconBackgroundMap[dangerLevel],
  ].join(" ");

  // Title styles with truncation
  const titleStyles = [
    "text-lg",
    "sm:text-xl",
    "font-semibold",
    "text-navy",
    "mb-2",
    "truncate",
  ].join(" ");

  // Description styles with 2-line clamp
  const descriptionStyles = [
    "text-sm",
    "sm:text-base",
    "text-gray-600",
    "leading-relaxed",
    "line-clamp-2",
  ].join(" ");

  return (
    <Link
      href={href}
      className={`${cardStyles} ${className}`.trim()}
      aria-label={`${title} - ${dangerLevelLabelMap[dangerLevel]}. ${description}`}
    >
      <div className={contentStyles}>
        {/* Danger level badge - positioned in top-right corner */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <Badge
            variant={dangerLevelVariantMap[dangerLevel]}
            size="sm"
          >
            {dangerLevelLabelMap[dangerLevel]}
          </Badge>
        </div>

        {/* Icon container */}
        <div className={iconContainerStyles}>
          <Icon
            name={icon}
            size="lg"
            className={iconColorMap[dangerLevel]}
            aria-hidden
          />
        </div>

        {/* Title with truncation */}
        <h3 className={titleStyles} title={title}>
          {title}
        </h3>

        {/* Description with 2-line clamp */}
        <p className={descriptionStyles}>
          {description}
        </p>
      </div>
    </Link>
  );
}

export default ScamTypeCard;

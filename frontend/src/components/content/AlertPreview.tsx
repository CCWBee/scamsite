/**
 * AlertPreview Component
 *
 * A compact preview card for displaying alerts, news items, and updates on ScamAware Jersey.
 * Designed for use in list contexts such as homepage alert feeds, news archives, and
 * notification panels.
 *
 * Features:
 * - Category badge with semantic coloring (warning, news, update)
 * - UK-formatted date display (e.g., "23 Jan 2024")
 * - Optional summary with 2-line clamp for consistent card heights
 * - Interactive hover state with visual feedback
 * - Arrow indicator for clear link affordance
 * - Fully accessible with proper link semantics
 *
 * @example
 * // Warning alert
 * <AlertPreview
 *   title="New Investment Scam Targeting Jersey Residents"
 *   date="2024-01-23T10:00:00Z"
 *   category="warning"
 *   summary="JFSC has received reports of fraudulent investment schemes..."
 *   href="/alerts/investment-scam-january-2024"
 * />
 *
 * @example
 * // News update without summary
 * <AlertPreview
 *   title="JFSC Launches New Scam Reporting Portal"
 *   date="2024-01-20T09:00:00Z"
 *   category="news"
 *   href="/news/scam-reporting-portal"
 * />
 */

import React from "react";
import Link from "next/link";
import { Badge } from "../ui/Badge/Badge";
import { Icon } from "../ui/Icon/Icon";

/**
 * Alert category types for visual differentiation
 * - warning: High-priority alerts about active scams or threats
 * - news: General news and announcements
 * - update: Updates to existing information or guidance
 */
export type AlertCategory = "warning" | "news" | "update";

/**
 * Props for the AlertPreview component
 */
export interface AlertPreviewProps {
  /**
   * The title of the alert or news item.
   * Should be concise but descriptive.
   */
  title: string;

  /**
   * ISO date string for when the alert was published.
   * Will be formatted to UK format (e.g., "23 Jan 2024").
   *
   * @example "2024-01-23T10:00:00Z"
   */
  date: string;

  /**
   * Category of the alert determining the badge color:
   * - warning: alert-red (for active scam alerts)
   * - news: trust-blue (for general news)
   * - update: success green (for guidance updates)
   */
  category: AlertCategory;

  /**
   * Optional summary text for the alert.
   * Will be clamped to 2 lines for consistent card heights.
   */
  summary?: string;

  /**
   * URL to the full alert/news article.
   * Can be a relative path or absolute URL.
   */
  href: string;

  /**
   * Additional CSS classes to apply to the card container.
   */
  className?: string;
}

/**
 * Badge variant mapping for each alert category
 */
const categoryBadgeVariant: Record<AlertCategory, "danger" | "info" | "success"> = {
  warning: "danger",
  news: "info",
  update: "success",
};

/**
 * Human-readable labels for each category
 */
const categoryLabels: Record<AlertCategory, string> = {
  warning: "Warning",
  news: "News",
  update: "Update",
};

/**
 * Formats an ISO date string to UK format (e.g., "23 Jan 2024")
 *
 * Uses Intl.DateTimeFormat with en-GB locale for consistent UK formatting.
 * Falls back gracefully if the date string is invalid.
 *
 * @param isoDateString - An ISO 8601 date string
 * @returns Formatted date string in UK format (e.g., "23 Jan 2024")
 *
 * @example
 * formatDateUK("2024-01-23T10:00:00Z") // Returns "23 Jan 2024"
 * formatDateUK("2024-12-25") // Returns "25 Dec 2024"
 */
export function formatDateUK(isoDateString: string): string {
  try {
    const date = new Date(isoDateString);

    // Check for invalid date
    if (isNaN(date.getTime())) {
      return isoDateString;
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    // Return original string if parsing fails
    return isoDateString;
  }
}

/**
 * AlertPreview Component
 *
 * A compact card component for displaying alert and news previews in list contexts.
 * Features a category badge, formatted date, title with link styling, optional
 * summary text, and an arrow indicator for link affordance.
 *
 * The component is fully accessible with proper link semantics and keyboard navigation.
 *
 * @param props - Component props
 * @returns A preview card element linking to the full alert/news article
 */
export function AlertPreview({
  title,
  date,
  category,
  summary,
  href,
  className = "",
}: AlertPreviewProps) {
  const formattedDate = formatDateUK(date);

  // Base styles for the card container
  const cardStyles = [
    // Layout
    "block",
    "p-4 sm:p-5",
    // Appearance
    "bg-white",
    "border border-gray-200",
    "rounded-lg",
    // Shadow and transitions
    "shadow-sm",
    "transition-all duration-200",
    // Hover effects
    "hover:shadow-md",
    "hover:border-gray-300",
    "hover:-translate-y-0.5",
    // Focus styles for accessibility
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-trust-blue",
    "focus-visible:ring-offset-2",
  ].join(" ");

  return (
    <Link
      href={href}
      className={`${cardStyles} ${className}`.trim()}
      aria-label={`${categoryLabels[category]}: ${title}, published ${formattedDate}`}
    >
      {/* Header row with badge and date */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <Badge variant={categoryBadgeVariant[category]} size="sm">
          {categoryLabels[category]}
        </Badge>
        <time
          dateTime={date}
          className="text-sm text-gray-500 flex-shrink-0"
        >
          {formattedDate}
        </time>
      </div>

      {/* Title with arrow indicator */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base sm:text-lg font-semibold text-navy leading-snug group-hover:text-trust-blue transition-colors">
          {title}
        </h3>
        <Icon
          name="ArrowRight"
          size="sm"
          className="text-gray-400 flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </div>

      {/* Optional summary with 2-line clamp */}
      {summary && (
        <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">
          {summary}
        </p>
      )}
    </Link>
  );
}

export default AlertPreview;

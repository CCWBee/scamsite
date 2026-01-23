/**
 * ComparisonTable Component
 *
 * A side-by-side comparison component for contrasting legitimate vs scam
 * communications. Designed to help Jersey residents quickly identify
 * red flags by comparing authentic and fraudulent characteristics.
 *
 * Features:
 * - Two-column layout on desktop (side-by-side)
 * - Stacked layout on mobile with clear visual separation
 * - Category title at top for context
 * - "Legitimate" column with green checkmarks and light green background
 * - "Scam" column with red X marks and light red background
 * - Clear visual distinction between sides
 * - Points displayed as bullet lists with icons
 * - Accessible contrast ratios (WCAG 2.1 AA compliant)
 *
 * @example
 * ```tsx
 * <ComparisonTable
 *   category="Bank Communications"
 *   legitimate={{
 *     title: "Legitimate Bank Contact",
 *     points: [
 *       "Uses official bank letterhead",
 *       "Never asks for full PIN or password",
 *       "Provides verifiable callback number",
 *       "Allows time to make decisions"
 *     ]
 *   }}
 *   scam={{
 *     title: "Potential Scam Indicators",
 *     points: [
 *       "Creates urgency or panic",
 *       "Requests full security details",
 *       "Uses threatening language",
 *       "Pressures for immediate action"
 *     ]
 *   }}
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic HTML structure with proper headings
 * - ARIA labels for icon meanings
 * - Color is not the only means of conveying information (icons + text)
 * - Sufficient color contrast ratios for text and backgrounds
 * - Screen reader friendly with descriptive list structure
 */

import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import { Heading } from "@/components/ui/Typography/Heading";

/**
 * Represents one side of the comparison (either legitimate or scam)
 */
export interface ComparisonSide {
  /**
   * The title for this side of the comparison
   * @example "Legitimate Bank Contact"
   */
  title: string;

  /**
   * Array of points/characteristics for this side
   * @example ["Uses official letterhead", "Never asks for PIN"]
   */
  points: string[];
}

/**
 * Props for the ComparisonTable component
 */
export interface ComparisonTableProps {
  /**
   * The category or context for this comparison
   * Displayed as the main heading above both columns
   * @example "Bank Communications"
   */
  category: string;

  /**
   * Content for the legitimate (safe) side of the comparison
   * Displayed with green styling and checkmark icons
   */
  legitimate: ComparisonSide;

  /**
   * Content for the scam (warning) side of the comparison
   * Displayed with red styling and X mark icons
   */
  scam: ComparisonSide;

  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
}

/**
 * Internal component for rendering one side of the comparison
 */
interface ComparisonColumnProps {
  /**
   * The side data to render
   */
  side: ComparisonSide;

  /**
   * The type of column (determines styling and icons)
   */
  type: "legitimate" | "scam";
}

/**
 * ComparisonColumn - Renders a single side of the comparison
 *
 * @internal This is an internal component used by ComparisonTable
 */
const ComparisonColumn: React.FC<ComparisonColumnProps> = ({ side, type }) => {
  const isLegitimate = type === "legitimate";

  // Background and border styling
  const containerStyles = isLegitimate
    ? "bg-green-50 border-green-200"
    : "bg-red-50 border-red-200";

  // Title styling
  const titleStyles = isLegitimate
    ? "text-green-800"
    : "text-red-800";

  // Icon styling
  const iconStyles = isLegitimate
    ? "text-green-600"
    : "text-red-600";

  // Icon name (using lucide-react naming convention)
  const iconName = isLegitimate ? "CircleCheck" : "CircleX";

  // Accessible label for the icon
  const iconLabel = isLegitimate
    ? "Legitimate indicator"
    : "Scam warning indicator";

  return (
    <div
      className={`
        flex-1
        rounded-lg
        border-2
        ${containerStyles}
        p-4 md:p-6
        min-w-0
      `}
      role="region"
      aria-label={isLegitimate ? "Legitimate characteristics" : "Scam warning signs"}
    >
      {/* Column title */}
      <div className="flex items-center gap-2 mb-4">
        <Icon
          name={iconName}
          size="lg"
          className={iconStyles}
          aria-hidden
        />
        <h4 className={`text-lg md:text-xl font-semibold ${titleStyles}`}>
          {side.title}
        </h4>
      </div>

      {/* Points list */}
      <ul className="space-y-3" role="list">
        {side.points.map((point, index) => (
          <li
            key={index}
            className="flex items-start gap-3"
          >
            <Icon
              name={iconName}
              size="sm"
              className={`${iconStyles} mt-0.5 flex-shrink-0`}
              aria-label={iconLabel}
            />
            <span className="text-sm md:text-base text-gray-700 leading-relaxed">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

ComparisonColumn.displayName = "ComparisonColumn";

/**
 * ComparisonTable Component
 *
 * Displays a side-by-side comparison of legitimate vs scam characteristics.
 * Helps users quickly identify warning signs by showing contrasting
 * traits in a visually distinct layout.
 *
 * The component is fully responsive:
 * - On desktop (md+): Shows two columns side-by-side
 * - On mobile: Stacks columns vertically with clear separation
 *
 * @param props - The component props
 * @returns A comparison table element
 *
 * @example
 * // Basic usage
 * <ComparisonTable
 *   category="Email Communications"
 *   legitimate={{
 *     title: "Genuine Email",
 *     points: ["Correct spelling", "Official domain"]
 *   }}
 *   scam={{
 *     title: "Suspicious Email",
 *     points: ["Spelling errors", "Strange sender address"]
 *   }}
 * />
 */
export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  category,
  legitimate,
  scam,
  className = "",
}) => {
  return (
    <section
      className={`w-full ${className}`.trim()}
      aria-labelledby="comparison-table-heading"
    >
      {/* Category heading */}
      <Heading
        level={3}
        className="text-center mb-6"
      >
        <span id="comparison-table-heading">{category}</span>
      </Heading>

      {/* Comparison columns container */}
      <div
        className="
          flex
          flex-col md:flex-row
          gap-4 md:gap-6
        "
        role="group"
        aria-label={`Comparison of legitimate and scam ${category.toLowerCase()}`}
      >
        {/* Legitimate column */}
        <ComparisonColumn side={legitimate} type="legitimate" />

        {/* Visual separator for mobile (hidden on desktop) */}
        <div
          className="md:hidden flex items-center justify-center py-2"
          aria-hidden="true"
        >
          <span className="text-gray-400 text-sm font-medium">vs</span>
        </div>

        {/* Scam column */}
        <ComparisonColumn side={scam} type="scam" />
      </div>
    </section>
  );
};

ComparisonTable.displayName = "ComparisonTable";

export default ComparisonTable;

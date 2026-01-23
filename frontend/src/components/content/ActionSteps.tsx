/**
 * ActionSteps Component
 *
 * A component for displaying recommended action steps in a structured,
 * accessible format. Used throughout ScamAware Jersey to guide users
 * through processes such as:
 * - Reporting scams
 * - Verifying suspicious communications
 * - Protecting personal information
 * - Emergency response procedures
 *
 * Features:
 * - Two display variants: numbered list or checklist
 * - Prominent step numbers in trust-blue circles
 * - Optional action links with appropriate icons
 * - Accessible semantic list structure (ol/ul)
 * - Vertical layout with clear visual separation
 *
 * @example
 * // Numbered steps for a process
 * <ActionSteps
 *   steps={[
 *     {
 *       number: 1,
 *       title: "Stop all communication",
 *       description: "Do not respond to any further messages or calls from the suspected scammer.",
 *     },
 *     {
 *       number: 2,
 *       title: "Report to the police",
 *       description: "Contact Jersey Police to report the suspected scam.",
 *       link: {
 *         text: "Call fraud line",
 *         href: "tel:+441534612612",
 *       },
 *     },
 *   ]}
 * />
 *
 * @example
 * // Checklist variant for verification tasks
 * <ActionSteps
 *   variant="checklist"
 *   steps={[
 *     {
 *       number: 1,
 *       title: "Check the sender's email address",
 *       description: "Verify the domain matches the official organization.",
 *     },
 *   ]}
 * />
 */

import React from "react";
import { Icon, IconName } from "@/components/ui/Icon";

/**
 * Represents a single action step with optional link
 */
export interface ActionStep {
  /**
   * The step number (used for display and ordering)
   */
  number: number;

  /**
   * The title of the step (displayed in bold)
   */
  title: string;

  /**
   * Detailed description of the step
   */
  description: string;

  /**
   * Optional link for additional action or resource
   */
  link?: {
    /**
     * Display text for the link
     */
    text: string;

    /**
     * URL for the link (supports tel:, mailto:, and http(s) URLs)
     */
    href: string;
  };
}

/**
 * Props for the ActionSteps component
 */
export interface ActionStepsProps {
  /**
   * Array of action steps to display
   */
  steps: ActionStep[];

  /**
   * Display variant for the steps
   * - numbered: Shows steps with numbered circles (default)
   * - checklist: Shows steps with checkbox icons (visual only, not interactive)
   * @default "numbered"
   */
  variant?: "numbered" | "checklist";

  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
}

/**
 * Determines the appropriate icon for a link based on its href
 *
 * @param href - The link URL
 * @returns The icon name to use for the link
 */
function getLinkIcon(href: string): IconName {
  if (href.startsWith("tel:")) {
    return "Phone";
  }
  if (href.startsWith("mailto:")) {
    return "Mail";
  }
  // External links (http/https)
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return "ExternalLink";
  }
  // Default to arrow for internal links
  return "ArrowRight";
}

/**
 * Determines if a link should open in a new tab
 *
 * @param href - The link URL
 * @returns True if the link should open in a new tab
 */
function shouldOpenInNewTab(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

/**
 * ActionStepItem Component
 *
 * Renders a single action step with number/checkbox indicator,
 * title, description, and optional link.
 */
interface ActionStepItemProps {
  step: ActionStep;
  variant: "numbered" | "checklist";
}

const ActionStepItem: React.FC<ActionStepItemProps> = ({ step, variant }) => {
  const linkIcon = step.link ? getLinkIcon(step.link.href) : null;
  const openInNewTab = step.link ? shouldOpenInNewTab(step.link.href) : false;

  return (
    <li className="flex gap-4">
      {/* Step indicator */}
      <div className="flex-shrink-0" aria-hidden="true">
        {variant === "numbered" ? (
          /* Numbered circle indicator */
          <div
            className={[
              "flex items-center justify-center",
              "w-10 h-10",
              "rounded-full",
              "bg-[var(--color-trust-blue)]",
              "text-white font-semibold text-lg",
            ].join(" ")}
          >
            {step.number}
          </div>
        ) : (
          /* Checkbox indicator (visual only) */
          <div
            className={[
              "flex items-center justify-center",
              "w-10 h-10",
              "rounded-[var(--radius-md)]",
              "border-2 border-[var(--color-trust-blue)]",
              "bg-white",
            ].join(" ")}
          >
            <Icon
              name="Square"
              size="md"
              className="text-[var(--color-trust-blue)]"
              aria-hidden
            />
          </div>
        )}
      </div>

      {/* Step content */}
      <div className="flex-1 pt-1">
        {/* Step title */}
        <h3
          className={[
            "text-lg font-semibold",
            "text-[var(--color-navy)]",
            "leading-tight",
            "mb-1",
          ].join(" ")}
        >
          {step.title}
        </h3>

        {/* Step description */}
        <p
          className={[
            "text-base",
            "text-[var(--color-gray-600)]",
            "leading-relaxed",
            "mb-3",
          ].join(" ")}
        >
          {step.description}
        </p>

        {/* Optional action link */}
        {step.link && (
          <a
            href={step.link.href}
            className={[
              "inline-flex items-center gap-2",
              "text-[var(--color-trust-blue)]",
              "font-medium",
              "hover:text-[var(--color-trust-blue-700)]",
              "transition-colors duration-[var(--transition-fast)]",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-[var(--color-trust-blue)]",
              "rounded-[var(--radius-sm)]",
            ].join(" ")}
            {...(openInNewTab && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
          >
            {linkIcon && (
              <Icon name={linkIcon} size="sm" aria-hidden className="flex-shrink-0" />
            )}
            <span>{step.link.text}</span>
            {openInNewTab && (
              <span className="sr-only">(opens in new tab)</span>
            )}
          </a>
        )}
      </div>
    </li>
  );
};

/**
 * ActionSteps Component
 *
 * Displays a list of action steps in either numbered or checklist format.
 * Each step includes a title, description, and optional action link.
 *
 * The component uses semantic list elements (ol/ul) for accessibility,
 * with proper ARIA attributes and screen reader support.
 *
 * @param props - Component props
 * @returns The rendered ActionSteps component
 */
export function ActionSteps({
  steps,
  variant = "numbered",
  className = "",
}: ActionStepsProps): React.ReactElement {
  // Sort steps by number to ensure correct order
  const sortedSteps = [...steps].sort((a, b) => a.number - b.number);

  // Base styles for the list container
  const baseStyles = [
    "flex flex-col",
    "gap-6",
    "list-none",
    "p-0",
    "m-0",
  ].join(" ");

  // Use ordered list for numbered variant, unordered for checklist
  const ListElement = variant === "numbered" ? "ol" : "ul";

  return (
    <ListElement
      className={`${baseStyles} ${className}`.trim()}
      role="list"
      aria-label={
        variant === "numbered"
          ? "Action steps"
          : "Checklist items"
      }
    >
      {sortedSteps.map((step) => (
        <ActionStepItem
          key={step.number}
          step={step}
          variant={variant}
        />
      ))}
    </ListElement>
  );
}

// Display name for React DevTools
ActionSteps.displayName = "ActionSteps";

export default ActionSteps;

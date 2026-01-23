/**
 * StepVisualization Component
 *
 * A visual component for displaying "how it works" process steps for ScamAware Jersey.
 * Used for:
 * - Onboarding flows explaining the scam assessment process
 * - Educational content showing step-by-step guidance
 * - Multi-step instructions for reporting scams
 *
 * Features:
 * - Responsive layout: horizontal on desktop (md+), vertical on mobile
 * - Numbered circles or optional Lucide icon display
 * - Connector lines between steps
 * - Navy numbered circles with white text for visual consistency
 * - Clean visual hierarchy with bold titles and regular descriptions
 * - Supports 3-5 steps for optimal visual presentation
 * - Full accessibility with ARIA landmarks and step labeling
 *
 * @example
 * // Basic usage with numbered steps
 * <StepVisualization
 *   steps={[
 *     { number: 1, title: "Submit Details", description: "Enter the suspicious message" },
 *     { number: 2, title: "AI Analysis", description: "Our system reviews your submission" },
 *     { number: 3, title: "Get Results", description: "Receive your scam risk assessment" },
 *   ]}
 * />
 *
 * @example
 * // With icons and vertical layout
 * <StepVisualization
 *   steps={[
 *     { number: 1, title: "Report", description: "Tell us about the scam", icon: "FileText" },
 *     { number: 2, title: "Review", description: "We analyze the details", icon: "Search" },
 *     { number: 3, title: "Protect", description: "Get safety guidance", icon: "Shield" },
 *   ]}
 *   variant="vertical"
 *   showConnectors={true}
 * />
 */

import React from "react";
import { Icon, IconName } from "../ui/Icon/Icon";

/**
 * Represents a single step in the visualization
 */
export interface Step {
  /**
   * The step number (1-based indexing recommended)
   */
  number: number;

  /**
   * The title of the step, displayed in bold
   */
  title: string;

  /**
   * A brief description explaining the step
   */
  description: string;

  /**
   * Optional Lucide icon name to display instead of the number
   * @see https://lucide.dev/icons for available icons
   */
  icon?: string;
}

/**
 * Props for the StepVisualization component
 */
export interface StepVisualizationProps {
  /**
   * Array of steps to display (3-5 steps recommended for optimal visual presentation)
   */
  steps: Step[];

  /**
   * Layout variant for the step display
   * - horizontal: Steps displayed in a row (desktop-friendly)
   * - vertical: Steps displayed in a column (mobile-friendly)
   *
   * Note: Regardless of this setting, the component will automatically
   * switch to vertical layout on mobile screens (below md breakpoint)
   *
   * @default "horizontal"
   */
  variant?: "horizontal" | "vertical";

  /**
   * Whether to show connector lines between steps
   * @default true
   */
  showConnectors?: boolean;

  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
}

/**
 * Props for an individual step item
 */
interface StepItemProps {
  step: Step;
  isLast: boolean;
  showConnector: boolean;
  variant: "horizontal" | "vertical";
  totalSteps: number;
}

/**
 * Individual step item component
 */
const StepItem: React.FC<StepItemProps> = ({
  step,
  isLast,
  showConnector,
  variant,
  totalSteps,
}) => {
  const isVerticalLayout = variant === "vertical";

  // Determine if we should show an icon or number
  const hasIcon = step.icon && isValidIconName(step.icon);

  return (
    <div
      className={`
        relative flex
        ${isVerticalLayout ? "flex-row items-start" : "flex-col items-center"}
        ${isVerticalLayout ? "gap-4" : "gap-3"}
      `}
      role="listitem"
      aria-label={`Step ${step.number} of ${totalSteps}: ${step.title}`}
    >
      {/* Step circle with number or icon */}
      <div className="relative flex-shrink-0">
        <div
          className={`
            flex items-center justify-center
            w-12 h-12 md:w-14 md:h-14
            rounded-full
            bg-navy text-white
            font-semibold text-lg md:text-xl
            shadow-md
            transition-transform duration-200
            hover:scale-105
          `}
          aria-hidden="true"
        >
          {hasIcon ? (
            <Icon
              name={step.icon as IconName}
              size="lg"
              className="text-white"
              aria-hidden
            />
          ) : (
            <span>{step.number}</span>
          )}
        </div>

        {/* Connector line - vertical layout */}
        {showConnector && !isLast && isVerticalLayout && (
          <div
            className="
              absolute left-1/2 top-full
              w-0.5 h-8
              bg-navy-200
              -translate-x-1/2
            "
            aria-hidden="true"
          />
        )}
      </div>

      {/* Step content */}
      <div
        className={`
          flex flex-col
          ${isVerticalLayout ? "pt-1 pb-8" : "text-center"}
          ${!isVerticalLayout ? "flex-1 max-w-[200px] md:max-w-[240px]" : "flex-1"}
        `}
      >
        <h3
          className={`
            font-semibold text-navy
            text-base md:text-lg
            leading-tight
            mb-1
          `}
        >
          {step.title}
        </h3>
        <p
          className={`
            text-gray-600
            text-sm md:text-base
            leading-relaxed
          `}
        >
          {step.description}
        </p>
      </div>

      {/* Connector line - horizontal layout */}
      {showConnector && !isLast && !isVerticalLayout && (
        <div
          className="
            hidden md:block
            absolute top-6 md:top-7
            left-[calc(50%+28px)] md:left-[calc(50%+32px)]
            w-[calc(100%-56px)] md:w-[calc(100%-64px)]
            h-0.5
            bg-navy-200
          "
          style={{
            // Extend to the next step's circle
            width: "calc(100% - 3.5rem)",
            left: "calc(50% + 1.75rem)",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

/**
 * Type guard to check if a string is a valid Lucide icon name
 */
function isValidIconName(name: string): name is IconName {
  // We'll let the Icon component handle validation
  // This is a simple check that the name looks reasonable
  return typeof name === "string" && name.length > 0;
}

/**
 * StepVisualization Component
 *
 * Displays a series of steps in a visually appealing, accessible format.
 * Automatically adapts layout for mobile and desktop viewing.
 *
 * @param props - Component props
 * @returns The rendered step visualization
 *
 * @example
 * // Horizontal layout (default)
 * <StepVisualization
 *   steps={[
 *     { number: 1, title: "Step One", description: "First step description" },
 *     { number: 2, title: "Step Two", description: "Second step description" },
 *     { number: 3, title: "Step Three", description: "Third step description" },
 *   ]}
 * />
 *
 * @example
 * // Force vertical layout with no connectors
 * <StepVisualization
 *   steps={steps}
 *   variant="vertical"
 *   showConnectors={false}
 * />
 */
export const StepVisualization: React.FC<StepVisualizationProps> = ({
  steps,
  variant = "horizontal",
  showConnectors = true,
  className = "",
}) => {
  // Validate step count
  if (steps.length < 1) {
    if (process.env.NODE_ENV === "development") {
      console.warn("StepVisualization: At least one step is required");
    }
    return null;
  }

  if (steps.length > 5 && process.env.NODE_ENV === "development") {
    console.warn(
      "StepVisualization: More than 5 steps may result in suboptimal visual presentation"
    );
  }

  const isHorizontal = variant === "horizontal";

  return (
    <nav
      className={`step-visualization ${className}`.trim()}
      aria-label="Process steps"
    >
      <ol
        className={`
          list-none p-0 m-0
          ${
            isHorizontal
              ? // Horizontal: vertical on mobile, horizontal on desktop
                "flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-4"
              : // Vertical: always vertical
                "flex flex-col gap-0"
          }
        `}
        role="list"
      >
        {steps.map((step, index) => (
          <li
            key={step.number}
            className={`
              ${isHorizontal ? "md:flex-1" : ""}
              relative
            `}
          >
            <StepItem
              step={step}
              isLast={index === steps.length - 1}
              showConnector={showConnectors}
              variant={isHorizontal ? "horizontal" : "vertical"}
              totalSteps={steps.length}
            />

            {/* Horizontal connector for desktop */}
            {showConnectors &&
              isHorizontal &&
              index < steps.length - 1 && (
                <div
                  className="
                    hidden md:block
                    absolute
                    top-6 md:top-7
                    right-0
                    w-full
                    h-0.5
                    pointer-events-none
                  "
                  aria-hidden="true"
                >
                  <div
                    className="
                      absolute
                      top-0
                      left-[calc(50%+28px)] md:left-[calc(50%+32px)]
                      right-[calc(50%-28px)] md:right-[calc(50%-32px)]
                      h-full
                      bg-gradient-to-r from-navy-200 via-navy-300 to-navy-200
                    "
                  />
                </div>
              )}

            {/* Vertical connector for mobile (in horizontal variant) */}
            {showConnectors &&
              isHorizontal &&
              index < steps.length - 1 && (
                <div
                  className="
                    md:hidden
                    absolute
                    left-6
                    top-14
                    w-0.5 h-6
                    bg-navy-200
                    -translate-x-1/2
                  "
                  aria-hidden="true"
                />
              )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepVisualization;

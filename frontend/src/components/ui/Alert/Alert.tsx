/**
 * Alert Component
 *
 * A notification component for displaying important messages to users.
 * Used for:
 * - Informational messages (info)
 * - Success confirmations (success)
 * - Warning notices (warning)
 * - Error notifications (error)
 *
 * Features:
 * - Multiple semantic variants with appropriate icons
 * - Optional title and description
 * - Dismissible with smooth fade-out animation
 * - Optional action button
 * - Accessible with proper ARIA attributes
 *
 * @example
 * ```tsx
 * // Basic info alert
 * <Alert variant="info">This is an informational message.</Alert>
 *
 * // Alert with title
 * <Alert variant="warning" title="Warning">
 *   Please verify your email address.
 * </Alert>
 *
 * // Dismissible alert
 * <Alert variant="success" title="Success" dismissible onDismiss={() => setVisible(false)}>
 *   Your report has been submitted.
 * </Alert>
 *
 * // Alert with action
 * <Alert
 *   variant="error"
 *   title="Error"
 *   action={{ label: "Retry", onClick: handleRetry }}
 * >
 *   Failed to load data. Please try again.
 * </Alert>
 * ```
 *
 * @accessibility
 * - Uses role="alert" for screen reader announcements
 * - aria-live="polite" for non-urgent messages, "assertive" for errors
 * - Dismiss button is keyboard accessible
 * - Focus management for interactive elements
 */

import React, { useState } from "react";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  X,
} from "@/components/ui/Icon";
import { Text } from "@/components/ui/Typography";

/**
 * Alert variant type
 */
export type AlertVariant = "info" | "success" | "warning" | "error";

/**
 * Action button configuration
 */
export interface AlertAction {
  /**
   * The text label for the action button
   */
  label: string;
  /**
   * Click handler for the action button
   */
  onClick: () => void;
}

/**
 * Props for the Alert component
 */
export interface AlertProps {
  /**
   * Visual and semantic variant of the alert
   * - info: Trust-blue for informational content (uses Info icon)
   * - success: Green for positive confirmations (uses CheckCircle icon)
   * - warning: Amber for cautionary notices (uses AlertTriangle icon)
   * - error: Red for error messages (uses AlertCircle icon)
   * @default "info"
   */
  variant?: AlertVariant;

  /**
   * Optional title for the alert
   */
  title?: string;

  /**
   * The main content/description of the alert
   */
  children: React.ReactNode;

  /**
   * Whether to show the variant-appropriate icon
   * @default true
   */
  icon?: boolean;

  /**
   * Whether the alert can be dismissed
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback when the alert is dismissed
   */
  onDismiss?: () => void;

  /**
   * Optional action button configuration
   */
  action?: AlertAction;

  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * Icon component mapping for each variant
 */
const variantIcons: Record<AlertVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

/**
 * Style mappings for alert variants
 * Uses subtle backgrounds with matching border and text colors
 */
const variantStyles: Record<AlertVariant, string> = {
  info: "bg-trust-blue-50 border-trust-blue-200 text-trust-blue-800",
  success: "bg-success-50 border-success-200 text-success-800",
  warning: "bg-warning-50 border-warning-200 text-warning-800",
  error: "bg-alert-red-50 border-alert-red-200 text-alert-red-800",
};

/**
 * Icon color mappings for each variant
 */
const iconStyles: Record<AlertVariant, string> = {
  info: "text-trust-blue-500",
  success: "text-success-500",
  warning: "text-warning-600",
  error: "text-alert-red-500",
};

/**
 * Action button style mappings for each variant
 */
const actionButtonStyles: Record<AlertVariant, string> = {
  info: "text-trust-blue-700 hover:text-trust-blue-900 hover:bg-trust-blue-100",
  success: "text-success-700 hover:text-success-900 hover:bg-success-100",
  warning: "text-warning-800 hover:text-warning-900 hover:bg-warning-100",
  error: "text-alert-red-700 hover:text-alert-red-900 hover:bg-alert-red-100",
};

/**
 * Dismiss button style mappings for each variant
 */
const dismissButtonStyles: Record<AlertVariant, string> = {
  info: "text-trust-blue-500 hover:text-trust-blue-700 hover:bg-trust-blue-100",
  success: "text-success-500 hover:text-success-700 hover:bg-success-100",
  warning: "text-warning-600 hover:text-warning-800 hover:bg-warning-100",
  error: "text-alert-red-500 hover:text-alert-red-700 hover:bg-alert-red-100",
};

/**
 * Alert Component
 *
 * A notification component for displaying important messages with
 * semantic variants, optional icons, and dismissible functionality.
 * Follows JFSC design guidelines with accessible color combinations.
 */
export function Alert({
  variant = "info",
  title,
  children,
  icon = true,
  dismissible = false,
  onDismiss,
  action,
  className = "",
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get the appropriate icon component for the variant
  const IconComponent = variantIcons[variant];

  // Determine aria-live based on variant (assertive for errors)
  const ariaLive = variant === "error" ? "assertive" : "polite";

  /**
   * Handle dismiss action with animation
   */
  const handleDismiss = () => {
    setIsAnimating(true);
    // Wait for animation to complete before calling onDismiss
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 150); // Match CSS transition duration
  };

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  // Build base styles
  const baseStyles = [
    // Layout
    "flex gap-3",
    // Shape and border
    "rounded-lg border",
    "p-4",
    // Transitions
    "transition-all duration-150 ease-in-out",
    // Animation state
    isAnimating ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100",
  ].join(" ");

  return (
    <div
      role="alert"
      aria-live={ariaLive}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`.trim()}
    >
      {/* Icon */}
      {icon && (
        <div className="flex-shrink-0 mt-0.5">
          <IconComponent
            size={20}
            className={iconStyles[variant]}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Content area */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        {title && (
          <div className="font-semibold mb-1">{title}</div>
        )}

        {/* Description */}
        <div className={`${title ? "" : ""}`}>
          <Text as="div" variant="small" className="text-inherit">
            {children}
          </Text>
        </div>

        {/* Action button */}
        {action && (
          <div className="mt-3">
            <button
              type="button"
              onClick={action.onClick}
              className={`
                inline-flex items-center
                px-3 py-1.5
                text-sm font-medium
                rounded-md
                transition-colors duration-150
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current
                ${actionButtonStyles[variant]}
              `.trim()}
            >
              {action.label}
            </button>
          </div>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={handleDismiss}
            className={`
              p-1
              rounded-md
              transition-colors duration-150
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current
              ${dismissButtonStyles[variant]}
            `.trim()}
            aria-label="Dismiss alert"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

Alert.displayName = "Alert";

export default Alert;

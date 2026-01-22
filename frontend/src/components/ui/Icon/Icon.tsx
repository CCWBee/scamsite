/**
 * Icon Component
 *
 * A wrapper component for Lucide React icons providing consistent sizing,
 * styling, and accessibility features for ScamAware Jersey.
 *
 * ## Accessibility Guidelines
 *
 * Icons can be either **decorative** or **meaningful**:
 *
 * ### Decorative Icons (aria-hidden)
 * Icons that are purely visual and don't convey unique information.
 * Screen readers should ignore these. Use when:
 * - The icon accompanies text that already conveys the meaning
 * - The icon is purely for visual enhancement
 *
 * ```tsx
 * // Icon next to text - the text conveys the meaning
 * <Button>
 *   <Icon name="Shield" aria-hidden />
 *   Security Settings
 * </Button>
 * ```
 *
 * ### Meaningful Icons (aria-label)
 * Icons that convey information not available elsewhere. Screen readers
 * should announce these. Use when:
 * - The icon is the only way to understand the action/meaning
 * - The icon is used without accompanying text
 *
 * ```tsx
 * // Standalone icon button - needs aria-label
 * <button>
 *   <Icon name="Menu" aria-label="Open navigation menu" />
 * </button>
 *
 * // Alert icon conveying status
 * <Icon name="AlertTriangle" aria-label="Warning" />
 * ```
 *
 * ## Usage Examples
 *
 * ```tsx
 * // Basic usage with decorative icon
 * <Icon name="Shield" aria-hidden />
 *
 * // Meaningful icon with label
 * <Icon name="AlertTriangle" aria-label="Warning: High risk scam detected" />
 *
 * // Custom size
 * <Icon name="CheckCircle" size="lg" aria-hidden />
 *
 * // Custom color (Tailwind class)
 * <Icon name="XCircle" className="text-alert-red-600" aria-hidden />
 * ```
 */

import React from "react";
import { icons, LucideProps } from "lucide-react";

/**
 * Type representing all available icon names from Lucide React.
 * This provides autocomplete support for the `name` prop.
 */
export type IconName = keyof typeof icons;

/**
 * Size presets for consistent icon sizing across the application.
 * Maps to pixel values:
 * - sm: 16px - For inline text and compact UI
 * - md: 20px - Default size for most use cases
 * - lg: 24px - For buttons and primary actions
 * - xl: 32px - For hero sections and emphasis
 */
export type IconSize = "sm" | "md" | "lg" | "xl";

/**
 * Props for the Icon component
 */
export interface IconProps {
  /**
   * The name of the Lucide icon to render.
   * Supports all icons from the lucide-react library.
   *
   * @see https://lucide.dev/icons for available icons
   */
  name: IconName;

  /**
   * Predefined size for the icon.
   * - sm: 16px
   * - md: 20px (default)
   * - lg: 24px
   * - xl: 32px
   *
   * @default "md"
   */
  size?: IconSize;

  /**
   * Custom color for the icon.
   * Can be a Tailwind color class (applied via className) or left undefined
   * to inherit color from parent element via currentColor.
   *
   * Note: For Tailwind colors, use the className prop instead.
   * This maintains consistency with the Tailwind-first approach.
   *
   * @default "currentColor" (inherited from parent)
   */
  color?: string;

  /**
   * Additional CSS classes to apply to the icon.
   * Use for custom colors, hover states, transitions, etc.
   *
   * @example className="text-trust-blue-500 hover:text-trust-blue-700"
   */
  className?: string;

  /**
   * Accessible label for meaningful icons.
   * Required when the icon conveys meaning not available elsewhere.
   * This adds an aria-label to the SVG element.
   *
   * @example aria-label="Warning: suspicious activity detected"
   */
  "aria-label"?: string;

  /**
   * Marks the icon as decorative/hidden from screen readers.
   * Set to true when the icon is purely visual or when adjacent
   * text already conveys the meaning.
   *
   * @default false
   * @example aria-hidden={true} // For decorative icons
   */
  "aria-hidden"?: boolean;

  /**
   * Stroke width for the icon.
   * Lucide icons default to 2. Adjust for different visual weights.
   *
   * @default 2
   */
  strokeWidth?: number;
}

/**
 * Size to pixel mapping
 */
const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/**
 * Icon Component
 *
 * A wrapper around Lucide React icons providing:
 * - Consistent sizing with predefined size presets
 * - Proper accessibility attributes (aria-label/aria-hidden)
 * - Default currentColor inheritance for easy styling
 * - TypeScript support with icon name autocomplete
 *
 * @example
 * // Decorative icon (ignored by screen readers)
 * <Icon name="Shield" aria-hidden />
 *
 * @example
 * // Meaningful icon (announced by screen readers)
 * <Icon name="AlertTriangle" aria-label="Warning" />
 *
 * @example
 * // Custom sizing and color
 * <Icon
 *   name="CheckCircle"
 *   size="lg"
 *   className="text-success-500"
 *   aria-hidden
 * />
 */
export function Icon({
  name,
  size = "md",
  color,
  className = "",
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
  strokeWidth = 2,
}: IconProps) {
  // Get the icon component from lucide-react
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    // In development, warn about invalid icon names
    if (process.env.NODE_ENV === "development") {
      console.warn(`Icon "${name}" not found in lucide-react`);
    }
    return null;
  }

  // Build props for the Lucide icon
  const iconProps: LucideProps = {
    size: sizeMap[size],
    strokeWidth,
    className: `flex-shrink-0 ${className}`.trim(),
  };

  // Apply custom color if provided (overrides currentColor)
  if (color) {
    iconProps.color = color;
  }

  // Apply accessibility attributes
  // If aria-label is provided, icon is meaningful (role="img")
  // If aria-hidden is true, icon is decorative
  if (ariaLabel) {
    iconProps["aria-label"] = ariaLabel;
    iconProps.role = "img";
  } else if (ariaHidden) {
    iconProps["aria-hidden"] = true;
  }

  return <LucideIcon {...iconProps} />;
}

export default Icon;

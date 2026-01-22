/**
 * Text Component
 *
 * A flexible text component for body content, captions, and other text elements.
 * Use this component for consistent typography throughout the application.
 *
 * @example
 * ```tsx
 * // Default body text
 * <Text>This is standard body text for paragraphs.</Text>
 *
 * // Lead text for introductions
 * <Text variant="lead">Learn how to protect yourself from scams.</Text>
 *
 * // Small muted text
 * <Text variant="small" color="muted">Last updated: January 2024</Text>
 *
 * // Error message
 * <Text variant="body" color="error">Please enter a valid email address.</Text>
 *
 * // Inline text within a paragraph
 * <p>Contact us at <Text as="span" weight="bold">support@example.com</Text></p>
 * ```
 *
 * @accessibility
 * - Use semantic HTML where appropriate (p for paragraphs, span for inline)
 * - Ensure sufficient color contrast for all color variants
 * - Use appropriate font sizes for readability
 */

import React from 'react';

export interface TextProps {
  /**
   * The text variant determines the font size and line height.
   * - body: Standard paragraph text (default)
   * - small: Smaller text for secondary content
   * - caption: Smallest text for captions and footnotes
   * - lead: Larger text for introductory paragraphs
   */
  variant?: 'body' | 'small' | 'caption' | 'lead';

  /**
   * The color variant for the text.
   * - default: Standard navy text color
   * - muted: Gray text for secondary content
   * - error: Red text for error messages
   * - success: Green text for success messages
   */
  color?: 'default' | 'muted' | 'error' | 'success';

  /**
   * The font weight.
   * - normal: Regular weight (default)
   * - medium: Medium weight
   * - semibold: Semi-bold weight
   * - bold: Bold weight
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';

  /**
   * The content to display.
   */
  children: React.ReactNode;

  /**
   * The HTML element to render.
   * - p: Paragraph (default)
   * - span: Inline text
   * - div: Block-level container
   */
  as?: 'p' | 'span' | 'div';

  /**
   * Additional CSS classes to apply.
   */
  className?: string;
}

/**
 * Style mappings for text variants.
 * Includes responsive sizing for lead variant.
 */
const variantStyles: Record<NonNullable<TextProps['variant']>, string> = {
  body: 'text-base leading-relaxed',
  small: 'text-sm leading-normal',
  caption: 'text-xs leading-normal',
  lead: 'text-lg md:text-xl leading-relaxed',
};

/**
 * Style mappings for color variants.
 * All colors meet WCAG 2.1 AA contrast requirements.
 */
const colorStyles: Record<NonNullable<TextProps['color']>, string> = {
  default: 'text-navy',
  muted: 'text-gray-500',
  error: 'text-alert-red',
  success: 'text-success',
};

/**
 * Style mappings for font weights.
 */
const weightStyles: Record<NonNullable<TextProps['weight']>, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

/**
 * Text component for body content and general text elements.
 *
 * Provides consistent typography with multiple variants for different
 * use cases. Supports color variations for semantic meaning and
 * weight options for emphasis.
 */
export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'default',
  weight = 'normal',
  children,
  as = 'p',
  className = '',
}) => {
  const Tag = as;
  const styles = [
    variantStyles[variant],
    colorStyles[color],
    weightStyles[weight],
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  return <Tag className={styles}>{children}</Tag>;
};

Text.displayName = 'Text';

export default Text;

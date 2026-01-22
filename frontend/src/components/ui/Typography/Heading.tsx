/**
 * Heading Component
 *
 * A semantic heading component for page titles and section headers.
 * Use this component for all headings to ensure consistent typography
 * and proper document structure.
 *
 * @example
 * ```tsx
 * // Page title
 * <Heading level={1}>Welcome to ScamAware Jersey</Heading>
 *
 * // Section header
 * <Heading level={2}>Common Scam Types</Heading>
 *
 * // Subsection header with custom styling
 * <Heading level={3} className="mb-4">Phone Scams</Heading>
 *
 * // Visual h2 rendered as h1 for SEO
 * <Heading level={2} as="h1">Page Title</Heading>
 * ```
 *
 * @accessibility
 * - Use heading levels sequentially (don't skip from h1 to h3)
 * - Only one h1 per page
 * - Use `as` prop when visual hierarchy differs from document structure
 */

import React from 'react';

export interface HeadingProps {
  /**
   * The visual and semantic level of the heading (1-4).
   * Determines both the HTML tag and the styling.
   */
  level: 1 | 2 | 3 | 4;

  /**
   * The content to display within the heading.
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply.
   */
  className?: string;

  /**
   * Override the semantic HTML tag.
   * Use when visual hierarchy differs from document structure.
   * For example, render an h1 visually as h2 for SEO purposes.
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
}

/**
 * Style mappings for each heading level.
 * Includes responsive font sizes (smaller on mobile, larger on desktop).
 */
const headingStyles: Record<1 | 2 | 3 | 4, string> = {
  1: 'text-3xl md:text-4xl font-bold text-navy leading-tight tracking-tight',
  2: 'text-2xl md:text-3xl font-bold text-navy leading-tight',
  3: 'text-xl md:text-2xl font-semibold text-navy leading-snug',
  4: 'text-lg md:text-xl font-semibold text-navy leading-snug',
};

/**
 * Default HTML tags for each heading level.
 */
const defaultTags: Record<1 | 2 | 3 | 4, 'h1' | 'h2' | 'h3' | 'h4'> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
};

/**
 * Heading component for page titles and section headers.
 *
 * Provides consistent typography with responsive font sizes and
 * semantic HTML structure. Supports overriding the HTML tag for
 * cases where visual and semantic hierarchy differ.
 */
export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = '',
  as,
}) => {
  const Tag = as || defaultTags[level];
  const styles = headingStyles[level];

  return (
    <Tag className={`${styles} ${className}`.trim()}>
      {children}
    </Tag>
  );
};

Heading.displayName = 'Heading';

export default Heading;

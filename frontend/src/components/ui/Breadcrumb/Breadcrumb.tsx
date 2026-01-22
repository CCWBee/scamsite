/**
 * Breadcrumb Component
 *
 * A navigation component for showing the user's current location within
 * a page hierarchy for ScamAware Jersey.
 *
 * Features:
 * - Semantic HTML with nav, ol, and li elements
 * - Accessible with aria-label and aria-current attributes
 * - Customizable separator (defaults to ChevronRight icon)
 * - Integrates with Next.js Link for navigation
 * - Last item is non-clickable (current page)
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Scam Types', href: '/scams' },
 *     { label: 'Phishing' } // Current page - no href
 *   ]}
 * />
 * ```
 */

import React from "react";
import Link from "next/link";
import { ChevronRight } from "@/components/ui/Icon";

/**
 * Individual breadcrumb item configuration
 */
export interface BreadcrumbItem {
  /**
   * The display text for the breadcrumb item
   */
  label: string;

  /**
   * The navigation URL for the breadcrumb item.
   * If undefined, the item represents the current page (no link).
   */
  href?: string;
}

/**
 * Props for the Breadcrumb component
 */
export interface BreadcrumbProps {
  /**
   * Array of breadcrumb items to display.
   * The last item is treated as the current page and won't be a link.
   */
  items: BreadcrumbItem[];

  /**
   * Custom separator element between breadcrumb items.
   * @default ChevronRight icon
   */
  separator?: React.ReactNode;

  /**
   * Additional CSS classes to apply to the nav element.
   */
  className?: string;
}

/**
 * Default separator component
 * Uses ChevronRight icon from the Icon component library
 */
function DefaultSeparator() {
  return (
    <ChevronRight
      className="text-gray-400 mx-2 flex-shrink-0"
      size={16}
      aria-hidden
    />
  );
}

/**
 * Breadcrumb Component
 *
 * A navigation aid that shows the user's current location within a page hierarchy.
 * Follows accessibility best practices with semantic HTML and ARIA attributes.
 *
 * @example
 * // Basic usage
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Scam Types', href: '/scams' },
 *     { label: 'Phishing' }
 *   ]}
 * />
 *
 * @example
 * // Custom separator
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'About' }
 *   ]}
 *   separator={<span className="mx-2 text-gray-400">/</span>}
 * />
 */
export function Breadcrumb({
  items,
  separator,
  className = "",
}: BreadcrumbProps) {
  // Don't render if no items
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={className}
    >
      <ol className="flex items-center flex-wrap">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          const isCurrentPage = !item.href || isLastItem;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center"
            >
              {/* Separator (not shown before first item) */}
              {index > 0 && (
                <span aria-hidden="true">
                  {separator ?? <DefaultSeparator />}
                </span>
              )}

              {/* Breadcrumb link or current page text */}
              {isCurrentPage ? (
                <span
                  className="text-sm text-navy font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href!}
                  className="text-sm text-gray-500 hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;

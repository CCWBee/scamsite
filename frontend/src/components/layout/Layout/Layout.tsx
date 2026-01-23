/**
 * Layout Component
 *
 * A composable layout component that provides consistent page structure
 * for ScamAware Jersey. Includes Header, Footer, skip link for accessibility,
 * and responsive main content area.
 *
 * ## Features
 * - Skip to content link for accessibility (visible on focus)
 * - Flexible header/footer visibility
 * - Multiple max-width options for different content types
 * - Mobile navigation state management
 * - Flex layout ensuring footer stays at bottom (min-h-screen)
 *
 * ## Layout Structure
 * ```
 * +------------------------------------------+
 * | [Skip to content link - sr only]         |
 * +------------------------------------------+
 * |              Header                       |
 * +------------------------------------------+
 * |                                          |
 * |              Main Content                |
 * |         (max-width container)            |
 * |         id="main-content"                |
 * |                                          |
 * +------------------------------------------+
 * |              Footer                       |
 * +------------------------------------------+
 * ```
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Layout>
 *   <h1>Page Title</h1>
 *   <p>Page content goes here.</p>
 * </Layout>
 *
 * // Without footer (e.g., for full-screen app)
 * <Layout showFooter={false}>
 *   <AppContent />
 * </Layout>
 *
 * // Narrow width for reading-focused pages
 * <Layout maxWidth="narrow">
 *   <article>Long form content...</article>
 * </Layout>
 *
 * // Full-width layout
 * <Layout maxWidth="full">
 *   <FullWidthHero />
 * </Layout>
 * ```
 *
 * @accessibility
 * - Skip link allows keyboard users to bypass navigation
 * - Main content area has proper id for skip link target
 * - Uses semantic HTML elements (header, main, footer)
 * - Focus indicators on skip link when focused
 */

'use client';

import React, { useState, useCallback } from 'react';
import { Header, NavItem } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';

/**
 * Props for the Layout component
 */
export interface LayoutProps {
  /**
   * Page content to render in the main content area.
   */
  children: React.ReactNode;

  /**
   * Whether to show the header.
   * @default true
   */
  showHeader?: boolean;

  /**
   * Whether to show the footer.
   * @default true
   */
  showFooter?: boolean;

  /**
   * Maximum width of the main content area.
   * - `default` - 1200px (standard content width)
   * - `narrow` - 800px (for reading-focused pages)
   * - `wide` - 1400px (for data-heavy pages)
   * - `full` - 100% (for full-bleed layouts)
   * @default 'default'
   */
  maxWidth?: 'default' | 'narrow' | 'wide' | 'full';

  /**
   * Additional CSS classes to apply to the main content area.
   */
  className?: string;

  /**
   * Custom navigation items to pass to the Header.
   * If not provided, uses default navigation items from Header.
   */
  navItems?: NavItem[];
}

/**
 * Max width CSS classes for different content width options
 */
const maxWidthClasses: Record<NonNullable<LayoutProps['maxWidth']>, string> = {
  default: 'max-w-[1200px]',
  narrow: 'max-w-[800px]',
  wide: 'max-w-[1400px]',
  full: 'max-w-full',
};

/**
 * Default navigation items for ScamAware Jersey
 * Used when navItems prop is not provided
 */
const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Scam Types', href: '/scams' },
  { label: 'Warning Signs', href: '/warning-signs' },
  { label: 'Get Help', href: '/help' },
  { label: 'Resources', href: '/resources' },
];

/**
 * Layout Component
 *
 * Provides consistent page structure with Header, Footer, and main content area.
 * Manages mobile navigation state internally and passes it to Header and MobileNav.
 */
export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  maxWidth = 'default',
  className = '',
  navItems,
}) => {
  // Mobile menu state managed internally
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Toggle mobile menu open/close state
   */
  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  /**
   * Close mobile menu (e.g., when navigating)
   */
  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip to Content Link - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-navy)] focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-trust-blue)] focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Header */}
      {showHeader && (
        <Header
          navItems={navItems}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={handleMobileMenuToggle}
        />
      )}

      {/* Mobile Navigation */}
      {showHeader && (
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
          navItems={navItems ?? defaultNavItems}
        />
      )}

      {/* Main Content Area */}
      <main
        id="main-content"
        role="main"
        className={`
          flex-1
          mx-auto
          w-full
          px-4 py-6
          sm:px-6 sm:py-8
          lg:px-8 lg:py-12
          ${maxWidthClasses[maxWidth]}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
      >
        {children}
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

Layout.displayName = 'Layout';

export default Layout;

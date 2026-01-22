/**
 * Layout Components - Barrel Export
 *
 * This module exports all layout components for ScamAware Jersey.
 * Layout components provide the structural elements of the application
 * including header, footer, navigation, and page layout containers.
 *
 * ## Available Components
 *
 * ### Layout
 * Main page layout component that composes Header, Footer, and provides
 * page structure with accessibility features (skip link).
 *
 * ### Header
 * Responsive header with logo, navigation, and mobile menu support.
 * Implements sticky positioning and proper accessibility features.
 *
 * ### Footer
 * Site footer with brand information, quick links, contact details,
 * and legal notices.
 *
 * ### MobileNav
 * Mobile navigation drawer component for mobile menu functionality.
 * Includes slide-in animation, focus trap, and full accessibility support.
 *
 * ## Usage
 *
 * ```tsx
 * // Import layout wrapper
 * import { Layout } from '@/components/layout';
 *
 * // Import individual components
 * import { Header, Footer, MobileNav } from '@/components/layout';
 *
 * // Import types
 * import type { LayoutProps, HeaderProps, FooterProps, MobileNavProps, NavItem } from '@/components/layout';
 * ```
 *
 * ## Basic Layout Example
 *
 * ```tsx
 * import { Layout } from '@/components/layout';
 *
 * function MyPage() {
 *   return (
 *     <Layout>
 *       <h1>Page Title</h1>
 *       <p>Page content goes here.</p>
 *     </Layout>
 *   );
 * }
 * ```
 *
 * ## Custom Layout Example
 *
 * ```tsx
 * import { Layout } from '@/components/layout';
 *
 * function ArticlePage() {
 *   return (
 *     <Layout maxWidth="narrow" showFooter={true}>
 *       <article>
 *         <h1>Article Title</h1>
 *         <p>Long form content...</p>
 *       </article>
 *     </Layout>
 *   );
 * }
 * ```
 */

// Layout Component
export { Layout, default as LayoutDefault } from './Layout';
export type { LayoutProps } from './Layout';

// Header Component
export { Header } from './Header';
export type { HeaderProps, NavItem } from './Header';

// Footer Component
export { Footer } from './Footer';
export type { FooterProps } from './Footer';

// MobileNav Component
export { MobileNav } from './MobileNav';
export type { MobileNavProps } from './MobileNav';

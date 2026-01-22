/**
 * Breadcrumb Component Public API
 *
 * Re-exports the Breadcrumb component and its types for clean imports.
 *
 * @example
 * import { Breadcrumb } from '@/components/ui/Breadcrumb';
 * import type { BreadcrumbProps, BreadcrumbItem } from '@/components/ui/Breadcrumb';
 *
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Scam Types', href: '/scams' },
 *     { label: 'Phishing' }
 *   ]}
 * />
 */

export { Breadcrumb, default } from "./Breadcrumb";
export type { BreadcrumbProps, BreadcrumbItem } from "./Breadcrumb";

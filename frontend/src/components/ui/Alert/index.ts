/**
 * Alert Component Public API
 *
 * Re-exports the Alert component and its types for clean imports.
 *
 * @example
 * ```tsx
 * // Import the Alert component
 * import { Alert } from '@/components/ui/Alert';
 *
 * // Import types for TypeScript
 * import type { AlertProps, AlertVariant, AlertAction } from '@/components/ui/Alert';
 *
 * // Usage
 * <Alert variant="warning" title="Warning" dismissible>
 *   This message shows warning signs of a scam.
 * </Alert>
 * ```
 */

export { Alert, default } from "./Alert";
export type { AlertProps, AlertVariant, AlertAction } from "./Alert";

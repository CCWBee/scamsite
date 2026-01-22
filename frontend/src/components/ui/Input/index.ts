/**
 * Input Component
 *
 * A form input component with support for labels, helper text, error states,
 * and icon slots. Designed for the ScamAware Jersey design system.
 *
 * @example
 * ```tsx
 * import { Input } from '@/components/ui/Input';
 *
 * // Basic input
 * <Input label="Email" type="email" placeholder="Enter your email" />
 *
 * // Input with error
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password is required"
 * />
 *
 * // Input with icons
 * <Input
 *   label="Search"
 *   leftIcon={<Icon name="Search" aria-hidden />}
 *   placeholder="Search..."
 * />
 * ```
 */

export { Input } from "./Input";
export type { InputProps } from "./Input";
export { default } from "./Input";

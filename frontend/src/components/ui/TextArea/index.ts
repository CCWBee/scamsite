/**
 * TextArea Component
 *
 * A form textarea component with support for labels, helper text, error states,
 * character counting, and configurable resize behavior. Designed for the
 * ScamAware Jersey design system.
 *
 * @example
 * ```tsx
 * import { TextArea } from '@/components/ui/TextArea';
 *
 * // Basic textarea
 * <TextArea label="Description" placeholder="Enter a description" />
 *
 * // Textarea with error
 * <TextArea
 *   label="Comments"
 *   error="Comments are required"
 * />
 *
 * // Textarea with character counter
 * <TextArea
 *   label="Message"
 *   showCharCount
 *   maxLength={500}
 *   placeholder="Enter your message..."
 * />
 * ```
 */

export { TextArea } from "./TextArea";
export type { TextAreaProps } from "./TextArea";
export { default } from "./TextArea";

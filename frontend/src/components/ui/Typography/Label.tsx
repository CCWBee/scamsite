/**
 * Label Component
 *
 * A form label component that provides consistent styling and accessibility
 * features for form inputs. Use this component for all form field labels.
 *
 * @example
 * ```tsx
 * // Basic label
 * <Label htmlFor="email">Email Address</Label>
 * <input id="email" type="email" />
 *
 * // Required field label
 * <Label htmlFor="name" required>Full Name</Label>
 * <input id="name" type="text" required />
 *
 * // Label with custom styling
 * <Label htmlFor="message" className="mb-2">Your Message</Label>
 * <textarea id="message" />
 * ```
 *
 * @accessibility
 * - Always use htmlFor to associate labels with inputs
 * - Required indicator uses aria-hidden to prevent redundant announcements
 * - Screen readers will announce the required state from the input's required attribute
 */

import React from 'react';

export interface LabelProps {
  /**
   * The ID of the form element this label is associated with.
   * Should match the id attribute of the corresponding input.
   */
  htmlFor?: string;

  /**
   * Whether the associated field is required.
   * Displays a red asterisk (*) after the label text.
   */
  required?: boolean;

  /**
   * The label text content.
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply.
   */
  className?: string;
}

/**
 * Label component for form fields.
 *
 * Provides consistent label styling with support for required field
 * indicators. Associates with form inputs via the htmlFor prop for
 * improved accessibility.
 */
export const Label: React.FC<LabelProps> = ({
  htmlFor,
  required = false,
  children,
  className = '',
}) => {
  const baseStyles = 'block text-sm font-medium text-navy leading-normal';

  return (
    <label
      htmlFor={htmlFor}
      className={`${baseStyles} ${className}`.trim()}
    >
      {children}
      {required && (
        <span
          className="text-alert-red ml-0.5"
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
  );
};

Label.displayName = 'Label';

export default Label;

/**
 * TextArea Component
 *
 * A form textarea component for ScamAware Jersey that provides consistent styling,
 * accessibility features, and support for various states including error handling.
 *
 * Features:
 * - Label with optional required indicator
 * - Helper text and error message support
 * - Character counter (optional)
 * - Configurable resize behavior
 * - Full width option
 * - Accessible with proper ARIA attributes
 * - Ref forwarding for form library compatibility
 *
 * @example
 * // Basic textarea with label
 * <TextArea label="Description" placeholder="Enter a description" />
 *
 * @example
 * // Textarea with error state
 * <TextArea
 *   label="Comments"
 *   error="Comments must be at least 10 characters"
 * />
 *
 * @example
 * // Textarea with character counter
 * <TextArea
 *   label="Message"
 *   showCharCount
 *   maxLength={500}
 *   placeholder="Enter your message..."
 * />
 */

import React, { forwardRef, useId, useState, useCallback } from "react";
import { Label } from "@/components/ui/Typography";

/**
 * Props for the TextArea component
 */
export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Label text displayed above the textarea.
   * Automatically associated with the textarea via htmlFor.
   */
  label?: string;

  /**
   * Helper text displayed below the textarea.
   * Provides additional context or instructions.
   * Hidden when error is present.
   */
  helperText?: string;

  /**
   * Error message displayed below the textarea.
   * When present, textarea shows error styling and this replaces helper text.
   */
  error?: string;

  /**
   * Whether to show the character counter.
   * Displays current character count and max length (if provided).
   * @default false
   */
  showCharCount?: boolean;

  /**
   * Maximum length for character counter display.
   * Also sets the maxLength attribute on the textarea.
   */
  maxLength?: number;

  /**
   * CSS resize behavior for the textarea.
   * @default 'vertical'
   */
  resize?: "none" | "vertical" | "horizontal" | "both";

  /**
   * Whether the textarea should take the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * TextArea Component
 *
 * A versatile form textarea with support for labels, helper text,
 * error states, and character counting. Follows ScamAware Jersey
 * design guidelines and WCAG 2.1 AA accessibility requirements.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      showCharCount = false,
      maxLength,
      resize = "vertical",
      fullWidth = false,
      disabled = false,
      required = false,
      id: providedId,
      className = "",
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    // Generate unique ID for label association if not provided
    const generatedId = useId();
    const textareaId = providedId || generatedId;

    // Generate IDs for aria-describedby
    const helperTextId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;
    const charCountId = `${textareaId}-charcount`;

    // Track character count for controlled and uncontrolled components
    const [charCount, setCharCount] = useState(() => {
      if (value !== undefined) {
        return String(value).length;
      }
      if (defaultValue !== undefined) {
        return String(defaultValue).length;
      }
      return 0;
    });

    // Handle change to update character count
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        onChange?.(e);
      },
      [onChange]
    );

    // Update charCount when controlled value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      }
    }, [value]);

    // Build aria-describedby list
    const describedByParts: string[] = [];
    if (error) {
      describedByParts.push(errorId);
    } else if (helperText) {
      describedByParts.push(helperTextId);
    }
    if (showCharCount) {
      describedByParts.push(charCountId);
    }
    const describedBy =
      describedByParts.length > 0 ? describedByParts.join(" ") : undefined;

    // Resize styles mapping
    const resizeStyles: Record<typeof resize, string> = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

    // Base textarea styles
    const baseStyles = [
      // Size and layout
      "min-h-[80px]",
      "w-full",
      "py-2",
      "px-3",
      // Typography
      "text-base",
      "text-navy",
      "placeholder:text-gray-400",
      // Background and border
      "bg-white",
      "border",
      "rounded-md",
      // Transitions
      "transition-all",
      "duration-150",
      // Focus styles (keyboard navigation)
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-offset-0",
      // Resize behavior
      resizeStyles[resize],
    ].join(" ");

    // State-specific styles
    const stateStyles = (() => {
      if (disabled) {
        return "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed";
      }
      if (error) {
        return "border-alert-red focus:border-alert-red focus:ring-alert-red/30";
      }
      return "border-gray-300 focus:border-trust-blue focus:ring-trust-blue/30 hover:border-gray-400";
    })();

    // Container width styles
    const containerStyles = fullWidth ? "w-full" : "w-full max-w-sm";

    // Determine if helper text or character count should be shown
    const showBottomRow = error || helperText || showCharCount;

    return (
      <div className={containerStyles}>
        {/* Label */}
        {label && (
          <Label htmlFor={textareaId} required={required} className="mb-1.5">
            {label}
          </Label>
        )}

        {/* Textarea element */}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className={`${baseStyles} ${stateStyles} ${className}`.trim()}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...props}
        />

        {/* Bottom row: Helper text/error and character counter */}
        {showBottomRow && (
          <div className="mt-1.5 flex justify-between items-start gap-4">
            {/* Helper text or error message */}
            <div className="flex-1 min-w-0">
              {error ? (
                <p id={errorId} className="text-sm text-alert-red" role="alert">
                  {error}
                </p>
              ) : helperText ? (
                <p id={helperTextId} className="text-sm text-gray-500">
                  {helperText}
                </p>
              ) : null}
            </div>

            {/* Character counter */}
            {showCharCount && (
              <p
                id={charCountId}
                className={`text-sm flex-shrink-0 ${
                  maxLength && charCount >= maxLength
                    ? "text-alert-red"
                    : "text-gray-500"
                }`}
                aria-live="polite"
                aria-atomic="true"
              >
                {charCount}
                {maxLength && `/${maxLength}`}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

// Display name for React DevTools
TextArea.displayName = "TextArea";

export default TextArea;

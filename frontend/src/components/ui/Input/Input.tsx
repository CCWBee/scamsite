/**
 * Input Component
 *
 * A form input component for ScamAware Jersey that provides consistent styling,
 * accessibility features, and support for various states including error handling.
 *
 * Features:
 * - Label with optional required indicator
 * - Helper text and error message support
 * - Left and right icon slots
 * - Full width option
 * - Accessible with proper ARIA attributes
 * - Ref forwarding for form library compatibility
 *
 * @example
 * // Basic input with label
 * <Input label="Email Address" type="email" placeholder="Enter your email" />
 *
 * @example
 * // Input with error state
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password must be at least 8 characters"
 * />
 *
 * @example
 * // Input with icons
 * <Input
 *   label="Search"
 *   leftIcon={<Icon name="Search" aria-hidden />}
 *   placeholder="Search scam types..."
 * />
 */

import React, { forwardRef, useId } from "react";
import { Label } from "@/components/ui/Typography";

/**
 * Props for the Input component
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label text displayed above the input.
   * Automatically associated with the input via htmlFor.
   */
  label?: string;

  /**
   * Helper text displayed below the input.
   * Provides additional context or instructions.
   * Hidden when error is present.
   */
  helperText?: string;

  /**
   * Error message displayed below the input.
   * When present, input shows error styling and this replaces helper text.
   */
  error?: string;

  /**
   * Icon element displayed on the left side of the input.
   * Input text is padded to accommodate the icon.
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon element displayed on the right side of the input.
   * Input text is padded to accommodate the icon.
   */
  rightIcon?: React.ReactNode;

  /**
   * Whether the input should take the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Input Component
 *
 * A versatile form input with support for labels, icons, helper text,
 * and error states. Follows ScamAware Jersey design guidelines and
 * WCAG 2.1 AA accessibility requirements.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      required = false,
      id: providedId,
      className = "",
      ...props
    },
    ref
  ) => {
    // Generate unique ID for label association if not provided
    const generatedId = useId();
    const inputId = providedId || generatedId;

    // Generate IDs for aria-describedby
    const helperTextId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    // Determine which description element to link
    const describedBy = error ? errorId : helperText ? helperTextId : undefined;

    // Base input styles
    const baseStyles = [
      // Size and layout
      "h-10",
      "w-full",
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

    // Padding based on icon presence
    const paddingStyles = (() => {
      if (leftIcon && rightIcon) {
        return "pl-10 pr-10";
      }
      if (leftIcon) {
        return "pl-10 pr-3";
      }
      if (rightIcon) {
        return "pl-3 pr-10";
      }
      return "px-3";
    })();

    // Container width styles
    const containerStyles = fullWidth ? "w-full" : "w-full max-w-sm";

    return (
      <div className={containerStyles}>
        {/* Label */}
        {label && (
          <Label htmlFor={inputId} required={required} className="mb-1.5">
            {label}
          </Label>
        )}

        {/* Input container with icons */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500 pointer-events-none"
              aria-hidden="true"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                {leftIcon}
              </span>
            </div>
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            className={`${baseStyles} ${stateStyles} ${paddingStyles} ${className}`.trim()}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500 pointer-events-none"
              aria-hidden="true"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                {rightIcon}
              </span>
            </div>
          )}
        </div>

        {/* Helper text or error message */}
        {error ? (
          <p
            id={errorId}
            className="mt-1.5 text-sm text-alert-red"
            role="alert"
          >
            {error}
          </p>
        ) : helperText ? (
          <p id={helperTextId} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

// Display name for React DevTools
Input.displayName = "Input";

export default Input;

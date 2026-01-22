/**
 * useFormValidation Hook
 *
 * A custom React hook for form validation with built-in validators and
 * support for custom validation rules. Designed for ScamAware Jersey forms
 * to ensure data integrity and provide user-friendly validation feedback.
 *
 * Features:
 * - Built-in validators: required, email, minLength, maxLength, pattern
 * - Custom validation function support
 * - Configurable validation timing (onChange, onBlur)
 * - Efficient re-renders (only affected fields update)
 * - Full TypeScript support
 * - Works with Input and TextArea components
 *
 * @example
 * // Basic usage with email and message fields
 * const { register, handleSubmit, errors, isValid } = useFormValidation({
 *   validateOnBlur: true
 * });
 *
 * <form onSubmit={handleSubmit(onSubmit)}>
 *   <Input
 *     {...register('email', {
 *       required: 'Email is required',
 *       email: 'Please enter a valid email'
 *     })}
 *   />
 *   <Input
 *     {...register('message', {
 *       required: true,
 *       minLength: { value: 10, message: 'Message must be at least 10 characters' }
 *     })}
 *   />
 *   <Button type="submit" disabled={!isValid}>Submit</Button>
 * </form>
 */

import { useState, useCallback, useMemo } from "react";

/**
 * Validation rule configuration for a form field.
 * Each rule can be a boolean, string (custom error message), or object with value and message.
 */
export interface ValidationRule {
  /**
   * Field must not be empty.
   * - `true`: Uses default message "This field is required"
   * - `string`: Custom error message
   */
  required?: boolean | string;

  /**
   * Minimum character count requirement.
   * @property value - Minimum number of characters
   * @property message - Error message when validation fails
   */
  minLength?: { value: number; message: string };

  /**
   * Maximum character count requirement.
   * @property value - Maximum number of characters
   * @property message - Error message when validation fails
   */
  maxLength?: { value: number; message: string };

  /**
   * Custom regex pattern validation.
   * @property value - Regular expression to test against
   * @property message - Error message when validation fails
   */
  pattern?: { value: RegExp; message: string };

  /**
   * Valid email format validation.
   * - `true`: Uses default message "Please enter a valid email address"
   * - `string`: Custom error message
   */
  email?: boolean | string;

  /**
   * Custom validation function.
   * @param value - The current field value
   * @returns Error message string if invalid, undefined if valid
   */
  custom?: (value: string) => string | undefined;
}

/**
 * State information for a single form field.
 */
export interface FieldState {
  /** Current value of the field */
  value: string;
  /** Current error message, if any */
  error: string | undefined;
  /** Whether the field has been focused and blurred */
  touched: boolean;
  /** Whether the field value has been changed from initial */
  dirty: boolean;
}

/**
 * Configuration options for the useFormValidation hook.
 */
export interface UseFormValidationOptions {
  /**
   * Validate field on every change event.
   * @default false
   */
  validateOnChange?: boolean;

  /**
   * Validate field when it loses focus.
   * @default false
   */
  validateOnBlur?: boolean;
}

/**
 * Return type for the register function.
 * Provides props to spread onto input elements.
 */
export interface RegisterReturn {
  /** Current field value */
  value: string;
  /** Change handler for input events */
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  /** Blur handler for validation on blur */
  onBlur: () => void;
  /** Current error message, if any */
  error: string | undefined;
}

/**
 * Return type for the useFormValidation hook.
 */
export interface UseFormValidationReturn {
  /**
   * Registers a field with the form.
   * Returns props to spread onto the input element.
   *
   * @param name - Unique field identifier
   * @param rules - Optional validation rules for the field
   * @returns Object with value, onChange, onBlur, and error props
   *
   * @example
   * <Input {...register('email', { required: true, email: true })} />
   */
  register: (name: string, rules?: ValidationRule) => RegisterReturn;

  /**
   * Wraps the form submit handler with validation.
   * Prevents submission and validates all fields if form is invalid.
   *
   * @param onSubmit - Callback function receiving validated form values
   * @returns Form event handler
   *
   * @example
   * <form onSubmit={handleSubmit((values) => console.log(values))}>
   */
  handleSubmit: (
    onSubmit: (values: Record<string, string>) => void
  ) => (e: React.FormEvent) => void;

  /** Map of field names to error messages */
  errors: Record<string, string | undefined>;

  /** Map of field names to current values */
  values: Record<string, string>;

  /** Whether all fields pass validation */
  isValid: boolean;

  /**
   * Resets form to initial state.
   * Clears all values, errors, touched, and dirty states.
   */
  reset: () => void;

  /**
   * Programmatically sets a field value.
   * Useful for external updates like autocomplete.
   *
   * @param name - Field name to update
   * @param value - New value to set
   */
  setFieldValue: (name: string, value: string) => void;
}

/**
 * Internal field state including validation rules.
 */
interface InternalFieldState extends FieldState {
  rules?: ValidationRule;
}

/**
 * Email validation regex pattern.
 * Follows RFC 5322 simplified pattern for common email formats.
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates a single field value against its rules.
 *
 * @param value - The value to validate
 * @param rules - The validation rules to apply
 * @returns Error message if validation fails, undefined if valid
 */
function validateField(
  value: string,
  rules?: ValidationRule
): string | undefined {
  if (!rules) return undefined;

  // Required validation
  if (rules.required) {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return typeof rules.required === "string"
        ? rules.required
        : "This field is required";
    }
  }

  // Skip other validations if value is empty (and not required)
  if (!value.trim()) {
    return undefined;
  }

  // Email validation
  if (rules.email) {
    if (!EMAIL_REGEX.test(value)) {
      return typeof rules.email === "string"
        ? rules.email
        : "Please enter a valid email address";
    }
  }

  // MinLength validation
  if (rules.minLength) {
    if (value.length < rules.minLength.value) {
      return rules.minLength.message;
    }
  }

  // MaxLength validation
  if (rules.maxLength) {
    if (value.length > rules.maxLength.value) {
      return rules.maxLength.message;
    }
  }

  // Pattern validation
  if (rules.pattern) {
    if (!rules.pattern.value.test(value)) {
      return rules.pattern.message;
    }
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      return customError;
    }
  }

  return undefined;
}

/**
 * Custom hook for form validation with built-in validators.
 *
 * Provides a declarative way to handle form validation with support for
 * common validation patterns like required fields, email format, min/max
 * length, regex patterns, and custom validation functions.
 *
 * @param options - Configuration options for validation behavior
 * @returns Object with register, handleSubmit, errors, values, isValid, reset, and setFieldValue
 *
 * @example
 * // Contact form with validation
 * function ContactForm() {
 *   const { register, handleSubmit, errors, isValid } = useFormValidation({
 *     validateOnBlur: true,
 *     validateOnChange: false
 *   });
 *
 *   const onSubmit = (values: Record<string, string>) => {
 *     console.log('Form submitted:', values);
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <Input
 *         label="Email"
 *         {...register('email', {
 *           required: 'Email is required',
 *           email: 'Please enter a valid email'
 *         })}
 *       />
 *       <Input
 *         label="Phone"
 *         {...register('phone', {
 *           pattern: {
 *             value: /^\+?[\d\s-()]+$/,
 *             message: 'Please enter a valid phone number'
 *           }
 *         })}
 *       />
 *       <TextArea
 *         label="Message"
 *         {...register('message', {
 *           required: true,
 *           minLength: { value: 10, message: 'Message must be at least 10 characters' },
 *           maxLength: { value: 500, message: 'Message cannot exceed 500 characters' }
 *         })}
 *       />
 *       <Button type="submit" disabled={!isValid}>
 *         Send Message
 *       </Button>
 *     </form>
 *   );
 * }
 */
export function useFormValidation(
  options: UseFormValidationOptions = {}
): UseFormValidationReturn {
  const { validateOnChange = false, validateOnBlur = false } = options;

  // Store all field states
  const [fields, setFields] = useState<Record<string, InternalFieldState>>({});

  /**
   * Validates all registered fields and returns whether form is valid.
   * Updates error state for each field.
   */
  const validateAllFields = useCallback((): boolean => {
    let formIsValid = true;

    setFields((prevFields) => {
      const newFields = { ...prevFields };

      Object.keys(newFields).forEach((name) => {
        const field = newFields[name];
        const error = validateField(field.value, field.rules);
        newFields[name] = {
          ...field,
          error,
          touched: true,
        };
        if (error) {
          formIsValid = false;
        }
      });

      return newFields;
    });

    return formIsValid;
  }, []);

  /**
   * Registers a field with validation rules.
   * Returns props to spread onto input elements.
   */
  const register = useCallback(
    (name: string, rules?: ValidationRule): RegisterReturn => {
      // Initialize field if not exists
      if (!fields[name]) {
        // Use setTimeout to avoid state update during render
        setTimeout(() => {
          setFields((prev) => {
            if (prev[name]) return prev;
            return {
              ...prev,
              [name]: {
                value: "",
                error: undefined,
                touched: false,
                dirty: false,
                rules,
              },
            };
          });
        }, 0);
      }

      const field = fields[name] || {
        value: "",
        error: undefined,
        touched: false,
        dirty: false,
        rules,
      };

      const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const newValue = e.target.value;

        setFields((prev) => {
          const currentField = prev[name] || {
            value: "",
            error: undefined,
            touched: false,
            dirty: false,
            rules,
          };

          let newError = currentField.error;

          // Validate on change if option is enabled
          if (validateOnChange) {
            newError = validateField(newValue, rules);
          }

          return {
            ...prev,
            [name]: {
              ...currentField,
              value: newValue,
              dirty: true,
              error: newError,
              rules,
            },
          };
        });
      };

      const onBlur = () => {
        setFields((prev) => {
          const currentField = prev[name];
          if (!currentField) return prev;

          let newError = currentField.error;

          // Validate on blur if option is enabled
          if (validateOnBlur) {
            newError = validateField(currentField.value, rules);
          }

          return {
            ...prev,
            [name]: {
              ...currentField,
              touched: true,
              error: newError,
            },
          };
        });
      };

      return {
        value: field.value,
        onChange,
        onBlur,
        error: field.error,
      };
    },
    [fields, validateOnChange, validateOnBlur]
  );

  /**
   * Wraps submit handler with validation.
   */
  const handleSubmit = useCallback(
    (onSubmit: (values: Record<string, string>) => void) => {
      return (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        let formIsValid = true;
        const newFields: Record<string, InternalFieldState> = {};

        Object.keys(fields).forEach((name) => {
          const field = fields[name];
          const error = validateField(field.value, field.rules);
          newFields[name] = {
            ...field,
            error,
            touched: true,
          };
          if (error) {
            formIsValid = false;
          }
        });

        setFields(newFields);

        if (formIsValid) {
          // Extract values
          const values: Record<string, string> = {};
          Object.keys(newFields).forEach((name) => {
            values[name] = newFields[name].value;
          });
          onSubmit(values);
        }
      };
    },
    [fields]
  );

  /**
   * Computed errors object for external access.
   */
  const errors = useMemo(() => {
    const errorMap: Record<string, string | undefined> = {};
    Object.keys(fields).forEach((name) => {
      errorMap[name] = fields[name].error;
    });
    return errorMap;
  }, [fields]);

  /**
   * Computed values object for external access.
   */
  const values = useMemo(() => {
    const valueMap: Record<string, string> = {};
    Object.keys(fields).forEach((name) => {
      valueMap[name] = fields[name].value;
    });
    return valueMap;
  }, [fields]);

  /**
   * Computed validity check across all fields.
   */
  const isValid = useMemo(() => {
    const fieldNames = Object.keys(fields);

    // If no fields registered, form is not valid
    if (fieldNames.length === 0) {
      return false;
    }

    // Check if all fields pass validation
    return fieldNames.every((name) => {
      const field = fields[name];
      const error = validateField(field.value, field.rules);
      return !error;
    });
  }, [fields]);

  /**
   * Resets form to initial state.
   */
  const reset = useCallback(() => {
    setFields((prev) => {
      const newFields: Record<string, InternalFieldState> = {};
      Object.keys(prev).forEach((name) => {
        newFields[name] = {
          value: "",
          error: undefined,
          touched: false,
          dirty: false,
          rules: prev[name].rules,
        };
      });
      return newFields;
    });
  }, []);

  /**
   * Sets a field value programmatically.
   */
  const setFieldValue = useCallback(
    (name: string, value: string) => {
      setFields((prev) => {
        const currentField = prev[name];
        if (!currentField) {
          return {
            ...prev,
            [name]: {
              value,
              error: undefined,
              touched: false,
              dirty: true,
              rules: undefined,
            },
          };
        }

        let newError = currentField.error;

        // Validate if validateOnChange is enabled
        if (validateOnChange) {
          newError = validateField(value, currentField.rules);
        }

        return {
          ...prev,
          [name]: {
            ...currentField,
            value,
            dirty: true,
            error: newError,
          },
        };
      });
    },
    [validateOnChange]
  );

  return {
    register,
    handleSubmit,
    errors,
    values,
    isValid,
    reset,
    setFieldValue,
  };
}

export default useFormValidation;

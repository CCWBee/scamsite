/**
 * Tests for useFormValidation Hook
 *
 * Comprehensive test suite covering all validation rules, hook behavior,
 * and edge cases for the form validation hook.
 */

import { renderHook, act } from "@testing-library/react";
import { useFormValidation, ValidationRule } from "./useFormValidation";

describe("useFormValidation", () => {
  describe("initialization", () => {
    it("should return initial state with empty values and errors", () => {
      const { result } = renderHook(() => useFormValidation());

      expect(result.current.values).toEqual({});
      expect(result.current.errors).toEqual({});
      expect(result.current.isValid).toBe(false);
    });

    it("should accept options for validateOnChange and validateOnBlur", () => {
      const { result } = renderHook(() =>
        useFormValidation({
          validateOnChange: true,
          validateOnBlur: true,
        })
      );

      expect(result.current).toBeDefined();
    });
  });

  describe("register", () => {
    it("should register a field and return correct props", async () => {
      const { result } = renderHook(() => useFormValidation());

      let registerResult: ReturnType<typeof result.current.register>;

      act(() => {
        registerResult = result.current.register("email");
      });

      // Wait for state to update
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(registerResult!.value).toBe("");
      expect(registerResult!.error).toBeUndefined();
      expect(typeof registerResult!.onChange).toBe("function");
      expect(typeof registerResult!.onBlur).toBe("function");
    });

    it("should update value on change", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("email");
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "test@example.com" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("email");
        onChange(mockEvent);
      });

      expect(result.current.values.email).toBe("test@example.com");
    });

    it("should mark field as touched on blur", async () => {
      const { result } = renderHook(() =>
        useFormValidation({ validateOnBlur: true })
      );

      act(() => {
        result.current.register("email", { required: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      act(() => {
        const { onBlur } = result.current.register("email", { required: true });
        onBlur();
      });

      expect(result.current.errors.email).toBe("This field is required");
    });
  });

  describe("required validation", () => {
    it("should validate required field with default message", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("name", { required: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.name).toBe("This field is required");
      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it("should validate required field with custom message", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("name", { required: "Name is required" });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.name).toBe("Name is required");
    });

    it("should pass required validation when field has value", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("name", { required: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("name", { required: true });
        onChange(mockEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.name).toBeUndefined();
      expect(mockSubmit).toHaveBeenCalledWith({ name: "John Doe" });
    });

    it("should trim whitespace when checking required", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("name", { required: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "   " },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("name", { required: true });
        onChange(mockEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.name).toBe("This field is required");
    });
  });

  describe("email validation", () => {
    it("should validate email format with default message", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("email", { email: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "invalid-email" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("email", { email: true });
        onChange(mockEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.email).toBe("Please enter a valid email address");
    });

    it("should validate email format with custom message", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("email", { email: "Invalid email format" });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "not-an-email" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("email", {
          email: "Invalid email format",
        });
        onChange(mockEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.email).toBe("Invalid email format");
    });

    it("should pass valid email addresses", async () => {
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "user+tag@example.org",
        "name123@test.io",
      ];

      for (const email of validEmails) {
        const { result } = renderHook(() => useFormValidation());

        act(() => {
          result.current.register("email", { email: true });
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
        });

        const mockEvent = {
          target: { value: email },
        } as React.ChangeEvent<HTMLInputElement>;

        act(() => {
          const { onChange } = result.current.register("email", { email: true });
          onChange(mockEvent);
        });

        const mockSubmit = jest.fn();

        act(() => {
          const submitHandler = result.current.handleSubmit(mockSubmit);
          submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
        });

        expect(result.current.errors.email).toBeUndefined();
      }
    });

    it("should skip email validation for empty non-required field", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("email", { email: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.email).toBeUndefined();
    });
  });

  describe("minLength validation", () => {
    it("should validate minimum length", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("message", {
          minLength: { value: 10, message: "Must be at least 10 characters" },
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "short" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("message", {
          minLength: { value: 10, message: "Must be at least 10 characters" },
        });
        onChange(mockEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.message).toBe("Must be at least 10 characters");
    });

    it("should pass when meeting minimum length", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("message", {
          minLength: { value: 10, message: "Must be at least 10 characters" },
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "This is a long enough message" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("message", {
          minLength: { value: 10, message: "Must be at least 10 characters" },
        });
        onChange(mockEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.message).toBeUndefined();
    });
  });

  describe("maxLength validation", () => {
    it("should validate maximum length", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("title", {
          maxLength: { value: 20, message: "Cannot exceed 20 characters" },
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "This title is way too long for the limit" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("title", {
          maxLength: { value: 20, message: "Cannot exceed 20 characters" },
        });
        onChange(mockEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.title).toBe("Cannot exceed 20 characters");
    });

    it("should pass when under maximum length", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("title", {
          maxLength: { value: 20, message: "Cannot exceed 20 characters" },
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "Short title" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("title", {
          maxLength: { value: 20, message: "Cannot exceed 20 characters" },
        });
        onChange(mockEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.title).toBeUndefined();
    });
  });

  describe("pattern validation", () => {
    it("should validate against regex pattern", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("phone", {
          pattern: {
            value: /^\+?[\d\s-()]+$/,
            message: "Please enter a valid phone number",
          },
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "not a phone number!" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("phone", {
          pattern: {
            value: /^\+?[\d\s-()]+$/,
            message: "Please enter a valid phone number",
          },
        });
        onChange(mockEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.phone).toBe("Please enter a valid phone number");
    });

    it("should pass valid pattern", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("phone", {
          pattern: {
            value: /^\+?[\d\s-()]+$/,
            message: "Please enter a valid phone number",
          },
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "+44 1534 612612" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("phone", {
          pattern: {
            value: /^\+?[\d\s-()]+$/,
            message: "Please enter a valid phone number",
          },
        });
        onChange(mockEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.phone).toBeUndefined();
    });
  });

  describe("custom validation", () => {
    it("should run custom validation function", async () => {
      const { result } = renderHook(() => useFormValidation());

      const customValidator = (value: string) => {
        if (value.toLowerCase().includes("scam")) {
          return "Message cannot contain the word 'scam'";
        }
        return undefined;
      };

      act(() => {
        result.current.register("message", { custom: customValidator });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "This is a scam message" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("message", {
          custom: customValidator,
        });
        onChange(mockEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.message).toBe(
        "Message cannot contain the word 'scam'"
      );
    });

    it("should pass when custom validation returns undefined", async () => {
      const { result } = renderHook(() => useFormValidation());

      const customValidator = (value: string) => {
        if (value.length < 5) {
          return "Too short";
        }
        return undefined;
      };

      act(() => {
        result.current.register("field", { custom: customValidator });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "Valid input" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("field", {
          custom: customValidator,
        });
        onChange(mockEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.field).toBeUndefined();
    });
  });

  describe("combined validations", () => {
    it("should validate multiple rules on same field", async () => {
      const { result } = renderHook(() => useFormValidation());

      const rules: ValidationRule = {
        required: "Email is required",
        email: "Please enter a valid email",
      };

      act(() => {
        result.current.register("email", rules);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      // Test required validation first (empty field)
      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.email).toBe("Email is required");

      // Now add invalid email
      const mockEvent = {
        target: { value: "invalid" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("email", rules);
        onChange(mockEvent);
      });

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.email).toBe("Please enter a valid email");
    });
  });

  describe("handleSubmit", () => {
    it("should prevent default form submission", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("name", { required: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it("should call onSubmit with values when form is valid", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("name", { required: true });
        result.current.register("email", { email: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const nameEvent = {
        target: { value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>;

      const emailEvent = {
        target: { value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange: nameOnChange } = result.current.register("name", {
          required: true,
        });
        const { onChange: emailOnChange } = result.current.register("email", {
          email: true,
        });
        nameOnChange(nameEvent);
        emailOnChange(emailEvent);
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(mockSubmit).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
      });
    });

    it("should not call onSubmit when form is invalid", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("name", { required: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });

  describe("isValid", () => {
    it("should be false when no fields are registered", () => {
      const { result } = renderHook(() => useFormValidation());

      expect(result.current.isValid).toBe(false);
    });

    it("should be false when required field is empty", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("name", { required: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(result.current.isValid).toBe(false);
    });

    it("should be true when all validations pass", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("name", { required: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("name", { required: true });
        onChange(mockEvent);
      });

      expect(result.current.isValid).toBe(true);
    });
  });

  describe("reset", () => {
    it("should reset all field values to empty", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("name");
        result.current.register("email");
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const nameEvent = {
        target: { value: "John" },
      } as React.ChangeEvent<HTMLInputElement>;

      const emailEvent = {
        target: { value: "john@example.com" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange: nameOnChange } = result.current.register("name");
        const { onChange: emailOnChange } = result.current.register("email");
        nameOnChange(nameEvent);
        emailOnChange(emailEvent);
      });

      expect(result.current.values.name).toBe("John");
      expect(result.current.values.email).toBe("john@example.com");

      act(() => {
        result.current.reset();
      });

      expect(result.current.values.name).toBe("");
      expect(result.current.values.email).toBe("");
    });

    it("should clear all errors", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("name", { required: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      // Trigger validation
      const mockSubmit = jest.fn();

      act(() => {
        const submitHandler = result.current.handleSubmit(mockSubmit);
        submitHandler({ preventDefault: jest.fn() } as unknown as React.FormEvent);
      });

      expect(result.current.errors.name).toBe("This field is required");

      act(() => {
        result.current.reset();
      });

      expect(result.current.errors.name).toBeUndefined();
    });
  });

  describe("setFieldValue", () => {
    it("should set a field value programmatically", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.register("name");
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      act(() => {
        result.current.setFieldValue("name", "Jane Doe");
      });

      expect(result.current.values.name).toBe("Jane Doe");
    });

    it("should validate when validateOnChange is true", async () => {
      const { result } = renderHook(() =>
        useFormValidation({ validateOnChange: true })
      );

      act(() => {
        result.current.register("email", { email: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      act(() => {
        result.current.setFieldValue("email", "invalid-email");
      });

      expect(result.current.errors.email).toBe(
        "Please enter a valid email address"
      );
    });

    it("should create field if it does not exist", async () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.setFieldValue("newField", "new value");
      });

      expect(result.current.values.newField).toBe("new value");
    });
  });

  describe("validateOnChange option", () => {
    it("should validate on every change when enabled", async () => {
      const { result } = renderHook(() =>
        useFormValidation({ validateOnChange: true })
      );

      act(() => {
        result.current.register("email", { email: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "invalid" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("email", { email: true });
        onChange(mockEvent);
      });

      expect(result.current.errors.email).toBe(
        "Please enter a valid email address"
      );
    });

    it("should not validate on change when disabled", async () => {
      const { result } = renderHook(() =>
        useFormValidation({ validateOnChange: false })
      );

      act(() => {
        result.current.register("email", { email: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "invalid" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("email", { email: true });
        onChange(mockEvent);
      });

      // Error should not be set until submit or blur
      expect(result.current.errors.email).toBeUndefined();
    });
  });

  describe("validateOnBlur option", () => {
    it("should validate on blur when enabled", async () => {
      const { result } = renderHook(() =>
        useFormValidation({ validateOnBlur: true })
      );

      act(() => {
        result.current.register("email", { email: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "invalid" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange } = result.current.register("email", { email: true });
        onChange(mockEvent);
      });

      // No error yet
      expect(result.current.errors.email).toBeUndefined();

      act(() => {
        const { onBlur } = result.current.register("email", { email: true });
        onBlur();
      });

      expect(result.current.errors.email).toBe(
        "Please enter a valid email address"
      );
    });

    it("should not validate on blur when disabled", async () => {
      const { result } = renderHook(() =>
        useFormValidation({ validateOnBlur: false })
      );

      act(() => {
        result.current.register("email", { email: true });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const mockEvent = {
        target: { value: "invalid" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        const { onChange, onBlur } = result.current.register("email", {
          email: true,
        });
        onChange(mockEvent);
        onBlur();
      });

      // Error should not be set until submit
      expect(result.current.errors.email).toBeUndefined();
    });
  });
});

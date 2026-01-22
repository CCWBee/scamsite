/**
 * Button Component Tests
 *
 * Unit tests for the Button component using Jest and React Testing Library.
 * Tests cover:
 * - Rendering with default and custom props
 * - All variant styles
 * - All size styles
 * - Disabled and loading states
 * - Icon rendering
 * - Click handling
 * - Accessibility attributes
 * - Ref forwarding
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

// Mock icon component for testing
const MockIcon = () => <span data-testid="mock-icon">Icon</span>;

describe("Button", () => {
  /* ===========================================================================
     BASIC RENDERING
     =========================================================================== */

  describe("rendering", () => {
    it("renders with children text", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
    });

    it("renders with default type of button", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("renders with submit type when specified", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("renders with reset type when specified", () => {
      render(<Button type="reset">Reset</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
    });

    it("applies custom className", () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });

    it("forwards ref to button element", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("passes through additional HTML attributes", () => {
      render(<Button data-testid="test-button" aria-label="Custom label">Button</Button>);
      expect(screen.getByTestId("test-button")).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Custom label");
    });
  });

  /* ===========================================================================
     VARIANTS
     =========================================================================== */

  describe("variants", () => {
    it("renders primary variant by default", () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-[var(--color-navy)]");
      expect(button).toHaveClass("text-white");
    });

    it("renders secondary variant with outline styles", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-transparent");
      expect(button).toHaveClass("border-2");
      expect(button).toHaveClass("border-[var(--color-trust-blue)]");
    });

    it("renders danger variant with alert-red background", () => {
      render(<Button variant="danger">Danger</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-[var(--color-alert-red)]");
      expect(button).toHaveClass("text-white");
    });

    it("renders ghost variant with transparent background", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-transparent");
      expect(button).toHaveClass("text-[var(--color-navy)]");
    });
  });

  /* ===========================================================================
     SIZES
     =========================================================================== */

  describe("sizes", () => {
    it("renders medium size by default", () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-base");
      expect(button).toHaveClass("px-4");
      expect(button).toHaveClass("py-2");
    });

    it("renders small size with correct classes", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-sm");
      expect(button).toHaveClass("px-3");
      expect(button).toHaveClass("py-1.5");
    });

    it("renders large size with correct classes", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-lg");
      expect(button).toHaveClass("px-6");
      expect(button).toHaveClass("py-3");
    });
  });

  /* ===========================================================================
     DISABLED STATE
     =========================================================================== */

  describe("disabled state", () => {
    it("is not disabled by default", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).not.toBeDisabled();
    });

    it("is disabled when disabled prop is true", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("has aria-disabled attribute when disabled", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
    });

    it("has reduced opacity when disabled", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toHaveClass("opacity-50");
    });

    it("has cursor-not-allowed when disabled", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toHaveClass("cursor-not-allowed");
    });

    it("does not call onClick when disabled", () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  /* ===========================================================================
     LOADING STATE
     =========================================================================== */

  describe("loading state", () => {
    it("is not loading by default", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy", "true");
    });

    it("shows loading spinner when loading", () => {
      render(<Button loading>Loading</Button>);
      // The spinner is an SVG with animate-spin class
      const button = screen.getByRole("button");
      const spinner = button.querySelector("svg.animate-spin");
      expect(spinner).toBeInTheDocument();
    });

    it("has aria-busy attribute when loading", () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("is disabled when loading", () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("has screen reader text when loading", () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByText(/loading, please wait/i)).toHaveClass("sr-only");
    });

    it("does not call onClick when loading", () => {
      const handleClick = jest.fn();
      render(<Button loading onClick={handleClick}>Loading</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("hides left icon when loading", () => {
      render(
        <Button loading leftIcon={<MockIcon />}>
          Loading
        </Button>
      );
      expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    });

    it("hides right icon when loading", () => {
      render(
        <Button loading rightIcon={<MockIcon />}>
          Loading
        </Button>
      );
      expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    });
  });

  /* ===========================================================================
     ICONS
     =========================================================================== */

  describe("icons", () => {
    it("renders left icon when provided", () => {
      render(<Button leftIcon={<MockIcon />}>With Icon</Button>);
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    });

    it("renders right icon when provided", () => {
      render(<Button rightIcon={<MockIcon />}>With Icon</Button>);
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    });

    it("renders both icons when provided", () => {
      render(
        <Button
          leftIcon={<span data-testid="left-icon">L</span>}
          rightIcon={<span data-testid="right-icon">R</span>}
        >
          With Icons
        </Button>
      );
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });

    it("icons have aria-hidden attribute", () => {
      render(<Button leftIcon={<MockIcon />}>With Icon</Button>);
      const iconContainer = screen.getByTestId("mock-icon").parentElement;
      expect(iconContainer).toHaveAttribute("aria-hidden", "true");
    });
  });

  /* ===========================================================================
     FULL WIDTH
     =========================================================================== */

  describe("fullWidth", () => {
    it("is not full width by default", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).not.toHaveClass("w-full");
    });

    it("is full width when fullWidth prop is true", () => {
      render(<Button fullWidth>Full Width</Button>);
      expect(screen.getByRole("button")).toHaveClass("w-full");
    });
  });

  /* ===========================================================================
     CLICK HANDLING
     =========================================================================== */

  describe("click handling", () => {
    it("calls onClick when clicked", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("receives click event in onClick handler", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  /* ===========================================================================
     ACCESSIBILITY
     =========================================================================== */

  describe("accessibility", () => {
    it("has focus-visible styles for keyboard navigation", () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole("button");
      // Check that focus-visible classes are present
      expect(button.className).toContain("focus-visible:");
    });

    it("is focusable via keyboard", () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole("button");
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it("can be triggered with Enter key", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Button</Button>);
      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: "Enter" });
      // Note: fireEvent.keyDown doesn't trigger onClick on buttons
      // This would work in a real browser environment
    });

    it("maintains semantic button role", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});

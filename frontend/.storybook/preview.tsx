/**
 * Storybook Preview Configuration
 *
 * This file configures global decorators, parameters, and styles for all stories.
 * It ensures consistent rendering across components and enables accessibility testing.
 *
 * Key features:
 * - Global CSS imports (design tokens, Tailwind)
 * - Responsive viewport presets matching CLAUDE.md breakpoints
 * - Accessibility addon configuration
 * - Consistent component padding/background decorators
 */

import React from "react";
import type { Preview } from "@storybook/nextjs";
import "../src/app/globals.css";

/**
 * Viewport Configuration
 *
 * Defines responsive breakpoints for testing components at different screen sizes.
 * These match the breakpoints specified in CLAUDE.md:
 * - Mobile: 320px
 * - Tablet: 768px
 * - Desktop: 1024px
 * - Large Desktop: 1440px
 */
const customViewports = {
  mobile: {
    name: "Mobile (320px)",
    styles: {
      width: "320px",
      height: "568px",
    },
    type: "mobile" as const,
  },
  tablet: {
    name: "Tablet (768px)",
    styles: {
      width: "768px",
      height: "1024px",
    },
    type: "tablet" as const,
  },
  desktop: {
    name: "Desktop (1024px)",
    styles: {
      width: "1024px",
      height: "768px",
    },
    type: "desktop" as const,
  },
  largeDesktop: {
    name: "Large Desktop (1440px)",
    styles: {
      width: "1440px",
      height: "900px",
    },
    type: "desktop" as const,
  },
};

/**
 * Preview Configuration
 *
 * Global parameters and decorators applied to all stories.
 */
const preview: Preview = {
  parameters: {
    /**
     * Actions Configuration
     * Automatically detect event handlers starting with "on" (onClick, onChange, etc.)
     */
    actions: { argTypesRegex: "^on[A-Z].*" },

    /**
     * Controls Configuration
     * Enhance the controls panel with color pickers and date pickers
     * based on prop naming conventions
     */
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    /**
     * Viewport Configuration
     * Register custom viewports and set mobile as default for mobile-first development
     */
    viewport: {
      viewports: customViewports,
      defaultViewport: "mobile",
    },

    /**
     * Accessibility (a11y) Configuration
     *
     * Configure the accessibility addon for WCAG 2.1 AA compliance testing.
     * This helps identify accessibility issues during component development.
     *
     * Rules configuration:
     * - Enables all axe-core rules by default
     * - Can be customized per-story if needed
     */
    a11y: {
      // Element to check for accessibility (entire story canvas)
      element: "#storybook-root",
      // Run accessibility checks automatically
      manual: false,
      // axe-core configuration
      config: {
        rules: [
          {
            // Ensure sufficient color contrast (WCAG 2.1 AA requires 4.5:1 for normal text)
            id: "color-contrast",
            enabled: true,
          },
          {
            // Ensure all images have alt text
            id: "image-alt",
            enabled: true,
          },
          {
            // Ensure form inputs have associated labels
            id: "label",
            enabled: true,
          },
          {
            // Ensure links have discernible text
            id: "link-name",
            enabled: true,
          },
          {
            // Ensure buttons have discernible text
            id: "button-name",
            enabled: true,
          },
        ],
      },
    },

    /**
     * Backgrounds Configuration
     * Provide background color options for testing component visibility
     */
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1f3d" }, // Navy from design tokens
        { name: "gray", value: "#f3f4f6" }, // Gray-100 from design tokens
      ],
    },

    /**
     * Layout Configuration
     * Default to centered layout for isolated component viewing
     */
    layout: "centered",
  },

  /**
   * Global Decorators
   *
   * Decorators wrap all stories with consistent styling and context.
   * This ensures components render with proper padding and background.
   */
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "1rem",
          minHeight: "100px",
        }}
      >
        <Story />
      </div>
    ),
  ],

  /**
   * Tags Configuration
   *
   * Enable autodocs for stories tagged with "autodocs"
   * This allows automatic documentation generation
   */
  tags: ["autodocs"],
};

export default preview;

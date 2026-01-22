/**
 * Example Component Stories
 *
 * Storybook stories for the Example component demonstrating:
 * - All visual variants (primary, secondary, danger)
 * - All sizes (small, medium, large)
 * - Interactive states (default, disabled)
 * - Accessibility testing with a11y addon
 *
 * Story organization follows Storybook best practices:
 * - Default story shows the primary use case
 * - Variant stories demonstrate visual options
 * - State stories show interactive behaviors
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Example } from "./Example";

/**
 * Meta configuration for the Example component stories
 *
 * - title: Defines the location in Storybook's sidebar navigation
 * - component: Links to the component for prop extraction
 * - tags: Enables automatic documentation generation
 * - argTypes: Enhances controls panel with better UI elements
 */
const meta: Meta<typeof Example> = {
  title: "UI/Example",
  component: Example,
  tags: ["autodocs"],
  parameters: {
    // Accessibility panel is enabled by default via preview.ts
    // Additional story-specific a11y config can be added here
    docs: {
      description: {
        component:
          "A demonstration component showing ScamAware Jersey design tokens and Storybook integration. This component can be safely removed once real components are created.",
      },
    },
  },
  argTypes: {
    // Variant selector with radio buttons for better UX
    variant: {
      control: "radio",
      options: ["primary", "secondary", "danger"],
      description: "Visual variant determining the color scheme",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    // Size selector with radio buttons
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      description: "Size of the component",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    // Boolean toggle for disabled state
    disabled: {
      control: "boolean",
      description: "Whether the component is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    // Text input for label
    label: {
      control: "text",
      description: "The text content to display",
    },
    // Action logger for click events
    onClick: {
      action: "clicked",
      description: "Click handler function",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Example>;

/**
 * Default Story
 *
 * Shows the component with default props (primary variant, medium size).
 * This is the most common use case.
 */
export const Default: Story = {
  args: {
    label: "Example Button",
  },
};

/**
 * Primary Variant
 *
 * Uses trust-blue color from the JFSC design system.
 * Best for main call-to-action buttons.
 */
export const Primary: Story = {
  args: {
    label: "Primary Action",
    variant: "primary",
  },
};

/**
 * Secondary Variant
 *
 * Uses navy color from the JFSC design system.
 * Best for secondary actions that don't compete with the primary CTA.
 */
export const Secondary: Story = {
  args: {
    label: "Secondary Action",
    variant: "secondary",
  },
};

/**
 * Danger Variant
 *
 * Uses alert-red color from the JFSC design system.
 * Best for destructive actions or urgent warnings (appropriate for a scam awareness site).
 */
export const Danger: Story = {
  args: {
    label: "Report Scam",
    variant: "danger",
  },
};

/**
 * Small Size
 *
 * Compact size for use in tight spaces or as secondary actions.
 */
export const Small: Story = {
  args: {
    label: "Small Button",
    size: "small",
  },
};

/**
 * Large Size
 *
 * Prominent size for emphasis, hero sections, or important CTAs.
 */
export const Large: Story = {
  args: {
    label: "Large Button",
    size: "large",
  },
};

/**
 * Disabled State
 *
 * Shows the component in its disabled state.
 * Reduced opacity and cursor change indicate non-interactivity.
 * The aria-disabled attribute ensures accessibility tools recognize the state.
 */
export const Disabled: Story = {
  args: {
    label: "Disabled Button",
    disabled: true,
  },
};

/**
 * All Variants
 *
 * Shows all three variants side by side for comparison.
 * Useful for design review and documentation.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Example label="Primary" variant="primary" />
      <Example label="Secondary" variant="secondary" />
      <Example label="Danger" variant="danger" />
    </div>
  ),
};

/**
 * All Sizes
 *
 * Shows all three sizes side by side for comparison.
 * Demonstrates the size hierarchy.
 */
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Example label="Small" size="small" />
      <Example label="Medium" size="medium" />
      <Example label="Large" size="large" />
    </div>
  ),
};

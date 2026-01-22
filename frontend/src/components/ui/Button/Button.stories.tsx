/**
 * Button Component Stories
 *
 * Storybook stories for the Button component demonstrating:
 * - All visual variants (primary, secondary, danger, ghost)
 * - All sizes (sm, md, lg)
 * - Interactive states (default, hover, focus, active, disabled, loading)
 * - Icon support (left, right, both)
 * - Full width option
 * - Accessibility testing with a11y addon
 *
 * Story organization follows Storybook best practices:
 * - Default story shows the primary use case
 * - Variant stories demonstrate visual options
 * - State stories show interactive behaviors
 * - Composition stories show real-world usage patterns
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

/**
 * Example icon components for demonstration
 * In production, these would be imported from a library like Lucide or Heroicons
 */
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-full h-full"
  >
    <path
      fillRule="evenodd"
      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-full h-full"
  >
    <path
      fillRule="evenodd"
      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
      clipRule="evenodd"
    />
  </svg>
);

const AlertIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-full h-full"
  >
    <path
      fillRule="evenodd"
      d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-full h-full"
  >
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

/**
 * Meta configuration for the Button component stories
 *
 * - title: Defines the location in Storybook's sidebar navigation
 * - component: Links to the component for prop extraction
 * - tags: Enables automatic documentation generation
 * - argTypes: Enhances controls panel with better UI elements
 */
const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A versatile button component for ScamAware Jersey. Supports multiple variants, sizes, loading states, and icon slots. Follows WCAG 2.1 AA accessibility guidelines.",
      },
    },
    // Ensure all stories are tested for accessibility
    a11y: {
      config: {
        rules: [
          // Ensure color contrast is sufficient
          { id: "color-contrast", enabled: true },
          // Ensure buttons have accessible names
          { id: "button-name", enabled: true },
        ],
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary", "danger", "ghost"],
      description: "Visual variant determining the color scheme and style",
      table: {
        type: { summary: "'primary' | 'secondary' | 'danger' | 'ghost'" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size of the button affecting padding and font size",
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    loading: {
      control: "boolean",
      description: "Whether the button is in a loading state",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the button should take full width",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    type: {
      control: "radio",
      options: ["button", "submit", "reset"],
      description: "HTML button type attribute",
      table: {
        defaultValue: { summary: "button" },
      },
    },
    children: {
      control: "text",
      description: "Button text content",
    },
    onClick: {
      action: "clicked",
      description: "Click handler function",
    },
    leftIcon: {
      control: false,
      description: "Icon to display on the left side of the text",
    },
    rightIcon: {
      control: false,
      description: "Icon to display on the right side of the text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* =============================================================================
   DEFAULT STORIES
   ============================================================================= */

/**
 * Default Story
 *
 * Shows the button with default props (primary variant, medium size).
 * This is the most common use case for main call-to-action buttons.
 */
export const Default: Story = {
  args: {
    children: "Button",
  },
};

/* =============================================================================
   VARIANT STORIES
   ============================================================================= */

/**
 * Primary Variant
 *
 * Navy background with white text. Used for main call-to-action buttons
 * that represent the primary action on a page.
 */
export const Primary: Story = {
  args: {
    children: "Primary Action",
    variant: "primary",
  },
};

/**
 * Secondary Variant
 *
 * Trust-blue outline with trust-blue text. Used for secondary actions
 * that complement the primary CTA without competing for attention.
 */
export const Secondary: Story = {
  args: {
    children: "Secondary Action",
    variant: "secondary",
  },
};

/**
 * Danger Variant
 *
 * Alert-red background with white text. Used for destructive actions
 * or urgent warnings. Appropriate for scam reporting or emergency actions.
 */
export const Danger: Story = {
  args: {
    children: "Report Scam",
    variant: "danger",
  },
};

/**
 * Ghost Variant
 *
 * Transparent background with navy text and subtle hover effect.
 * Used for tertiary actions or navigation-like buttons.
 */
export const Ghost: Story = {
  args: {
    children: "Learn More",
    variant: "ghost",
  },
};

/* =============================================================================
   SIZE STORIES
   ============================================================================= */

/**
 * Small Size
 *
 * Compact button for tight spaces, inline actions, or secondary UI elements.
 */
export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

/**
 * Medium Size (Default)
 *
 * Standard button size for most use cases.
 */
export const Medium: Story = {
  args: {
    children: "Medium Button",
    size: "md",
  },
};

/**
 * Large Size
 *
 * Prominent button for hero sections, important CTAs, or touch-friendly interfaces.
 */
export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

/* =============================================================================
   STATE STORIES
   ============================================================================= */

/**
 * Disabled State
 *
 * Shows the button in its disabled state with reduced opacity.
 * The button remains in tab order for accessibility (discoverability).
 */
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

/**
 * Loading State
 *
 * Shows the button with a loading spinner. The button is non-interactive
 * and displays aria-busy for screen readers.
 */
export const Loading: Story = {
  args: {
    children: "Submitting...",
    loading: true,
  },
};

/* =============================================================================
   ICON STORIES
   ============================================================================= */

/**
 * With Left Icon
 *
 * Button with an icon on the left side of the text.
 * Useful for search, add, or other action buttons.
 */
export const WithLeftIcon: Story = {
  args: {
    children: "Search",
    leftIcon: <SearchIcon />,
  },
};

/**
 * With Right Icon
 *
 * Button with an icon on the right side of the text.
 * Commonly used for "next" or "continue" actions.
 */
export const WithRightIcon: Story = {
  args: {
    children: "Continue",
    rightIcon: <ArrowRightIcon />,
  },
};

/**
 * With Both Icons
 *
 * Button with icons on both sides of the text.
 * Use sparingly to avoid visual clutter.
 */
export const WithBothIcons: Story = {
  args: {
    children: "Add New",
    leftIcon: <PlusIcon />,
    rightIcon: <ArrowRightIcon />,
  },
};

/* =============================================================================
   LAYOUT STORIES
   ============================================================================= */

/**
 * Full Width
 *
 * Button that spans the full width of its container.
 * Useful for mobile layouts or form submission buttons.
 */
export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

/* =============================================================================
   COMPARISON STORIES
   ============================================================================= */

/**
 * All Variants
 *
 * Shows all four variants side by side for comparison.
 * Useful for design review and documentation.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

/**
 * All Sizes
 *
 * Shows all three sizes side by side for comparison.
 * Demonstrates the size hierarchy clearly.
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
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * All Variants Disabled
 *
 * Shows all variants in their disabled state for comparison.
 */
export const AllVariantsDisabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="danger" disabled>
        Danger
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
    </div>
  ),
};

/**
 * All Variants Loading
 *
 * Shows all variants in their loading state for comparison.
 */
export const AllVariantsLoading: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="primary" loading>
        Primary
      </Button>
      <Button variant="secondary" loading>
        Secondary
      </Button>
      <Button variant="danger" loading>
        Danger
      </Button>
      <Button variant="ghost" loading>
        Ghost
      </Button>
    </div>
  ),
};

/* =============================================================================
   REAL-WORLD USAGE STORIES
   ============================================================================= */

/**
 * Scam Reporting Actions
 *
 * Example of button combinations for a scam reporting flow,
 * demonstrating real-world usage in the ScamAware Jersey context.
 */
export const ScamReportingActions: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px" }}>
      <Button variant="danger" leftIcon={<AlertIcon />} fullWidth>
        Report This Scam
      </Button>
      <Button variant="primary" rightIcon={<ArrowRightIcon />} fullWidth>
        Get Help Now
      </Button>
      <Button variant="secondary" fullWidth>
        Learn More About Scams
      </Button>
      <Button variant="ghost" fullWidth>
        Cancel
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example button layout for a scam reporting flow, showing how different variants work together in a real-world scenario.",
      },
    },
  },
};

/**
 * Form Actions
 *
 * Typical form action buttons with submit and cancel options.
 */
export const FormActions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary" type="submit">
        Submit Report
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Typical form action buttons with a primary submit and ghost cancel option.",
      },
    },
  },
};

/**
 * Button Group
 *
 * Multiple buttons arranged in a group, showing visual hierarchy.
 */
export const ButtonGroup: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Save Draft</Button>
      <Button variant="ghost">Discard</Button>
    </div>
  ),
};

/**
 * Icon-Only Button
 *
 * Button with only an icon (requires aria-label for accessibility).
 */
export const IconOnly: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Button aria-label="Search" size="sm">
        <SearchIcon />
      </Button>
      <Button aria-label="Search" size="md">
        <SearchIcon />
      </Button>
      <Button aria-label="Search" size="lg">
        <SearchIcon />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only buttons should always have an aria-label for accessibility. Consider using tooltip for sighted users.",
      },
    },
  },
};

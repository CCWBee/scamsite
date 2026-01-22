/**
 * Badge Component Stories
 *
 * Storybook stories for the Badge component demonstrating:
 * - All visual variants (info, success, warning, danger, neutral)
 * - All sizes (sm, md)
 * - Dot indicator functionality
 * - ScamAware Jersey use cases (danger levels, categories, status)
 *
 * Story organization follows Storybook best practices:
 * - Default story shows the primary use case
 * - Variant stories demonstrate visual options
 * - Use case stories show real-world applications
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

/**
 * Meta configuration for the Badge component stories
 */
const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A status indicator and label component for displaying danger levels, categories, and status indicators throughout the ScamAware Jersey application.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["info", "success", "warning", "danger", "neutral"],
      description: "Visual variant determining the color scheme",
      table: {
        defaultValue: { summary: "neutral" },
      },
    },
    size: {
      control: "radio",
      options: ["sm", "md"],
      description: "Size of the badge",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    dot: {
      control: "boolean",
      description: "Shows a colored dot indicator before text",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: "text",
      description: "The content to display inside the badge",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Default Story
 *
 * Shows the badge with default props (neutral variant, md size).
 */
export const Default: Story = {
  args: {
    children: "Badge",
  },
};

/**
 * Info Variant
 *
 * Uses trust-blue color from the JFSC design system.
 * Best for informational labels and general notifications.
 */
export const Info: Story = {
  args: {
    children: "Information",
    variant: "info",
  },
};

/**
 * Success Variant
 *
 * Uses success green for positive status indicators.
 * Best for verified content, safe indicators, and completed actions.
 */
export const Success: Story = {
  args: {
    children: "Verified",
    variant: "success",
  },
};

/**
 * Warning Variant
 *
 * Uses warning amber for cautionary indicators.
 * Best for moderate risk levels and items requiring attention.
 */
export const Warning: Story = {
  args: {
    children: "Moderate",
    variant: "warning",
  },
};

/**
 * Danger Variant
 *
 * Uses alert-red from the JFSC design system.
 * Best for high-risk scam indicators and critical warnings.
 */
export const Danger: Story = {
  args: {
    children: "High Risk",
    variant: "danger",
  },
};

/**
 * Neutral Variant
 *
 * Uses gray for generic labels without semantic meaning.
 */
export const Neutral: Story = {
  args: {
    children: "Category",
    variant: "neutral",
  },
};

/**
 * Small Size
 *
 * Compact size for inline use and tight spaces.
 */
export const Small: Story = {
  args: {
    children: "Small Badge",
    size: "sm",
  },
};

/**
 * With Dot Indicator
 *
 * Shows a colored dot before the text for visual status indication.
 * The dot color matches the variant.
 */
export const WithDot: Story = {
  args: {
    children: "Active",
    variant: "success",
    dot: true,
  },
};

/**
 * All Variants
 *
 * Shows all five variants side by side for comparison.
 * Useful for design review and documentation.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};

/**
 * All Variants with Dot
 *
 * Shows all variants with dot indicators enabled.
 */
export const AllVariantsWithDot: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Badge variant="info" dot>Info</Badge>
      <Badge variant="success" dot>Success</Badge>
      <Badge variant="warning" dot>Warning</Badge>
      <Badge variant="danger" dot>Danger</Badge>
      <Badge variant="neutral" dot>Neutral</Badge>
    </div>
  ),
};

/**
 * All Sizes
 *
 * Shows both sizes side by side for comparison.
 */
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};

/**
 * Danger Level Indicators
 *
 * Real-world ScamAware Jersey use case: showing scam danger levels.
 * This is the primary use case for Badge in the application.
 */
export const DangerLevelIndicators: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Badge variant="danger">HIGH RISK</Badge>
      <Badge variant="warning">MODERATE</Badge>
      <Badge variant="success">LOW</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows how badges are used to indicate scam danger levels throughout the ScamAware Jersey application.",
      },
    },
  },
};

/**
 * Danger Level Indicators with Dots
 *
 * Danger levels with dot indicators for enhanced visual hierarchy.
 */
export const DangerLevelIndicatorsWithDots: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Badge variant="danger" dot>HIGH RISK</Badge>
      <Badge variant="warning" dot>MODERATE</Badge>
      <Badge variant="success" dot>LOW</Badge>
    </div>
  ),
};

/**
 * Category Labels
 *
 * Real-world ScamAware Jersey use case: scam category labels.
 */
export const CategoryLabels: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Badge variant="info">Phishing</Badge>
      <Badge variant="info">Romance Scam</Badge>
      <Badge variant="info">Investment Fraud</Badge>
      <Badge variant="info">Tech Support</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows how badges are used to categorize different types of scams.",
      },
    },
  },
};

/**
 * Status Indicators
 *
 * Real-world ScamAware Jersey use case: content verification status.
 */
export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Badge variant="success" dot>Verified</Badge>
      <Badge variant="warning" dot>Pending Review</Badge>
      <Badge variant="danger" dot>Reported</Badge>
      <Badge variant="neutral" dot>Draft</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows how badges with dots indicate various status states.",
      },
    },
  },
};

/**
 * Inline Usage Example
 *
 * Demonstrates how small badges work inline with text.
 */
export const InlineUsage: Story = {
  render: () => (
    <p style={{ fontFamily: "Arial, sans-serif", fontSize: "1rem", lineHeight: "1.75" }}>
      This scam type is classified as{" "}
      <Badge variant="danger" size="sm">HIGH RISK</Badge>{" "}
      and has been{" "}
      <Badge variant="success" size="sm" dot>Verified</Badge>{" "}
      by our team.
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows how small badges can be used inline within text content.",
      },
    },
  },
};

/**
 * Scam Card Header Example
 *
 * Demonstrates a realistic use case: badge in a scam information card header.
 */
export const ScamCardHeaderExample: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "1.5rem",
        backgroundColor: "#f9fafb",
        borderRadius: "0.5rem",
        maxWidth: "400px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: "600" }}>Phishing Email</h3>
        <Badge variant="danger">HIGH RISK</Badge>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <Badge variant="neutral" size="sm">Email</Badge>
        <Badge variant="neutral" size="sm">Financial</Badge>
        <Badge variant="neutral" size="sm">Identity Theft</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows a realistic card header with danger level and category badges.",
      },
    },
  },
};

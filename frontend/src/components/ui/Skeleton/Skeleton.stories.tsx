/**
 * Skeleton Components Stories
 *
 * Storybook stories for all Skeleton components demonstrating:
 * - Base Skeleton with various dimensions and border radii
 * - SkeletonText with different line counts
 * - SkeletonCard with and without images
 * - SkeletonButton in all sizes
 * - Shimmer animation effects
 *
 * Story organization follows Storybook best practices.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";
import { SkeletonText } from "./SkeletonText";
import { SkeletonCard } from "./SkeletonCard";
import { SkeletonButton } from "./SkeletonButton";

/**
 * Meta configuration for Skeleton component stories
 */
const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Loading skeleton components with shimmer animation for content placeholders. Includes base Skeleton, SkeletonText, SkeletonCard, and SkeletonButton variants.",
      },
    },
  },
  argTypes: {
    width: {
      control: "text",
      description: "Width of the skeleton (number for pixels or string)",
    },
    height: {
      control: "text",
      description: "Height of the skeleton (number for pixels or string)",
    },
    rounded: {
      control: "radio",
      options: ["none", "sm", "md", "lg", "full"],
      description: "Border radius variant",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/**
 * Default Skeleton
 *
 * Basic skeleton with default styling.
 */
export const Default: Story = {
  args: {
    width: 200,
    height: 20,
    rounded: "md",
  },
};

/**
 * Different Shapes
 *
 * Shows skeletons with different border radius options.
 */
export const DifferentShapes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Skeleton width={100} height={40} rounded="none" />
      <Skeleton width={100} height={40} rounded="sm" />
      <Skeleton width={100} height={40} rounded="md" />
      <Skeleton width={100} height={40} rounded="lg" />
      <Skeleton width={40} height={40} rounded="full" />
    </div>
  ),
};

/**
 * Avatar Placeholder
 *
 * Circular skeleton for avatar placeholders.
 */
export const Avatar: Story = {
  args: {
    width: 48,
    height: 48,
    rounded: "full",
  },
};

/**
 * Full Width
 *
 * Skeleton that spans the full container width.
 */
export const FullWidth: Story = {
  args: {
    width: "100%",
    height: 20,
    rounded: "sm",
  },
};

/**
 * Text Placeholder - Single Line
 *
 * SkeletonText with a single line.
 */
export const TextSingleLine: StoryObj<typeof SkeletonText> = {
  render: () => <SkeletonText lines={1} />,
};

/**
 * Text Placeholder - Multiple Lines
 *
 * SkeletonText with multiple lines showing varying widths.
 */
export const TextMultipleLines: StoryObj<typeof SkeletonText> = {
  render: () => <SkeletonText lines={4} />,
};

/**
 * Text Placeholder - Paragraph
 *
 * SkeletonText configured for a typical paragraph.
 */
export const TextParagraph: StoryObj<typeof SkeletonText> = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <SkeletonText lines={5} />
    </div>
  ),
};

/**
 * Card - With Image
 *
 * SkeletonCard with image placeholder and text lines.
 */
export const CardWithImage: StoryObj<typeof SkeletonCard> = {
  render: () => (
    <div style={{ maxWidth: "320px" }}>
      <SkeletonCard hasImage={true} lines={3} />
    </div>
  ),
};

/**
 * Card - Without Image
 *
 * SkeletonCard without image placeholder.
 */
export const CardWithoutImage: StoryObj<typeof SkeletonCard> = {
  render: () => (
    <div style={{ maxWidth: "320px" }}>
      <SkeletonCard hasImage={false} lines={3} />
    </div>
  ),
};

/**
 * Card - Multiple Cards
 *
 * Multiple skeleton cards in a grid layout.
 */
export const CardGrid: StoryObj<typeof SkeletonCard> = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1.5rem",
      }}
    >
      <SkeletonCard hasImage={true} lines={2} />
      <SkeletonCard hasImage={true} lines={2} />
      <SkeletonCard hasImage={true} lines={2} />
    </div>
  ),
};

/**
 * Button - Small
 *
 * SkeletonButton in small size.
 */
export const ButtonSmall: StoryObj<typeof SkeletonButton> = {
  render: () => <SkeletonButton size="sm" />,
};

/**
 * Button - Medium
 *
 * SkeletonButton in medium (default) size.
 */
export const ButtonMedium: StoryObj<typeof SkeletonButton> = {
  render: () => <SkeletonButton size="md" />,
};

/**
 * Button - Large
 *
 * SkeletonButton in large size.
 */
export const ButtonLarge: StoryObj<typeof SkeletonButton> = {
  render: () => <SkeletonButton size="lg" />,
};

/**
 * Button - All Sizes
 *
 * All button skeleton sizes for comparison.
 */
export const ButtonAllSizes: StoryObj<typeof SkeletonButton> = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <SkeletonButton size="sm" />
      <SkeletonButton size="md" />
      <SkeletonButton size="lg" />
    </div>
  ),
};

/**
 * Button - Custom Width
 *
 * SkeletonButton with custom width.
 */
export const ButtonCustomWidth: StoryObj<typeof SkeletonButton> = {
  render: () => <SkeletonButton size="md" width="100%" />,
};

/**
 * Complex Layout Example
 *
 * Demonstrates how skeleton components can be combined
 * to create loading states for complex layouts.
 */
export const ComplexLayout: Story = {
  render: () => (
    <div style={{ maxWidth: "600px", padding: "1rem" }}>
      {/* Header with avatar and text */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <Skeleton width={48} height={48} rounded="full" />
        <div style={{ flex: 1 }}>
          <Skeleton width="40%" height={20} rounded="sm" />
          <div style={{ marginTop: "0.5rem" }}>
            <Skeleton width="60%" height={14} rounded="sm" />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div style={{ marginBottom: "1.5rem" }}>
        <SkeletonText lines={4} />
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <SkeletonButton size="md" width={100} />
        <SkeletonButton size="md" width={100} />
      </div>
    </div>
  ),
};

/**
 * Article Layout Example
 *
 * Skeleton layout for a typical article page.
 */
export const ArticleLayout: Story = {
  render: () => (
    <article style={{ maxWidth: "700px", padding: "1rem" }}>
      {/* Article title */}
      <Skeleton
        width="85%"
        height={36}
        rounded="sm"
        className="mb-4"
      />

      {/* Meta info */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1.5rem",
          alignItems: "center",
        }}
      >
        <Skeleton width={80} height={14} rounded="sm" />
        <Skeleton width={100} height={14} rounded="sm" />
      </div>

      {/* Featured image */}
      <Skeleton
        width="100%"
        height={0}
        rounded="lg"
        className="pb-[50%] mb-6"
      />

      {/* Article content */}
      <div style={{ marginBottom: "1rem" }}>
        <SkeletonText lines={6} />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <SkeletonText lines={5} />
      </div>

      <div>
        <SkeletonText lines={4} />
      </div>
    </article>
  ),
};

/**
 * Table Row Example
 *
 * Skeleton layout for table rows.
 */
export const TableRows: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: "1rem",
            padding: "0.75rem 0",
            borderBottom: "1px solid var(--color-gray-200)",
            alignItems: "center",
          }}
        >
          <Skeleton width={40} height={40} rounded="md" />
          <Skeleton width="25%" height={16} rounded="sm" />
          <Skeleton width="35%" height={16} rounded="sm" />
          <Skeleton width="15%" height={16} rounded="sm" />
          <Skeleton width={80} height={32} rounded="md" />
        </div>
      ))}
    </div>
  ),
};

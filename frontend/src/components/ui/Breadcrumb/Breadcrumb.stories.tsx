/**
 * Breadcrumb Component Stories
 *
 * Storybook stories for the Breadcrumb component demonstrating:
 * - Basic breadcrumb navigation
 * - Various path depths (2, 3, 4+ levels)
 * - Custom separators
 * - ScamAware Jersey specific use cases
 *
 * Story organization follows Storybook best practices:
 * - Default story shows the primary use case
 * - Variant stories demonstrate different configurations
 * - Use case stories show real-world applications
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

/**
 * Meta configuration for the Breadcrumb component stories
 */
const meta: Meta<typeof Breadcrumb> = {
  title: "UI/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A navigation component that displays the user's current location within a page hierarchy. Uses semantic HTML and follows accessibility best practices.",
      },
    },
  },
  argTypes: {
    items: {
      description: "Array of breadcrumb items to display",
      control: "object",
    },
    separator: {
      description: "Custom separator element between items",
      control: false,
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/**
 * Default Story
 *
 * Shows a typical three-level breadcrumb navigation.
 */
export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Scam Types", href: "/scams" },
      { label: "Phishing" },
    ],
  },
};

/**
 * Two Levels
 *
 * Simple breadcrumb with only home and current page.
 */
export const TwoLevels: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "About Us" },
    ],
  },
};

/**
 * Four Levels
 *
 * Deeper navigation hierarchy with multiple intermediate levels.
 */
export const FourLevels: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Resources", href: "/resources" },
      { label: "Guides", href: "/resources/guides" },
      { label: "How to Report a Scam" },
    ],
  },
};

/**
 * Five Levels
 *
 * Deep navigation hierarchy showing how the component handles long paths.
 */
export const FiveLevels: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Scam Types", href: "/scams" },
      { label: "Financial", href: "/scams/financial" },
      { label: "Investment", href: "/scams/financial/investment" },
      { label: "Crypto Scams" },
    ],
  },
};

/**
 * Single Item
 *
 * Edge case: Only the current page is shown.
 */
export const SingleItem: Story = {
  args: {
    items: [{ label: "Home" }],
  },
};

/**
 * Custom Separator - Slash
 *
 * Uses a forward slash as the separator instead of the default chevron.
 */
export const CustomSeparatorSlash: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Scam Types", href: "/scams" },
      { label: "Phishing" },
    ],
    separator: <span className="mx-2 text-gray-400">/</span>,
  },
};

/**
 * Custom Separator - Arrow
 *
 * Uses an arrow character as the separator.
 */
export const CustomSeparatorArrow: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Scam Types", href: "/scams" },
      { label: "Phishing" },
    ],
    separator: <span className="mx-2 text-gray-400">&rarr;</span>,
  },
};

/**
 * Custom Separator - Dot
 *
 * Uses a dot as the separator.
 */
export const CustomSeparatorDot: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact" },
      { label: "Emergency Services" },
    ],
    separator: <span className="mx-2 text-gray-400">&bull;</span>,
  },
};

/**
 * Long Labels
 *
 * Tests how the component handles longer text labels.
 */
export const LongLabels: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Scam Prevention Resources", href: "/resources" },
      { label: "Understanding Investment Fraud Warning Signs" },
    ],
  },
};

/**
 * Scam Type Page
 *
 * Real-world ScamAware Jersey use case: navigating to a specific scam type page.
 */
export const ScamTypePage: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Scam Types", href: "/scams" },
      { label: "Phishing" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows the breadcrumb trail when viewing a specific scam type information page.",
      },
    },
  },
};

/**
 * Resource Guide Page
 *
 * Real-world ScamAware Jersey use case: navigating to a resource guide.
 */
export const ResourceGuidePage: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Resources", href: "/resources" },
      { label: "How to Report a Scam" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows the breadcrumb trail when viewing a resource guide page.",
      },
    },
  },
};

/**
 * Emergency Contact Page
 *
 * Real-world ScamAware Jersey use case: navigating to emergency contacts.
 */
export const EmergencyContactPage: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Help", href: "/help" },
      { label: "Emergency Contacts" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows the breadcrumb trail when viewing the emergency contacts page.",
      },
    },
  },
};

/**
 * Chatbot Help Page
 *
 * Real-world ScamAware Jersey use case: navigating within chatbot help section.
 */
export const ChatbotHelpPage: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Scam Checker", href: "/chatbot" },
      { label: "How It Works" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows the breadcrumb trail when viewing chatbot help documentation.",
      },
    },
  },
};

/**
 * All Items Linked
 *
 * Edge case: All items have href (unusual but valid).
 * The last item should still display as current page.
 */
export const AllItemsLinked: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Scam Types", href: "/scams" },
      { label: "Phishing", href: "/scams/phishing" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Even when the last item has an href, it renders as current page (non-link) since it represents where the user currently is.",
      },
    },
  },
};

/**
 * With Custom Class
 *
 * Demonstrates adding custom styling via className prop.
 */
export const WithCustomClass: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "About" },
    ],
    className: "bg-gray-50 p-3 rounded-lg",
  },
  parameters: {
    docs: {
      description: {
        story: "Shows how custom CSS classes can be applied to the breadcrumb container.",
      },
    },
  },
};

/**
 * In Page Context
 *
 * Shows how the breadcrumb looks in a realistic page header context.
 */
export const InPageContext: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
      }}
    >
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Scam Types", href: "/scams" },
          { label: "Phishing" },
        ]}
      />
      <h1
        style={{
          marginTop: "1rem",
          fontSize: "2rem",
          fontWeight: "700",
          color: "#1a1f3d",
        }}
      >
        Phishing Scams
      </h1>
      <p
        style={{
          marginTop: "0.5rem",
          color: "#6b7280",
          lineHeight: "1.6",
        }}
      >
        Learn how to identify and protect yourself from phishing attempts.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows the breadcrumb component in a realistic page header context with title and description.",
      },
    },
  },
};

/**
 * ExpandableCard Component Stories
 *
 * Storybook stories for the ExpandableCard component demonstrating:
 * - Basic expand/collapse functionality
 * - With and without description
 * - Default expanded state
 * - Callback on state change
 * - Keyboard accessibility
 * - ScamAware Jersey use cases (FAQ, scam details)
 */

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ExpandableCard } from "./ExpandableCard";
import { Text } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/Badge";

/**
 * Meta configuration for the ExpandableCard component stories
 */
const meta: Meta<typeof ExpandableCard> = {
  title: "UI/ExpandableCard",
  component: ExpandableCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An expandable card component that extends the base Card with expand/collapse behavior. Perfect for FAQs, collapsible information panels, and detailed content that can be revealed on demand.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "The title displayed in the card header",
    },
    description: {
      control: "text",
      description: "Optional description displayed below the title",
    },
    defaultExpanded: {
      control: "boolean",
      description: "Whether the card starts expanded",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExpandableCard>;

/**
 * Default Story
 *
 * Shows the expandable card with default props - collapsed state.
 */
export const Default: Story = {
  render: () => (
    <ExpandableCard title="Click to expand">
      <Text>
        This content is revealed when you expand the card. Click the header area
        or use keyboard navigation (Tab to focus, Enter/Space to toggle) to
        expand and collapse.
      </Text>
    </ExpandableCard>
  ),
};

/**
 * With Description
 *
 * Shows the expandable card with both title and description.
 */
export const WithDescription: Story = {
  render: () => (
    <ExpandableCard
      title="What is phishing?"
      description="Learn about this common type of scam"
    >
      <Text>
        Phishing is a type of social engineering attack where scammers attempt
        to trick you into revealing sensitive information such as passwords,
        credit card numbers, or personal data. They often do this by
        impersonating trusted organizations through fake emails, text messages,
        or websites.
      </Text>
    </ExpandableCard>
  ),
};

/**
 * Default Expanded
 *
 * Card that starts in the expanded state.
 */
export const DefaultExpanded: Story = {
  render: () => (
    <ExpandableCard
      title="Already expanded"
      description="This card starts in the expanded state"
      defaultExpanded={true}
    >
      <Text>
        This content is visible by default because the defaultExpanded prop is
        set to true. Click the header to collapse it.
      </Text>
    </ExpandableCard>
  ),
};

/**
 * With Callback
 *
 * Demonstrates the onExpandChange callback.
 */
export const WithCallback: Story = {
  render: function Render() {
    const [expandState, setExpandState] = useState("collapsed");

    return (
      <div className="space-y-4">
        <Text variant="small" color="muted">
          Current state: <strong>{expandState}</strong>
        </Text>
        <ExpandableCard
          title="Track state changes"
          description="Watch the state indicator above"
          onExpandChange={(expanded) =>
            setExpandState(expanded ? "expanded" : "collapsed")
          }
        >
          <Text>
            The onExpandChange callback fires whenever the expanded state
            changes. This is useful for analytics tracking or coordinating with
            other UI elements.
          </Text>
        </ExpandableCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "The onExpandChange callback fires with the new expanded state whenever the card is toggled.",
      },
    },
  },
};

/**
 * Keyboard Navigation
 *
 * Demonstrates keyboard accessibility.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="small" color="muted">
        Use Tab to focus on each card, then Enter or Space to toggle:
      </Text>
      <ExpandableCard title="First card (Tab here first)">
        <Text>Press Tab to move to the next card.</Text>
      </ExpandableCard>
      <ExpandableCard title="Second card (Tab here second)">
        <Text>Press Tab to move to the next card.</Text>
      </ExpandableCard>
      <ExpandableCard title="Third card (Tab here third)">
        <Text>Full keyboard navigation support for accessibility.</Text>
      </ExpandableCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ExpandableCard is fully keyboard accessible. Use Tab to navigate between cards and Enter or Space to toggle the expanded state.",
      },
    },
  },
};

/**
 * FAQ Section
 *
 * Real-world ScamAware Jersey use case: FAQ accordion.
 */
export const FAQSection: Story = {
  render: () => (
    <div className="space-y-4">
      <ExpandableCard
        title="How do I report a scam?"
        description="Steps to report suspicious activity"
      >
        <div className="space-y-3">
          <Text>To report a scam in Jersey, you can:</Text>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <Text as="span">
                Contact JFSC at +44 (0)1534 822000
              </Text>
            </li>
            <li>
              <Text as="span">
                Call the Police fraud line at 01534 612612
              </Text>
            </li>
            <li>
              <Text as="span">
                In emergencies, call 999
              </Text>
            </li>
          </ul>
        </div>
      </ExpandableCard>

      <ExpandableCard
        title="What information should I provide when reporting?"
        description="Details that help with investigations"
      >
        <div className="space-y-3">
          <Text>When reporting a scam, try to provide:</Text>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <Text as="span">
                Date and time of the contact
              </Text>
            </li>
            <li>
              <Text as="span">
                How you were contacted (phone, email, text, etc.)
              </Text>
            </li>
            <li>
              <Text as="span">
                Any phone numbers, email addresses, or names used
              </Text>
            </li>
            <li>
              <Text as="span">
                Screenshots or copies of messages if available
              </Text>
            </li>
            <li>
              <Text as="span">
                Any financial losses incurred
              </Text>
            </li>
          </ul>
        </div>
      </ExpandableCard>

      <ExpandableCard
        title="Can I get my money back if I have been scammed?"
        description="Recovery options for scam victims"
      >
        <Text>
          If you have lost money to a scam, contact your bank immediately as
          they may be able to stop or reverse the transaction. The sooner you
          act, the better your chances of recovery. Also report the scam to the
          authorities, as this helps prevent others from falling victim.
        </Text>
      </ExpandableCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple ExpandableCards work together as an FAQ accordion. Each card operates independently.",
      },
    },
  },
};

/**
 * Scam Details Card
 *
 * Real-world ScamAware Jersey use case: detailed scam information.
 */
export const ScamDetailsCard: Story = {
  render: () => (
    <ExpandableCard
      title="Bank Impersonation Scam"
      description="Fraudsters posing as bank officials"
      defaultExpanded={true}
    >
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Badge variant="danger">HIGH RISK</Badge>
          <Badge variant="info" size="sm">Phone Call</Badge>
          <Badge variant="info" size="sm">Financial</Badge>
        </div>

        <div>
          <Text weight="semibold" className="mb-2">
            How it works:
          </Text>
          <Text>
            Scammers call pretending to be from your bank, often claiming there
            is suspicious activity on your account. They create urgency to
            pressure you into revealing personal information or transferring
            money to a &quot;safe account&quot;.
          </Text>
        </div>

        <div>
          <Text weight="semibold" className="mb-2">
            Warning signs:
          </Text>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <Text as="span">Unexpected call about account problems</Text>
            </li>
            <li>
              <Text as="span">Pressure to act immediately</Text>
            </li>
            <li>
              <Text as="span">Requests for PIN, passwords, or full card numbers</Text>
            </li>
            <li>
              <Text as="span">Asking you to transfer money for &quot;safety&quot;</Text>
            </li>
          </ul>
        </div>

        <div>
          <Text weight="semibold" className="mb-2">
            How to protect yourself:
          </Text>
          <Text>
            Your bank will never ask for your full PIN or password. If in doubt,
            hang up and call your bank directly using the number on your card or
            statement.
          </Text>
        </div>
      </div>
    </ExpandableCard>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ExpandableCard can contain rich content including badges, lists, and multiple text sections for detailed scam information.",
      },
    },
  },
};

/**
 * Animation Demo
 *
 * Shows the smooth animation of expand/collapse.
 */
export const AnimationDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="small" color="muted">
        Click each card to see the smooth expand/collapse animation:
      </Text>
      <ExpandableCard title="Short content">
        <Text>Just a single line of content.</Text>
      </ExpandableCard>
      <ExpandableCard title="Medium content">
        <Text>
          This card has a moderate amount of content that demonstrates the
          height animation working with different content sizes. The animation
          uses CSS grid for a smooth transition from 0 to auto height.
        </Text>
      </ExpandableCard>
      <ExpandableCard title="Long content">
        <div className="space-y-3">
          <Text>
            This card has significantly more content to show how the animation
            handles larger content blocks smoothly.
          </Text>
          <Text>
            The CSS grid technique used here (transitioning grid-rows from 0fr
            to 1fr) creates a smooth animation regardless of the content height,
            without needing to measure the content or use JavaScript animations.
          </Text>
          <Text>
            Users who have enabled the &quot;reduce motion&quot; accessibility setting
            will see the content appear/disappear without animation, respecting
            their preferences.
          </Text>
        </div>
      </ExpandableCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The expand/collapse animation uses CSS grid transitions for smooth height changes. The animation respects the prefers-reduced-motion setting.",
      },
    },
  },
};

/**
 * Custom Styling
 *
 * Shows how to apply custom styles via className.
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <ExpandableCard
        title="Default styling"
        description="Standard card appearance"
      >
        <Text>Default card with no custom styling.</Text>
      </ExpandableCard>

      <ExpandableCard
        title="Custom width"
        description="Using max-w-md class"
        className="max-w-md"
      >
        <Text>This card has a maximum width constraint applied.</Text>
      </ExpandableCard>

      <ExpandableCard
        title="Custom shadow"
        description="Using shadow-lg class"
        className="shadow-lg"
      >
        <Text>This card has a larger shadow for more visual prominence.</Text>
      </ExpandableCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use the className prop to apply custom styling such as width constraints, shadows, or other Tailwind utilities.",
      },
    },
  },
};

/**
 * Multiple Independent Cards
 *
 * Shows that each card maintains its own state.
 */
export const MultipleIndependent: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="small" color="muted">
        Each card operates independently - expanding one does not collapse others:
      </Text>
      <ExpandableCard title="Card A" defaultExpanded={true}>
        <Text>Card A is expanded by default.</Text>
      </ExpandableCard>
      <ExpandableCard title="Card B" defaultExpanded={true}>
        <Text>Card B is also expanded by default.</Text>
      </ExpandableCard>
      <ExpandableCard title="Card C">
        <Text>Card C starts collapsed.</Text>
      </ExpandableCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Each ExpandableCard maintains its own expanded state independently. For accordion behavior (only one open at a time), you would need to manage state externally.",
      },
    },
  },
};

/**
 * Card Component Stories
 *
 * Storybook stories for the Card component demonstrating:
 * - All visual variants (default, elevated, outlined, interactive)
 * - Compound component pattern usage
 * - Interactive cards with onClick and href
 * - ScamAware Jersey use cases (scam alerts, information cards)
 *
 * Story organization follows Storybook best practices:
 * - Default story shows the primary use case
 * - Variant stories demonstrate visual options
 * - Use case stories show real-world applications
 */

import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";
import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Typography";

/**
 * Meta configuration for the Card component stories
 */
const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A versatile content container component for displaying scam information, alerts, and other content sections throughout the ScamAware Jersey application.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "elevated", "outlined", "interactive"],
      description: "Visual variant determining the card's appearance",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    href: {
      control: "text",
      description: "Makes the entire card a link when provided",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * Default Story
 *
 * Shows the card with default props - white background, subtle border, small shadow.
 */
export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a card description.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This is the main content of the card. It can contain any content you need.</Text>
      </CardContent>
      <CardFooter>
        <Text variant="small" color="muted">Footer content</Text>
      </CardFooter>
    </Card>
  ),
};

/**
 * Default Variant
 *
 * White background, subtle border, small shadow.
 * Best for standard content containers.
 */
export const DefaultVariant: Story = {
  render: () => (
    <Card variant="default" className="max-w-md">
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
        <CardDescription>Subtle border and small shadow</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This variant works well for most general content containers where you want a clean, professional look.</Text>
      </CardContent>
    </Card>
  ),
};

/**
 * Elevated Variant
 *
 * White background, no border, larger shadow.
 * Best for cards that need to stand out from the background.
 */
export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="max-w-md">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>No border, larger shadow</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This variant creates a floating effect, perfect for important content that needs visual prominence.</Text>
      </CardContent>
    </Card>
  ),
};

/**
 * Outlined Variant
 *
 * White background, prominent border, no shadow.
 * Best for cards in interfaces with lots of depth variations.
 */
export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" className="max-w-md">
      <CardHeader>
        <CardTitle>Outlined Card</CardTitle>
        <CardDescription>Prominent border, no shadow</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This variant provides clear boundaries without shadows, ideal for flat design aesthetics.</Text>
      </CardContent>
    </Card>
  ),
};

/**
 * Interactive Variant
 *
 * Hover state with lift effect, cursor pointer.
 * Best for clickable cards that navigate somewhere.
 */
export const Interactive: Story = {
  render: () => (
    <Card variant="interactive" className="max-w-md" onClick={() => alert("Card clicked!")}>
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Click me to see the interaction</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This variant includes hover effects with a subtle lift animation. Try hovering and clicking!</Text>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive cards have hover effects and respond to clicks. They lift slightly on hover to indicate interactivity.",
      },
    },
  },
};

/**
 * All Variants
 *
 * Shows all four variants side by side for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
        <CardContent>
          <Text variant="small">Subtle border, small shadow</Text>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
        </CardHeader>
        <CardContent>
          <Text variant="small">No border, larger shadow</Text>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Outlined</CardTitle>
        </CardHeader>
        <CardContent>
          <Text variant="small">Prominent border, no shadow</Text>
        </CardContent>
      </Card>

      <Card variant="interactive" onClick={() => {}}>
        <CardHeader>
          <CardTitle>Interactive</CardTitle>
        </CardHeader>
        <CardContent>
          <Text variant="small">Hover for lift effect</Text>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * With onClick Handler
 *
 * Card that handles click events.
 */
export const WithOnClick: Story = {
  render: () => (
    <Card className="max-w-md" onClick={() => alert("Card clicked!")}>
      <CardHeader>
        <CardTitle>Clickable Card</CardTitle>
        <CardDescription>This card has an onClick handler</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>Click anywhere on this card to trigger the onClick handler. The card automatically gets interactive styles when onClick is provided.</Text>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Cards with onClick automatically receive interactive styling including hover effects and keyboard accessibility.",
      },
    },
  },
};

/**
 * With href (Link Card)
 *
 * Card that works as a Next.js Link.
 */
export const WithHref: Story = {
  render: () => (
    <Card className="max-w-md" href="/scams/phishing">
      <CardHeader>
        <CardTitle>Link Card</CardTitle>
        <CardDescription>This card links to another page</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This entire card is a link. Click anywhere to navigate to the destination (in Storybook, this may not work as expected).</Text>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Cards with href render as Next.js Links, making the entire card clickable for navigation.",
      },
    },
  },
};

/**
 * Keyboard Accessible
 *
 * Demonstrates keyboard navigation for interactive cards.
 */
export const KeyboardAccessible: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Text variant="small" color="muted">Use Tab to focus and Enter/Space to activate:</Text>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Card variant="interactive" onClick={() => alert("First card activated!")} className="flex-1">
          <CardContent>
            <CardTitle>First Card</CardTitle>
            <Text variant="small">Tab here first</Text>
          </CardContent>
        </Card>

        <Card variant="interactive" onClick={() => alert("Second card activated!")} className="flex-1">
          <CardContent>
            <CardTitle>Second Card</CardTitle>
            <Text variant="small">Then tab here</Text>
          </CardContent>
        </Card>

        <Card variant="interactive" onClick={() => alert("Third card activated!")} className="flex-1">
          <CardContent>
            <CardTitle>Third Card</CardTitle>
            <Text variant="small">And here</Text>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive cards are fully keyboard accessible. Use Tab to navigate between cards and Enter or Space to activate them.",
      },
    },
  },
};

/**
 * Scam Alert Card
 *
 * Real-world ScamAware Jersey use case: displaying a scam alert.
 */
export const ScamAlertCard: Story = {
  render: () => (
    <Card variant="elevated" className="max-w-lg">
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <CardTitle>Bank Impersonation Scam</CardTitle>
          <Badge variant="danger">HIGH RISK</Badge>
        </div>
        <CardDescription>Fraudsters posing as bank officials requesting account details</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>
          Scammers are contacting Jersey residents claiming to be from their bank. They create urgency by saying your account has been compromised and ask for verification details.
        </Text>
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Badge variant="info" size="sm">Phone Call</Badge>
          <Badge variant="info" size="sm">Financial</Badge>
          <Badge variant="info" size="sm">Identity Theft</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Text variant="caption" color="muted">Last updated: January 2024</Text>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows how the Card component is used to display scam alerts with danger level badges and category tags.",
      },
    },
  },
};

/**
 * Scam Type Information Card
 *
 * Real-world ScamAware Jersey use case: scam type overview card.
 */
export const ScamTypeCard: Story = {
  render: () => (
    <Card variant="interactive" href="/scams/phishing" className="max-w-sm">
      <CardHeader>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <CardTitle>Phishing Scams</CardTitle>
          <Badge variant="danger">HIGH RISK</Badge>
        </div>
        <CardDescription>Fake emails and messages designed to steal your information</CardDescription>
      </CardHeader>
      <CardContent>
        <Text variant="small">
          Learn how to identify phishing attempts and protect yourself from fraudulent emails, texts, and websites.
        </Text>
      </CardContent>
      <CardFooter>
        <Text variant="caption" color="muted">12 reported cases this month</Text>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive card used for navigating to detailed scam type information pages.",
      },
    },
  },
};

/**
 * Resource Card
 *
 * Card for displaying helpful resources and links.
 */
export const ResourceCard: Story = {
  render: () => (
    <Card variant="outlined" className="max-w-md">
      <CardHeader>
        <CardTitle>Report a Scam</CardTitle>
        <CardDescription>Know how to report suspicious activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div>
            <Text weight="semibold" as="span">JFSC Fraud Line:</Text>
            <Text as="span"> +44 (0)1534 822000</Text>
          </div>
          <div>
            <Text weight="semibold" as="span">Police Fraud Line:</Text>
            <Text as="span"> 01534 612612</Text>
          </div>
          <div>
            <Text weight="semibold" as="span">Emergency:</Text>
            <Text as="span"> 999</Text>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Outlined card variant used for displaying important contact information and resources.",
      },
    },
  },
};

/**
 * Card Grid Layout
 *
 * Shows how cards work in a responsive grid layout.
 */
export const CardGrid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
      <Card variant="interactive" onClick={() => {}}>
        <CardHeader>
          <CardTitle>Phone Scams</CardTitle>
          <Badge variant="danger">HIGH RISK</Badge>
        </CardHeader>
        <CardContent>
          <Text variant="small">Calls from fake officials demanding immediate payment.</Text>
        </CardContent>
      </Card>

      <Card variant="interactive" onClick={() => {}}>
        <CardHeader>
          <CardTitle>Email Phishing</CardTitle>
          <Badge variant="danger">HIGH RISK</Badge>
        </CardHeader>
        <CardContent>
          <Text variant="small">Fraudulent emails impersonating trusted organizations.</Text>
        </CardContent>
      </Card>

      <Card variant="interactive" onClick={() => {}}>
        <CardHeader>
          <CardTitle>Romance Scams</CardTitle>
          <Badge variant="warning">MODERATE</Badge>
        </CardHeader>
        <CardContent>
          <Text variant="small">Fake online relationships designed to extract money.</Text>
        </CardContent>
      </Card>

      <Card variant="interactive" onClick={() => {}}>
        <CardHeader>
          <CardTitle>Investment Fraud</CardTitle>
          <Badge variant="danger">HIGH RISK</Badge>
        </CardHeader>
        <CardContent>
          <Text variant="small">Too-good-to-be-true investment opportunities.</Text>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates how Card components work together in a responsive grid layout, typical of the scam types overview page.",
      },
    },
  },
};

/**
 * Card with Custom Content
 *
 * Shows flexibility of card content area.
 */
export const CustomContent: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Warning Signs</CardTitle>
        <CardDescription>How to identify potential scams</CardDescription>
      </CardHeader>
      <CardContent>
        <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <li><Text as="span">Urgent requests for money or personal information</Text></li>
          <li><Text as="span">Unsolicited contact from unknown sources</Text></li>
          <li><Text as="span">Pressure to act immediately</Text></li>
          <li><Text as="span">Requests to keep the matter secret</Text></li>
          <li><Text as="span">Payment via unusual methods (gift cards, crypto)</Text></li>
        </ul>
      </CardContent>
      <CardFooter>
        <Badge variant="warning" dot>Stay Alert</Badge>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "The CardContent component accepts any React children, allowing for flexible content layouts.",
      },
    },
  },
};

/**
 * Minimal Card
 *
 * Card with just content, no header or footer.
 */
export const MinimalCard: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardContent>
        <Text>
          This is a minimal card with only CardContent. Perfect for simple content blocks that do not need a header or footer structure.
        </Text>
      </CardContent>
    </Card>
  ),
};

/**
 * Header Only Card
 *
 * Card with just a header section.
 */
export const HeaderOnlyCard: Story = {
  render: () => (
    <Card variant="elevated" className="max-w-sm">
      <CardHeader>
        <CardTitle>Quick Stat</CardTitle>
        <CardDescription>Scams reported this month</CardDescription>
      </CardHeader>
      <CardContent>
        <Heading level={1} className="text-trust-blue">247</Heading>
      </CardContent>
    </Card>
  ),
};

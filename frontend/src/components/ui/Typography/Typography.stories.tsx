import type { Meta, StoryObj } from '@storybook/react';
import { Heading, Text, Label } from './index';

/**
 * Typography components provide consistent text styling throughout the
 * ScamAware Jersey application. These components ensure semantic HTML
 * structure, accessibility compliance, and visual consistency with the
 * JFSC design system.
 *
 * ## Design Tokens
 * - **Font Family:** Arial, Helvetica, sans-serif
 * - **Primary Text:** Navy (#1a1f3d)
 * - **Muted Text:** Gray-500 (#6b7280)
 * - **Error Text:** Alert Red (#c8102e)
 * - **Success Text:** Success Green (#28a745)
 *
 * ## Accessibility
 * - All text meets WCAG 2.1 AA contrast requirements
 * - Headings should be used sequentially (h1 > h2 > h3)
 * - Only one h1 per page
 * - Labels must be associated with form inputs via htmlFor
 */
const meta: Meta = {
  title: 'UI/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Semantic typography components for headings, body text, and form labels. Built with JFSC brand guidelines and accessibility in mind.',
      },
    },
  },
};

export default meta;

// ============================================================================
// HEADING STORIES
// ============================================================================

type HeadingStory = StoryObj<typeof Heading>;

/**
 * All heading levels displayed together to show the visual hierarchy.
 * Use headings to structure content and improve navigation for screen readers.
 */
export const HeadingLevels: HeadingStory = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Heading level={1}>Heading Level 1</Heading>
        <Text variant="small" color="muted" className="mt-1">
          text-3xl/4xl, font-bold - Use for page titles
        </Text>
      </div>
      <div>
        <Heading level={2}>Heading Level 2</Heading>
        <Text variant="small" color="muted" className="mt-1">
          text-2xl/3xl, font-bold - Use for major sections
        </Text>
      </div>
      <div>
        <Heading level={3}>Heading Level 3</Heading>
        <Text variant="small" color="muted" className="mt-1">
          text-xl/2xl, font-semibold - Use for subsections
        </Text>
      </div>
      <div>
        <Heading level={4}>Heading Level 4</Heading>
        <Text variant="small" color="muted" className="mt-1">
          text-lg/xl, font-semibold - Use for minor sections
        </Text>
      </div>
    </div>
  ),
};

/**
 * Demonstrates using the `as` prop to override the semantic HTML tag.
 * Useful when visual hierarchy differs from document structure.
 */
export const HeadingWithAsOverride: HeadingStory = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Heading level={2} as="h1">
          Visually h2, Semantically h1
        </Heading>
        <Text variant="small" color="muted">
          Use when SEO requires h1 but design calls for smaller text
        </Text>
      </div>
      <div>
        <Heading level={1} as="span">
          Visually h1, Rendered as span
        </Heading>
        <Text variant="small" color="muted">
          Use for decorative headlines that shouldn&apos;t affect document structure
        </Text>
      </div>
    </div>
  ),
};

// ============================================================================
// TEXT STORIES
// ============================================================================

type TextStory = StoryObj<typeof Text>;

/**
 * All text variants displayed together to show size differences.
 */
export const TextVariants: TextStory = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Text variant="lead">
          This is lead text, used for introductory paragraphs that need extra emphasis.
          It&apos;s larger than body text and works well for hero sections.
        </Text>
        <Text variant="caption" color="muted" className="mt-1">
          variant=&quot;lead&quot; - text-lg/xl
        </Text>
      </div>
      <div>
        <Text variant="body">
          This is body text, the default variant for standard paragraphs and content.
          It provides comfortable reading at a moderate size with relaxed line height.
        </Text>
        <Text variant="caption" color="muted" className="mt-1">
          variant=&quot;body&quot; (default) - text-base
        </Text>
      </div>
      <div>
        <Text variant="small">
          This is small text, used for secondary information, footnotes, or
          supplementary content that doesn&apos;t need primary visual weight.
        </Text>
        <Text variant="caption" color="muted" className="mt-1">
          variant=&quot;small&quot; - text-sm
        </Text>
      </div>
      <div>
        <Text variant="caption">
          This is caption text, the smallest variant for captions, timestamps, or legal disclaimers.
        </Text>
        <Text variant="caption" color="muted" className="mt-1">
          variant=&quot;caption&quot; - text-xs
        </Text>
      </div>
    </div>
  ),
};

/**
 * Text color variants for different semantic purposes.
 */
export const TextColors: TextStory = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Text color="default">
          Default color - Navy text for primary content
        </Text>
      </div>
      <div>
        <Text color="muted">
          Muted color - Gray text for secondary content
        </Text>
      </div>
      <div>
        <Text color="error">
          Error color - Red text for error messages and warnings
        </Text>
      </div>
      <div>
        <Text color="success">
          Success color - Green text for success messages
        </Text>
      </div>
    </div>
  ),
};

/**
 * Text weight variants for emphasis.
 */
export const TextWeights: TextStory = {
  render: () => (
    <div className="space-y-4">
      <Text weight="normal">Normal weight - Standard text</Text>
      <Text weight="medium">Medium weight - Slightly emphasized</Text>
      <Text weight="semibold">Semibold weight - Moderately emphasized</Text>
      <Text weight="bold">Bold weight - Strongly emphasized</Text>
    </div>
  ),
};

/**
 * Demonstrates using different HTML elements with the `as` prop.
 */
export const TextAsElements: TextStory = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Text as="p">Paragraph element (default) - Block level</Text>
      </div>
      <div>
        <Text as="div">Div element - Block level container</Text>
      </div>
      <div>
        <p>
          Inline text example:{' '}
          <Text as="span" weight="bold" color="error">
            span element
          </Text>{' '}
          within a paragraph.
        </p>
      </div>
    </div>
  ),
};

// ============================================================================
// LABEL STORIES
// ============================================================================

type LabelStory = StoryObj<typeof Label>;

/**
 * Basic label usage with form inputs.
 */
export const LabelBasic: LabelStory = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="demo-email">Email Address</Label>
        <input
          id="demo-email"
          type="email"
          placeholder="you@example.com"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-trust-blue focus:border-trust-blue"
        />
      </div>
    </div>
  ),
};

/**
 * Required field label with asterisk indicator.
 */
export const LabelRequired: LabelStory = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="demo-name" required>
          Full Name
        </Label>
        <input
          id="demo-name"
          type="text"
          placeholder="John Doe"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-trust-blue focus:border-trust-blue"
        />
      </div>
      <div>
        <Label htmlFor="demo-phone">
          Phone Number (Optional)
        </Label>
        <input
          id="demo-phone"
          type="tel"
          placeholder="+44 1234 567890"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-trust-blue focus:border-trust-blue"
        />
      </div>
    </div>
  ),
};

// ============================================================================
// COMBINED EXAMPLES
// ============================================================================

/**
 * Real-world example of typography components used together in a page layout.
 */
export const PageLayoutExample: StoryObj = {
  render: () => (
    <article className="max-w-2xl">
      <Heading level={1}>Protect Yourself from Phone Scams</Heading>
      <Text variant="lead" className="mt-4">
        Phone scams cost Jersey residents millions each year. Learn the warning
        signs and how to protect yourself and your loved ones.
      </Text>

      <Heading level={2} className="mt-8">
        Common Warning Signs
      </Heading>
      <Text className="mt-4">
        Scammers often create a sense of urgency to pressure you into making
        quick decisions. They may claim to be from your bank, HMRC, or a
        government agency. Remember: legitimate organizations will never ask
        for your PIN or password over the phone.
      </Text>

      <Heading level={3} className="mt-6">
        Caller Claims to Be From Your Bank
      </Heading>
      <Text className="mt-2">
        If someone calls claiming to be from your bank and asks for sensitive
        information, hang up and call your bank directly using the number on
        your card or statement.
      </Text>

      <Heading level={3} className="mt-6">
        Pressure to Act Immediately
      </Heading>
      <Text className="mt-2">
        Legitimate organizations give you time to think. If someone is
        pressuring you to make an immediate decision or payment, it&apos;s likely
        a scam.
      </Text>

      <Heading level={2} className="mt-8">
        Report a Suspected Scam
      </Heading>
      <Text className="mt-4">
        If you believe you&apos;ve been contacted by a scammer, report it to Jersey
        Police on 01onal 612612 or contact Action Fraud.
      </Text>

      <Text variant="small" color="muted" className="mt-8">
        Last updated: January 2024 | JFSC Consumer Awareness
      </Text>
    </article>
  ),
};

/**
 * Form example showing labels and text used together.
 */
export const FormExample: StoryObj = {
  render: () => (
    <form className="max-w-md space-y-6">
      <Heading level={2}>Report a Scam</Heading>
      <Text color="muted" className="mt-1">
        Help us protect Jersey residents by reporting suspicious activity.
      </Text>

      <div className="mt-6">
        <Label htmlFor="form-name" required>
          Your Name
        </Label>
        <input
          id="form-name"
          type="text"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-trust-blue focus:border-trust-blue"
        />
      </div>

      <div>
        <Label htmlFor="form-email" required>
          Email Address
        </Label>
        <input
          id="form-email"
          type="email"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-trust-blue focus:border-trust-blue"
        />
        <Text variant="caption" color="muted" className="mt-1">
          We&apos;ll only use this to follow up on your report.
        </Text>
      </div>

      <div>
        <Label htmlFor="form-description" required>
          Describe the Scam
        </Label>
        <textarea
          id="form-description"
          rows={4}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-trust-blue focus:border-trust-blue"
        />
      </div>

      <div>
        <Text variant="small" color="error">
          * Required fields
        </Text>
      </div>

      <button
        type="submit"
        className="w-full bg-trust-blue text-white py-2 px-4 rounded-md hover:bg-trust-blue-600 transition-colors"
      >
        Submit Report
      </button>
    </form>
  ),
};

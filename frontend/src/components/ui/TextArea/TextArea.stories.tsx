/**
 * TextArea Component Stories
 *
 * Storybook stories for the TextArea component demonstrating:
 * - All visual states (default, focus, error, disabled)
 * - Label and helper text variations
 * - Character counter functionality
 * - Resize options
 * - Full width option
 * - Accessibility testing with a11y addon
 *
 * Story organization follows Storybook best practices:
 * - Default story shows the primary use case
 * - State stories demonstrate interactive behaviors
 * - Composition stories show real-world usage patterns
 */

import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

/**
 * Meta configuration for the TextArea component stories
 */
const meta: Meta<typeof TextArea> = {
  title: "UI/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A form textarea component for ScamAware Jersey with support for labels, helper text, error states, character counting, and configurable resize behavior. Follows WCAG 2.1 AA accessibility guidelines.",
      },
    },
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: true },
          { id: "label", enabled: true },
        ],
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label text displayed above the textarea",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the textarea",
    },
    error: {
      control: "text",
      description: "Error message displayed below the textarea",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when textarea is empty",
    },
    showCharCount: {
      control: "boolean",
      description: "Whether to show the character counter",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    maxLength: {
      control: "number",
      description: "Maximum character length for counter display",
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description: "CSS resize behavior for the textarea",
      table: {
        defaultValue: { summary: "vertical" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: "boolean",
      description: "Whether the textarea is required",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the textarea should take full width",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    rows: {
      control: "number",
      description: "Number of visible text rows",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

/* =============================================================================
   DEFAULT STORIES
   ============================================================================= */

/**
 * Default Story
 *
 * Shows the textarea with minimal props (just placeholder).
 * This is the simplest use case.
 */
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

/**
 * With Label
 *
 * Textarea with a label for proper form accessibility.
 */
export const WithLabel: Story = {
  args: {
    label: "Description",
    placeholder: "Enter a description",
  },
};

/**
 * With Helper Text
 *
 * Textarea with helper text providing additional context.
 */
export const WithHelperText: Story = {
  args: {
    label: "Message",
    placeholder: "Enter your message",
    helperText: "Please provide as much detail as possible",
  },
};

/**
 * Required Field
 *
 * Textarea marked as required with the asterisk indicator.
 */
export const Required: Story = {
  args: {
    label: "Comments",
    placeholder: "Enter your comments",
    required: true,
  },
};

/* =============================================================================
   CHARACTER COUNTER STORIES
   ============================================================================= */

/**
 * With Character Counter
 *
 * Textarea showing the character counter without a limit.
 */
export const WithCharCounter: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    showCharCount: true,
  },
};

/**
 * With Max Length Counter
 *
 * Textarea with a maximum character limit and counter.
 */
export const WithMaxLength: Story = {
  args: {
    label: "Short Description",
    placeholder: "Enter a brief description",
    showCharCount: true,
    maxLength: 200,
    helperText: "Keep it concise and informative",
  },
};

/**
 * Counter with Initial Value
 *
 * Shows the counter accurately reflecting existing content.
 */
export const CounterWithInitialValue: Story = {
  args: {
    label: "Edit Description",
    defaultValue:
      "This is some existing content that demonstrates the character counter.",
    showCharCount: true,
    maxLength: 500,
  },
};

/**
 * Counter Near Limit
 *
 * Shows the counter when approaching the character limit.
 */
export const CounterNearLimit: Story = {
  args: {
    label: "Tweet",
    defaultValue:
      "This is a message that is getting close to the character limit. We want to see how the counter looks when you are almost at the maximum allowed characters.",
    showCharCount: true,
    maxLength: 150,
  },
};

/* =============================================================================
   STATE STORIES
   ============================================================================= */

/**
 * Focus State
 *
 * Demonstrates the trust-blue focus ring.
 * Note: Focus state is shown when interacting with the textarea.
 */
export const FocusState: Story = {
  args: {
    label: "Click to see focus state",
    placeholder: "Click or tab here...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Click or tab to the textarea to see the trust-blue focus ring. This provides clear visual feedback for keyboard navigation.",
      },
    },
  },
};

/**
 * Error State
 *
 * Shows the textarea with an error message.
 * The border turns red and error text replaces helper text.
 */
export const ErrorState: Story = {
  args: {
    label: "Description",
    defaultValue: "Too short",
    error: "Description must be at least 50 characters",
  },
};

/**
 * Error State with Counter
 *
 * Shows error state combined with character counter.
 */
export const ErrorWithCounter: Story = {
  args: {
    label: "Comments",
    defaultValue: "Short",
    showCharCount: true,
    maxLength: 500,
    error: "Please provide more details about the incident",
  },
};

/**
 * Disabled State
 *
 * Shows the textarea in its disabled state with muted styling.
 */
export const DisabledState: Story = {
  args: {
    label: "Notes",
    placeholder: "Enter notes",
    disabled: true,
  },
};

/**
 * Disabled with Value
 *
 * Disabled textarea showing existing data that cannot be edited.
 */
export const DisabledWithValue: Story = {
  args: {
    label: "System Notes",
    defaultValue: "This content was generated automatically and cannot be modified.",
    disabled: true,
    helperText: "This field cannot be modified",
  },
};

/* =============================================================================
   RESIZE STORIES
   ============================================================================= */

/**
 * Resize Vertical (Default)
 *
 * Default resize behavior - can only resize vertically.
 */
export const ResizeVertical: Story = {
  args: {
    label: "Resize Vertical",
    placeholder: "Drag the corner to resize vertically...",
    resize: "vertical",
    helperText: "Default behavior - can resize vertically only",
  },
};

/**
 * Resize None
 *
 * Textarea that cannot be resized.
 */
export const ResizeNone: Story = {
  args: {
    label: "Resize None",
    placeholder: "This textarea cannot be resized...",
    resize: "none",
    helperText: "Resize is disabled",
  },
};

/**
 * Resize Horizontal
 *
 * Textarea that can only be resized horizontally.
 */
export const ResizeHorizontal: Story = {
  args: {
    label: "Resize Horizontal",
    placeholder: "Drag to resize horizontally...",
    resize: "horizontal",
    helperText: "Can resize horizontally only",
  },
};

/**
 * Resize Both
 *
 * Textarea that can be resized in both directions.
 */
export const ResizeBoth: Story = {
  args: {
    label: "Resize Both",
    placeholder: "Drag the corner to resize in any direction...",
    resize: "both",
    helperText: "Can resize in both directions",
  },
};

/* =============================================================================
   LAYOUT STORIES
   ============================================================================= */

/**
 * Full Width
 *
 * Textarea that spans the full width of its container.
 */
export const FullWidth: Story = {
  args: {
    label: "Full Width Textarea",
    placeholder: "This textarea takes full width...",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Custom Rows
 *
 * Textarea with custom number of visible rows.
 */
export const CustomRows: Story = {
  args: {
    label: "Large Textarea",
    placeholder: "This textarea has more visible rows...",
    rows: 8,
  },
};

/* =============================================================================
   COMPARISON STORIES
   ============================================================================= */

/**
 * All States
 *
 * Shows all textarea states side by side for comparison.
 */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "400px",
      }}
    >
      <TextArea label="Default" placeholder="Default state..." />
      <TextArea label="With Value" defaultValue="Entered text content" />
      <TextArea
        label="Error State"
        defaultValue="Invalid content"
        error="Please provide more details"
      />
      <TextArea label="Disabled" placeholder="Disabled textarea..." disabled />
      <TextArea
        label="Disabled with Value"
        defaultValue="Cannot edit this content"
        disabled
      />
    </div>
  ),
};

/**
 * Resize Options
 *
 * Shows all resize options for comparison.
 */
export const ResizeOptions: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.5rem",
        maxWidth: "800px",
      }}
    >
      <TextArea
        label="Resize None"
        placeholder="Cannot resize..."
        resize="none"
      />
      <TextArea
        label="Resize Vertical"
        placeholder="Vertical only..."
        resize="vertical"
      />
      <TextArea
        label="Resize Horizontal"
        placeholder="Horizontal only..."
        resize="horizontal"
      />
      <TextArea
        label="Resize Both"
        placeholder="Both directions..."
        resize="both"
      />
    </div>
  ),
};

/* =============================================================================
   REAL-WORLD USAGE STORIES
   ============================================================================= */

/**
 * Scam Report Form
 *
 * Example of textarea used in a scam reporting context.
 */
export const ScamReportForm: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "500px",
      }}
    >
      <TextArea
        label="Describe the Scam"
        placeholder="Please describe what happened in as much detail as possible..."
        required
        showCharCount
        maxLength={2000}
        helperText="Include dates, times, and any relevant details"
        rows={6}
      />
      <TextArea
        label="Communication Received"
        placeholder="Copy and paste any suspicious messages, emails, or texts you received..."
        showCharCount
        maxLength={5000}
        helperText="Do not include any personal passwords or PIN numbers"
        rows={4}
      />
      <TextArea
        label="Additional Notes"
        placeholder="Any other information that might be helpful..."
        showCharCount
        rows={3}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example form layout for reporting a scam, showing how textareas with character counters work in a real-world scenario.",
      },
    },
  },
};

/**
 * Contact Form
 *
 * Example of a typical contact form message field.
 */
export const ContactForm: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "500px",
      }}
    >
      <TextArea
        label="Your Message"
        placeholder="How can we help you?"
        required
        showCharCount
        maxLength={1000}
        rows={5}
      />
    </div>
  ),
};

/**
 * Feedback Form
 *
 * Example of a feedback form with multiple textareas.
 */
export const FeedbackForm: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "500px",
      }}
    >
      <TextArea
        label="What did you like?"
        placeholder="Tell us what you found helpful..."
        showCharCount
        maxLength={500}
        rows={3}
      />
      <TextArea
        label="What could be improved?"
        placeholder="Share your suggestions..."
        showCharCount
        maxLength={500}
        rows={3}
      />
      <TextArea
        label="Any other comments?"
        placeholder="Additional feedback..."
        showCharCount
        maxLength={300}
        rows={2}
      />
    </div>
  ),
};

/**
 * Form Validation Example
 *
 * Shows textareas with various validation states.
 */
export const ValidationStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "400px",
      }}
    >
      <TextArea
        label="Valid Description"
        defaultValue="This is a properly filled out description with enough detail to meet the minimum requirements."
        showCharCount
        maxLength={500}
      />
      <TextArea
        label="Too Short"
        defaultValue="Too brief."
        showCharCount
        maxLength={500}
        error="Description must be at least 50 characters"
      />
      <TextArea
        label="Required Field"
        placeholder="This field is required"
        required
        error="This field is required"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples of validation states showing success indication, error messages, and required field validation.",
      },
    },
  },
};

/**
 * Accessibility Demo
 *
 * Demonstrates accessible textarea patterns with proper labeling and ARIA attributes.
 */
export const AccessibilityDemo: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "400px",
      }}
    >
      <TextArea
        label="With aria-describedby (helper text)"
        placeholder="Tab here and screen reader will announce helper text"
        helperText="This helper text is linked via aria-describedby"
      />
      <TextArea
        label="With aria-invalid (error state)"
        defaultValue="invalid value"
        error="This error message is announced by screen readers"
      />
      <TextArea
        label="With Character Counter"
        placeholder="Character count is announced via aria-live"
        showCharCount
        maxLength={100}
        helperText="The character counter uses aria-live for real-time updates"
      />
      <TextArea
        label="Required Field"
        placeholder="Required indicator is aria-hidden"
        required
        helperText="The asterisk is decorative; use the textarea's required attribute for accessibility"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how the TextArea component handles accessibility with proper ARIA attributes, label associations, and screen reader announcements.",
      },
    },
  },
};

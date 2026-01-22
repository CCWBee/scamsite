/**
 * Input Component Stories
 *
 * Storybook stories for the Input component demonstrating:
 * - All visual states (default, focus, error, disabled)
 * - Label and helper text variations
 * - Icon support (left, right, both)
 * - Full width option
 * - Accessibility testing with a11y addon
 *
 * Story organization follows Storybook best practices:
 * - Default story shows the primary use case
 * - State stories demonstrate interactive behaviors
 * - Composition stories show real-world usage patterns
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { Icon } from "@/components/ui/Icon";

/**
 * Meta configuration for the Input component stories
 */
const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A form input component for ScamAware Jersey with support for labels, helper text, error states, and icon slots. Follows WCAG 2.1 AA accessibility guidelines.",
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
      description: "Label text displayed above the input",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the input",
    },
    error: {
      control: "text",
      description: "Error message displayed below the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when input is empty",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "url", "number", "search"],
      description: "HTML input type attribute",
      table: {
        defaultValue: { summary: "text" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the input should take full width",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    leftIcon: {
      control: false,
      description: "Icon displayed on the left side of the input",
    },
    rightIcon: {
      control: false,
      description: "Icon displayed on the right side of the input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/* =============================================================================
   DEFAULT STORIES
   ============================================================================= */

/**
 * Default Story
 *
 * Shows the input with minimal props (just placeholder).
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
 * Input with a label for proper form accessibility.
 */
export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
  },
};

/**
 * With Helper Text
 *
 * Input with helper text providing additional context.
 */
export const WithHelperText: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    helperText: "Must be at least 8 characters with one uppercase letter",
  },
};

/**
 * Required Field
 *
 * Input marked as required with the asterisk indicator.
 */
export const Required: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
  },
};

/* =============================================================================
   STATE STORIES
   ============================================================================= */

/**
 * Focus State
 *
 * Demonstrates the trust-blue focus ring.
 * Note: Focus state is shown when interacting with the input.
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
          "Click or tab to the input to see the trust-blue focus ring. This provides clear visual feedback for keyboard navigation.",
      },
    },
  },
};

/**
 * Error State
 *
 * Shows the input with an error message.
 * The border turns red and error text replaces helper text.
 */
export const ErrorState: Story = {
  args: {
    label: "Email Address",
    type: "email",
    defaultValue: "invalid-email",
    error: "Please enter a valid email address",
  },
};

/**
 * Disabled State
 *
 * Shows the input in its disabled state with muted styling.
 */
export const DisabledState: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    disabled: true,
  },
};

/**
 * Disabled with Value
 *
 * Disabled input showing existing data that cannot be edited.
 */
export const DisabledWithValue: Story = {
  args: {
    label: "Account ID",
    defaultValue: "ACC-123456",
    disabled: true,
    helperText: "This field cannot be modified",
  },
};

/* =============================================================================
   ICON STORIES
   ============================================================================= */

/**
 * With Left Icon
 *
 * Input with an icon on the left side.
 * Useful for search or specific field types.
 */
export const WithLeftIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search scam types...",
    leftIcon: <Icon name="Search" size="sm" aria-hidden />,
  },
};

/**
 * With Right Icon
 *
 * Input with an icon on the right side.
 * Common for email or status indicators.
 */
export const WithRightIcon: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    rightIcon: <Icon name="Mail" size="sm" aria-hidden />,
  },
};

/**
 * With Both Icons
 *
 * Input with icons on both sides.
 * Use sparingly to avoid visual clutter.
 */
export const WithBothIcons: Story = {
  args: {
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
    leftIcon: <Icon name="Phone" size="sm" aria-hidden />,
    rightIcon: <Icon name="Check" size="sm" aria-hidden />,
  },
};

/**
 * Password with Toggle Icon
 *
 * Example showing a password field with a visibility toggle icon.
 */
export const PasswordWithIcon: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    leftIcon: <Icon name="Lock" size="sm" aria-hidden />,
    rightIcon: <Icon name="Eye" size="sm" aria-hidden />,
  },
};

/* =============================================================================
   LAYOUT STORIES
   ============================================================================= */

/**
 * Full Width
 *
 * Input that spans the full width of its container.
 */
export const FullWidth: Story = {
  args: {
    label: "Full Width Input",
    placeholder: "This input takes full width...",
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

/* =============================================================================
   COMPARISON STORIES
   ============================================================================= */

/**
 * All States
 *
 * Shows all input states side by side for comparison.
 */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "400px" }}>
      <Input
        label="Default"
        placeholder="Default state..."
      />
      <Input
        label="With Value"
        defaultValue="Entered text"
      />
      <Input
        label="Error State"
        defaultValue="invalid@"
        error="Please enter a valid email address"
      />
      <Input
        label="Disabled"
        placeholder="Disabled input..."
        disabled
      />
      <Input
        label="Disabled with Value"
        defaultValue="Cannot edit this"
        disabled
      />
    </div>
  ),
};

/**
 * Input Types
 *
 * Shows various HTML input types.
 */
export const InputTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "400px" }}>
      <Input label="Text" type="text" placeholder="Text input" />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Number" type="number" placeholder="0" />
      <Input label="Phone" type="tel" placeholder="+44 1234 567890" />
      <Input label="URL" type="url" placeholder="https://example.com" />
    </div>
  ),
};

/* =============================================================================
   REAL-WORLD USAGE STORIES
   ============================================================================= */

/**
 * Scam Report Form
 *
 * Example of inputs used in a scam reporting context.
 */
export const ScamReportForm: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "500px" }}>
      <Input
        label="Your Name"
        placeholder="Enter your full name"
        required
        leftIcon={<Icon name="User" size="sm" aria-hidden />}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        required
        helperText="We'll use this to send you updates about your report"
        leftIcon={<Icon name="Mail" size="sm" aria-hidden />}
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+44 1234 567890"
        helperText="Optional - for urgent follow-up only"
        leftIcon={<Icon name="Phone" size="sm" aria-hidden />}
      />
      <Input
        label="Scammer's Contact"
        placeholder="Email, phone, or website"
        helperText="Any contact information you have for the suspected scammer"
        leftIcon={<Icon name="AlertTriangle" size="sm" aria-hidden />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example form layout for reporting a scam, showing how different input configurations work together in a real-world scenario.",
      },
    },
  },
};

/**
 * Login Form
 *
 * Example of a typical login form layout.
 */
export const LoginForm: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "400px" }}>
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        required
        leftIcon={<Icon name="Mail" size="sm" aria-hidden />}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
        leftIcon={<Icon name="Lock" size="sm" aria-hidden />}
        rightIcon={<Icon name="EyeOff" size="sm" aria-hidden />}
      />
    </div>
  ),
};

/**
 * Search Input
 *
 * Example of a search input with appropriate styling.
 */
export const SearchInput: Story = {
  args: {
    type: "search",
    placeholder: "Search for scam types, warning signs...",
    leftIcon: <Icon name="Search" size="sm" aria-hidden />,
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Form Validation Example
 *
 * Shows inputs with various validation states.
 */
export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "400px" }}>
      <Input
        label="Valid Email"
        type="email"
        defaultValue="user@example.com"
        rightIcon={<Icon name="CheckCircle" size="sm" className="text-success-500" aria-hidden />}
      />
      <Input
        label="Invalid Email"
        type="email"
        defaultValue="invalid-email"
        error="Please enter a valid email address"
        rightIcon={<Icon name="XCircle" size="sm" className="text-alert-red" aria-hidden />}
      />
      <Input
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
 * Demonstrates accessible input patterns with proper labeling and ARIA attributes.
 */
export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "400px" }}>
      <Input
        label="With aria-describedby (helper text)"
        placeholder="Tab here and screen reader will announce helper text"
        helperText="This helper text is linked via aria-describedby"
      />
      <Input
        label="With aria-invalid (error state)"
        defaultValue="invalid value"
        error="This error message is announced by screen readers"
      />
      <Input
        label="Required Field"
        placeholder="Required indicator is aria-hidden"
        required
        helperText="The asterisk is decorative; use the input's required attribute for accessibility"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how the Input component handles accessibility with proper ARIA attributes, label associations, and screen reader announcements.",
      },
    },
  },
};

/**
 * Alert Component Stories
 *
 * Storybook stories for the Alert component demonstrating:
 * - All visual variants (info, success, warning, error)
 * - Title and description combinations
 * - Icon visibility toggle
 * - Dismissible functionality with animation
 * - Action button integration
 * - ScamAware Jersey use cases
 *
 * Story organization follows Storybook best practices:
 * - Default story shows the primary use case
 * - Variant stories demonstrate visual options
 * - Feature stories show specific functionality
 * - Use case stories show real-world applications
 */

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Alert } from "./Alert";

/**
 * Meta configuration for the Alert component stories
 */
const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A notification component for displaying important messages with semantic variants, optional icons, and dismissible functionality throughout the ScamAware Jersey application.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["info", "success", "warning", "error"],
      description: "Visual and semantic variant of the alert",
      table: {
        defaultValue: { summary: "info" },
      },
    },
    title: {
      control: "text",
      description: "Optional title for the alert",
    },
    children: {
      control: "text",
      description: "The main content/description of the alert",
    },
    icon: {
      control: "boolean",
      description: "Whether to show the variant-appropriate icon",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    dismissible: {
      control: "boolean",
      description: "Whether the alert can be dismissed",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onDismiss: {
      action: "dismissed",
      description: "Callback when the alert is dismissed",
    },
    action: {
      control: "object",
      description: "Optional action button configuration",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

/**
 * Default Story
 *
 * Shows the alert with default props (info variant with icon).
 */
export const Default: Story = {
  args: {
    children: "This is an informational message for the user.",
  },
};

/**
 * Info Variant
 *
 * Uses trust-blue color from the JFSC design system.
 * Best for general information and neutral notifications.
 */
export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    children: "Your session will expire in 5 minutes. Please save your work.",
  },
};

/**
 * Success Variant
 *
 * Uses success green for positive confirmations.
 * Best for completed actions and success messages.
 */
export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "Your scam report has been submitted successfully.",
  },
};

/**
 * Warning Variant
 *
 * Uses warning amber for cautionary notices.
 * Best for items requiring attention or potential issues.
 */
export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "This message contains characteristics commonly seen in phishing attempts.",
  },
};

/**
 * Error Variant
 *
 * Uses alert-red from the JFSC design system.
 * Best for error messages and critical notifications.
 * Uses aria-live="assertive" for immediate screen reader announcement.
 */
export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    children: "Unable to verify your identity. Please contact support.",
  },
};

/**
 * Without Title
 *
 * Shows an alert with only a description (no title).
 */
export const WithoutTitle: Story = {
  args: {
    variant: "info",
    children: "This is a simple alert without a title, useful for brief notifications.",
  },
};

/**
 * Without Icon
 *
 * Shows an alert without the variant icon.
 */
export const WithoutIcon: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    icon: false,
    children: "This alert has no icon for a cleaner appearance.",
  },
};

/**
 * Dismissible Alert
 *
 * Shows a dismissible alert with the close button.
 * Click the X button to see the fade-out animation.
 */
export const Dismissible: Story = {
  args: {
    variant: "info",
    title: "Tip",
    dismissible: true,
    children: "You can dismiss this alert by clicking the X button.",
  },
};

/**
 * With Action Button
 *
 * Shows an alert with an action button.
 */
export const WithAction: Story = {
  args: {
    variant: "warning",
    title: "Verification Required",
    children: "Please verify your email address to continue using all features.",
    action: {
      label: "Verify Now",
      onClick: () => alert("Verification action triggered!"),
    },
  },
};

/**
 * With Action and Dismissible
 *
 * Shows an alert with both action button and dismiss functionality.
 */
export const WithActionAndDismissible: Story = {
  args: {
    variant: "error",
    title: "Connection Lost",
    dismissible: true,
    children: "We lost connection to the server. Your changes may not be saved.",
    action: {
      label: "Retry",
      onClick: () => alert("Retry action triggered!"),
    },
  },
};

/**
 * All Variants
 *
 * Shows all four variants side by side for comparison.
 * Useful for design review and documentation.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Alert variant="info" title="Information">
        This is an informational message.
      </Alert>
      <Alert variant="success" title="Success">
        Your action was completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please proceed with caution.
      </Alert>
      <Alert variant="error" title="Error">
        Something went wrong. Please try again.
      </Alert>
    </div>
  ),
};

/**
 * All Variants Without Icons
 *
 * Shows all variants without icons for a cleaner look.
 */
export const AllVariantsWithoutIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Alert variant="info" title="Information" icon={false}>
        This is an informational message.
      </Alert>
      <Alert variant="success" title="Success" icon={false}>
        Your action was completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning" icon={false}>
        Please proceed with caution.
      </Alert>
      <Alert variant="error" title="Error" icon={false}>
        Something went wrong. Please try again.
      </Alert>
    </div>
  ),
};

/**
 * All Variants Dismissible
 *
 * Shows all variants with dismissible functionality.
 */
export const AllVariantsDismissible: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Alert variant="info" title="Information" dismissible>
        This is a dismissible informational message.
      </Alert>
      <Alert variant="success" title="Success" dismissible>
        This is a dismissible success message.
      </Alert>
      <Alert variant="warning" title="Warning" dismissible>
        This is a dismissible warning message.
      </Alert>
      <Alert variant="error" title="Error" dismissible>
        This is a dismissible error message.
      </Alert>
    </div>
  ),
};

/**
 * Scam Assessment Result
 *
 * Real-world ScamAware Jersey use case: displaying scam assessment results.
 */
export const ScamAssessmentResult: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Alert variant="error" title="High Risk Detected">
        This communication shows multiple warning signs of a phishing scam.
        Do not click any links or provide personal information.
      </Alert>
      <Alert
        variant="warning"
        title="Suspicious Activity"
        action={{
          label: "Learn More",
          onClick: () => alert("Opening scam details..."),
        }}
      >
        This message contains some characteristics commonly associated with scams.
        We recommend verifying with the official source.
      </Alert>
      <Alert variant="success" title="Appears Legitimate">
        This communication appears to be from a verified source.
        However, always verify important requests through official channels.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows how alerts are used to display scam assessment results from the AI chatbot.",
      },
    },
  },
};

/**
 * Jersey Emergency Contact
 *
 * Real-world ScamAware Jersey use case: emergency contact information.
 */
export const JerseyEmergencyContact: Story = {
  args: {
    variant: "error",
    title: "If You Think You've Been Scammed",
    children: "Contact the Jersey Fraud Hotline immediately at 01534 612612. If you're in immediate danger, call 999.",
    action: {
      label: "Call Now",
      onClick: () => alert("Initiating call..."),
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows how alerts are used to display emergency contact information for scam victims.",
      },
    },
  },
};

/**
 * JFSC Verification Notice
 *
 * Real-world ScamAware Jersey use case: official verification notice.
 */
export const JFSCVerificationNotice: Story = {
  args: {
    variant: "info",
    title: "JFSC Official Contact",
    children: "The Jersey Financial Services Commission can be reached at +44 (0)1534 822000 or via email at @jerseyfsc.org. Never trust requests from other domains claiming to be JFSC.",
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows how alerts are used to display official contact verification information.",
      },
    },
  },
};

/**
 * Session Timeout Warning
 *
 * Real-world ScamAware Jersey use case: session management.
 */
export const SessionTimeoutWarning: Story = {
  args: {
    variant: "warning",
    title: "Session Expiring",
    children: "Your chat session will expire in 2 minutes. For your privacy, conversation history is not saved.",
    dismissible: true,
    action: {
      label: "Extend Session",
      onClick: () => alert("Session extended!"),
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows how alerts are used for session management notifications.",
      },
    },
  },
};

/**
 * Report Submission Success
 *
 * Real-world ScamAware Jersey use case: form submission feedback.
 */
export const ReportSubmissionSuccess: Story = {
  args: {
    variant: "success",
    title: "Report Submitted",
    children: "Thank you for reporting this scam. Your report helps protect Jersey residents. Reference number: SCM-2024-0001.",
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows how alerts are used to confirm scam report submissions.",
      },
    },
  },
};

/**
 * Interactive Dismissible Demo
 *
 * Interactive demo showing the dismiss animation.
 * Uses internal state to demonstrate visibility toggling.
 */
export const InteractiveDismissibleDemo: Story = {
  render: function InteractiveDismissible() {
    const [alerts, setAlerts] = useState([
      { id: 1, variant: "info" as const, title: "Info Alert", message: "Click X to dismiss me with a smooth animation." },
      { id: 2, variant: "success" as const, title: "Success Alert", message: "I will fade out when dismissed." },
      { id: 3, variant: "warning" as const, title: "Warning Alert", message: "Watch the scale and opacity transition." },
      { id: 4, variant: "error" as const, title: "Error Alert", message: "All alerts can be dismissed independently." },
    ]);

    const handleDismiss = (id: number) => {
      setAlerts((current) => current.filter((alert) => alert.id !== id));
    };

    const handleReset = () => {
      setAlerts([
        { id: 1, variant: "info" as const, title: "Info Alert", message: "Click X to dismiss me with a smooth animation." },
        { id: 2, variant: "success" as const, title: "Success Alert", message: "I will fade out when dismissed." },
        { id: 3, variant: "warning" as const, title: "Warning Alert", message: "Watch the scale and opacity transition." },
        { id: 4, variant: "error" as const, title: "Error Alert", message: "All alerts can be dismissed independently." },
      ]);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            title={alert.title}
            dismissible
            onDismiss={() => handleDismiss(alert.id)}
          >
            {alert.message}
          </Alert>
        ))}
        {alerts.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
            All alerts dismissed!
          </div>
        )}
        {alerts.length < 4 && (
          <button
            onClick={handleReset}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#1a1f3d",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            Reset Alerts
          </button>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo showing the dismiss animation. Click the X buttons to see alerts fade out with a smooth scale and opacity transition.",
      },
    },
  },
};

/**
 * Long Content
 *
 * Shows how alerts handle longer content.
 */
export const LongContent: Story = {
  args: {
    variant: "warning",
    title: "Important Safety Information",
    dismissible: true,
    children: `Please be aware that scammers are becoming increasingly sophisticated.
      They may use official-looking emails, professional phone manner, and even spoofed caller IDs.
      Always verify any request for personal information or payment by contacting the organization
      directly using contact details from their official website. Never use contact information
      provided in a suspicious message. When in doubt, hang up and call back using a verified number.`,
    action: {
      label: "View All Safety Tips",
      onClick: () => alert("Opening safety tips..."),
    },
  },
};

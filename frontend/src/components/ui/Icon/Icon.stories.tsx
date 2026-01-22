/**
 * Icon Component Stories
 *
 * Storybook stories for the Icon component demonstrating:
 * - All key icons used in ScamAware Jersey
 * - All size variants (sm, md, lg, xl)
 * - Accessibility patterns (decorative vs meaningful)
 * - Real-world usage examples
 *
 * The Icon Gallery story provides a visual reference for all commonly
 * used icons in the application, organized by category.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Icon, IconName, IconSize } from "./Icon";

/**
 * Meta configuration for the Icon component stories
 */
const meta: Meta<typeof Icon> = {
  title: "UI/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A wrapper component for Lucide React icons providing consistent sizing, styling, and accessibility features for ScamAware Jersey.",
      },
    },
  },
  argTypes: {
    name: {
      control: "text",
      description: "The name of the Lucide icon to render",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl"],
      description: "Predefined size for the icon",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    color: {
      control: "color",
      description: "Custom color for the icon (CSS color value)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for meaningful icons",
    },
    "aria-hidden": {
      control: "boolean",
      description: "Marks the icon as decorative",
    },
    strokeWidth: {
      control: { type: "number", min: 1, max: 4, step: 0.5 },
      description: "Stroke width for the icon",
      table: {
        defaultValue: { summary: "2" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// ============================================================================
// BASIC STORIES
// ============================================================================

/**
 * Default Story
 *
 * Shows the Icon component with default props.
 */
export const Default: Story = {
  args: {
    name: "Shield",
    "aria-hidden": true,
  },
};

/**
 * With Aria Label
 *
 * Meaningful icon that will be announced by screen readers.
 */
export const WithAriaLabel: Story = {
  args: {
    name: "AlertTriangle",
    "aria-label": "Warning: Potential scam detected",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use aria-label for meaningful icons that convey information not available elsewhere.",
      },
    },
  },
};

/**
 * Decorative Icon
 *
 * Icon hidden from screen readers (aria-hidden).
 */
export const Decorative: Story = {
  args: {
    name: "Shield",
    "aria-hidden": true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use aria-hidden for decorative icons or when adjacent text conveys the same meaning.",
      },
    },
  },
};

// ============================================================================
// SIZE STORIES
// ============================================================================

/**
 * Small Size (16px)
 *
 * Compact size for inline text and tight spaces.
 */
export const SizeSmall: Story = {
  args: {
    name: "Info",
    size: "sm",
    "aria-hidden": true,
  },
};

/**
 * Medium Size (20px) - Default
 *
 * Standard size for most UI elements.
 */
export const SizeMedium: Story = {
  args: {
    name: "Info",
    size: "md",
    "aria-hidden": true,
  },
};

/**
 * Large Size (24px)
 *
 * For buttons and primary actions.
 */
export const SizeLarge: Story = {
  args: {
    name: "Info",
    size: "lg",
    "aria-hidden": true,
  },
};

/**
 * Extra Large Size (32px)
 *
 * For hero sections and emphasis.
 */
export const SizeExtraLarge: Story = {
  args: {
    name: "Info",
    size: "xl",
    "aria-hidden": true,
  },
};

/**
 * All Sizes Comparison
 *
 * Shows all size variants side by side.
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      {(["sm", "md", "lg", "xl"] as IconSize[]).map((size) => (
        <div
          key={size}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        >
          <Icon name="Shield" size={size} aria-hidden />
          <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
            {size} ({size === "sm" ? "16" : size === "md" ? "20" : size === "lg" ? "24" : "32"}px)
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Visual comparison of all four size presets.",
      },
    },
  },
};

// ============================================================================
// COLOR STORIES
// ============================================================================

/**
 * Custom Color via className
 *
 * Using Tailwind classes for consistent theming.
 */
export const CustomColorClassName: Story = {
  args: {
    name: "Shield",
    className: "text-trust-blue-500",
    "aria-hidden": true,
  },
  parameters: {
    docs: {
      description: {
        story: "Apply Tailwind color classes via the className prop for theme consistency.",
      },
    },
  },
};

/**
 * Custom Color via color prop
 *
 * Direct CSS color value for special cases.
 */
export const CustomColorProp: Story = {
  args: {
    name: "AlertTriangle",
    color: "#c8102e",
    "aria-hidden": true,
  },
};

/**
 * Inherited Color
 *
 * Icons inherit color from parent element by default (currentColor).
 */
export const InheritedColor: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div style={{ color: "#1a1f3d" }}>
        <Icon name="Shield" aria-hidden />
      </div>
      <div style={{ color: "#0066a1" }}>
        <Icon name="Shield" aria-hidden />
      </div>
      <div style={{ color: "#c8102e" }}>
        <Icon name="Shield" aria-hidden />
      </div>
      <div style={{ color: "#16a34a" }}>
        <Icon name="Shield" aria-hidden />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icons inherit color from parent element via currentColor by default.",
      },
    },
  },
};

// ============================================================================
// ICON GALLERY - ALL KEY ICONS
// ============================================================================

/**
 * Helper component for displaying an icon with its name
 */
const IconDisplay = ({
  name,
  label,
}: {
  name: IconName;
  label?: string;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem",
      padding: "1rem",
      backgroundColor: "#f9fafb",
      borderRadius: "0.5rem",
      minWidth: "100px",
    }}
  >
    <Icon name={name} size="lg" aria-hidden />
    <span style={{ fontSize: "0.75rem", color: "#374151", textAlign: "center" }}>
      {label || name}
    </span>
  </div>
);

/**
 * Section header for icon categories
 */
const CategoryHeader = ({ children }: { children: React.ReactNode }) => (
  <h3
    style={{
      fontFamily: "Arial, sans-serif",
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "#1a1f3d",
      marginBottom: "0.75rem",
      marginTop: "1.5rem",
    }}
  >
    {children}
  </h3>
);

/**
 * Icon Grid container
 */
const IconGrid = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
      gap: "0.75rem",
    }}
  >
    {children}
  </div>
);

/**
 * Icon Gallery
 *
 * Visual reference showing all commonly used icons in ScamAware Jersey,
 * organized by category. This is the primary documentation story for
 * the Icon component.
 */
export const IconGallery: Story = {
  render: () => (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <CategoryHeader>Security</CategoryHeader>
      <IconGrid>
        <IconDisplay name="Shield" />
        <IconDisplay name="ShieldAlert" />
        <IconDisplay name="ShieldCheck" />
      </IconGrid>

      <CategoryHeader>Alerts</CategoryHeader>
      <IconGrid>
        <IconDisplay name="AlertTriangle" />
        <IconDisplay name="AlertCircle" />
        <IconDisplay name="Info" />
      </IconGrid>

      <CategoryHeader>Communication</CategoryHeader>
      <IconGrid>
        <IconDisplay name="Phone" />
        <IconDisplay name="Mail" />
        <IconDisplay name="MessageSquare" />
      </IconGrid>

      <CategoryHeader>Status</CategoryHeader>
      <IconGrid>
        <IconDisplay name="CheckCircle" />
        <IconDisplay name="XCircle" />
      </IconGrid>

      <CategoryHeader>Navigation</CategoryHeader>
      <IconGrid>
        <IconDisplay name="ChevronDown" />
        <IconDisplay name="ChevronRight" />
        <IconDisplay name="ChevronUp" />
      </IconGrid>

      <CategoryHeader>Links</CategoryHeader>
      <IconGrid>
        <IconDisplay name="ExternalLink" />
        <IconDisplay name="Link" />
      </IconGrid>

      <CategoryHeader>Mobile Navigation</CategoryHeader>
      <IconGrid>
        <IconDisplay name="Menu" />
        <IconDisplay name="X" />
      </IconGrid>

      <CategoryHeader>Utility</CategoryHeader>
      <IconGrid>
        <IconDisplay name="Search" />
        <IconDisplay name="User" />
        <IconDisplay name="Settings" />
      </IconGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complete gallery of all key icons used in ScamAware Jersey, organized by category. Use this as a visual reference when selecting icons for your UI.",
      },
    },
  },
};

/**
 * Icon Gallery - All Sizes
 *
 * Shows the same icon set at all available sizes.
 */
export const IconGalleryAllSizes: Story = {
  render: () => {
    const keyIcons: IconName[] = [
      "Shield",
      "ShieldAlert",
      "AlertTriangle",
      "Info",
      "CheckCircle",
      "XCircle",
      "Menu",
      "Search",
    ];

    return (
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "0.75rem",
                  borderBottom: "1px solid #e5e7eb",
                  fontSize: "0.875rem",
                  color: "#374151",
                }}
              >
                Icon
              </th>
              {(["sm", "md", "lg", "xl"] as IconSize[]).map((size) => (
                <th
                  key={size}
                  style={{
                    textAlign: "center",
                    padding: "0.75rem",
                    borderBottom: "1px solid #e5e7eb",
                    fontSize: "0.875rem",
                    color: "#374151",
                  }}
                >
                  {size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keyIcons.map((name) => (
              <tr key={name}>
                <td
                  style={{
                    padding: "0.75rem",
                    borderBottom: "1px solid #e5e7eb",
                    fontSize: "0.875rem",
                    color: "#1a1f3d",
                  }}
                >
                  {name}
                </td>
                {(["sm", "md", "lg", "xl"] as IconSize[]).map((size) => (
                  <td
                    key={size}
                    style={{
                      padding: "0.75rem",
                      borderBottom: "1px solid #e5e7eb",
                      textAlign: "center",
                    }}
                  >
                    <Icon name={name} size={size} aria-hidden />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Matrix view showing key icons at all available sizes for comparison.",
      },
    },
  },
};

// ============================================================================
// REAL-WORLD USAGE EXAMPLES
// ============================================================================

/**
 * Button with Icon
 *
 * Common pattern: icon alongside button text.
 */
export const ButtonWithIcon: Story = {
  render: () => (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.625rem 1rem",
        backgroundColor: "#0066a1",
        color: "white",
        border: "none",
        borderRadius: "0.375rem",
        fontFamily: "Arial, sans-serif",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      <Icon name="ShieldCheck" size="sm" aria-hidden />
      Check for Scams
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When an icon accompanies text, use aria-hidden since the text conveys the meaning.",
      },
    },
  },
};

/**
 * Icon-Only Button
 *
 * When icon is standalone, aria-label is required.
 */
export const IconOnlyButton: Story = {
  render: () => (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem",
        backgroundColor: "transparent",
        border: "1px solid #d1d5db",
        borderRadius: "0.375rem",
        cursor: "pointer",
      }}
    >
      <Icon name="Menu" size="md" aria-label="Open navigation menu" />
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Standalone icon buttons MUST have aria-label for screen reader accessibility.",
      },
    },
  },
};

/**
 * Alert Message
 *
 * Common pattern: icon indicating message type.
 */
export const AlertMessage: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "1rem",
        backgroundColor: "#fef2f2",
        border: "1px solid #fecaca",
        borderRadius: "0.5rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Icon
        name="AlertTriangle"
        size="lg"
        className="text-alert-red-600"
        aria-hidden
      />
      <div>
        <strong style={{ color: "#991b1b", display: "block", marginBottom: "0.25rem" }}>
          Warning: Potential Scam Detected
        </strong>
        <p style={{ margin: 0, color: "#b91c1c", fontSize: "0.875rem" }}>
          This message shows several warning signs commonly associated with phishing scams.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alert messages with icons - the icon is decorative since the text conveys the warning.",
      },
    },
  },
};

/**
 * Navigation Links
 *
 * Common pattern: external link indicator.
 */
export const NavigationLinks: Story = {
  render: () => (
    <nav style={{ fontFamily: "Arial, sans-serif" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ marginBottom: "0.75rem" }}>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#0066a1",
              textDecoration: "none",
            }}
          >
            Report a Scam
            <Icon name="ChevronRight" size="sm" aria-hidden />
          </a>
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#0066a1",
              textDecoration: "none",
            }}
          >
            JFSC Website
            <Icon name="ExternalLink" size="sm" aria-hidden />
          </a>
        </li>
      </ul>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: "External link icons indicate the link opens in a new tab or external site.",
      },
    },
  },
};

/**
 * Status List
 *
 * Common pattern: status indicators in a list.
 */
export const StatusList: Story = {
  render: () => (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <li
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.75rem 0",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Icon name="CheckCircle" className="text-success-500" aria-hidden />
        <span>Email address verified</span>
      </li>
      <li
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.75rem 0",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Icon name="CheckCircle" className="text-success-500" aria-hidden />
        <span>Phone number confirmed</span>
      </li>
      <li
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.75rem 0",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Icon name="XCircle" className="text-alert-red-600" aria-hidden />
        <span>Website domain suspicious</span>
      </li>
    </ul>
  ),
  parameters: {
    docs: {
      description: {
        story: "Status icons used alongside text to indicate verification states.",
      },
    },
  },
};

/**
 * Contact Information
 *
 * ScamAware Jersey specific: emergency contact display.
 */
export const ContactInformation: Story = {
  render: () => (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h4 style={{ margin: "0 0 1rem", color: "#1a1f3d" }}>Emergency Contacts</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Icon name="Phone" className="text-trust-blue-500" aria-hidden />
          <span>Police Fraud Line: 01534 612612</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Icon name="Phone" className="text-trust-blue-500" aria-hidden />
          <span>JFSC: +44 (0)1534 822000</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Icon name="Mail" className="text-trust-blue-500" aria-hidden />
          <span>enquiries@jerseyfsc.org</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Communication icons used for contact information display.",
      },
    },
  },
};

/**
 * Mobile Header
 *
 * Common pattern: mobile navigation toggle.
 */
export const MobileHeader: Story = {
  render: () => (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#1a1f3d",
        borderRadius: "0.5rem",
        maxWidth: "400px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "white" }}>
        <Icon name="Shield" className="text-trust-blue-400" aria-hidden />
        <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}>ScamAware</span>
      </div>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.5rem",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          color: "white",
        }}
      >
        <Icon name="Menu" aria-label="Open menu" />
      </button>
    </header>
  ),
  parameters: {
    docs: {
      description: {
        story: "Mobile header with menu toggle - the menu icon needs aria-label as it is the only indicator.",
      },
    },
  },
};

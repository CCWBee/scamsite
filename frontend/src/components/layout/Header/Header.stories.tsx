/**
 * Header Component Stories
 *
 * Storybook stories for the Header component demonstrating:
 * - Default navigation
 * - Custom navigation items
 * - Active page states
 * - Mobile menu toggle states
 * - Responsive behavior
 *
 * The Header component is a responsive navigation header for ScamAware Jersey
 * featuring a logo with Shield icon and desktop/mobile navigation layouts.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Header, NavItem } from "./Header";

/**
 * Meta configuration for the Header component stories
 */
const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A responsive header component for ScamAware Jersey with logo, navigation, and mobile menu support. Implements sticky positioning and follows WCAG 2.1 AA accessibility guidelines.",
      },
    },
    layout: "fullscreen",
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: true },
          { id: "landmark-unique", enabled: true },
        ],
      },
    },
  },
  argTypes: {
    navItems: {
      control: "object",
      description: "Array of navigation items to display",
    },
    isMobileMenuOpen: {
      control: "boolean",
      description: "Whether the mobile menu is currently open",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onMobileMenuToggle: {
      action: "toggled",
      description: "Callback when mobile menu toggle is clicked",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "200px" }}>
        <Story />
        <div style={{ padding: "1rem" }}>
          <p style={{ color: "#666" }}>
            Page content goes here. The header is sticky and will remain at the
            top when scrolling.
          </p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

/* =============================================================================
   DEFAULT STORIES
   ============================================================================= */

/**
 * Default Story
 *
 * Shows the header with default navigation items.
 * This is the standard header appearance for most pages.
 */
export const Default: Story = {
  args: {},
};

/* =============================================================================
   NAVIGATION STATES
   ============================================================================= */

/**
 * With Active Page
 *
 * Shows the header with the "Home" navigation item marked as active.
 * The active state indicates the current page to users.
 */
export const WithActivePage: Story = {
  args: {
    navItems: [
      { label: "Home", href: "/", active: true },
      { label: "Scam Types", href: "/scams" },
      { label: "Warning Signs", href: "/warning-signs" },
      { label: "Get Help", href: "/help" },
      { label: "Resources", href: "/resources" },
    ],
  },
};

/**
 * Scam Types Active
 *
 * Shows the header with "Scam Types" as the active page.
 */
export const ScamTypesActive: Story = {
  args: {
    navItems: [
      { label: "Home", href: "/" },
      { label: "Scam Types", href: "/scams", active: true },
      { label: "Warning Signs", href: "/warning-signs" },
      { label: "Get Help", href: "/help" },
      { label: "Resources", href: "/resources" },
    ],
  },
};

/**
 * Get Help Active
 *
 * Shows the header with "Get Help" as the active page.
 * This is a key action page for users who may be scam victims.
 */
export const GetHelpActive: Story = {
  args: {
    navItems: [
      { label: "Home", href: "/" },
      { label: "Scam Types", href: "/scams" },
      { label: "Warning Signs", href: "/warning-signs" },
      { label: "Get Help", href: "/help", active: true },
      { label: "Resources", href: "/resources" },
    ],
  },
};

/* =============================================================================
   CUSTOM NAVIGATION
   ============================================================================= */

/**
 * Custom Navigation Items
 *
 * Shows the header with a custom set of navigation items.
 * Useful for different sections of the site or special pages.
 */
export const CustomNavigation: Story = {
  args: {
    navItems: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact", active: true },
    ],
  },
};

/**
 * Minimal Navigation
 *
 * Shows the header with minimal navigation items.
 * Useful for landing pages or focused user flows.
 */
export const MinimalNavigation: Story = {
  args: {
    navItems: [
      { label: "Home", href: "/" },
      { label: "Get Help", href: "/help" },
    ],
  },
};

/* =============================================================================
   MOBILE MENU STATES
   ============================================================================= */

/**
 * Mobile Menu Closed
 *
 * Shows the header with the mobile menu in closed state (hamburger icon).
 * This story is best viewed at mobile viewport sizes.
 */
export const MobileMenuClosed: Story = {
  args: {
    isMobileMenuOpen: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Mobile Menu Open
 *
 * Shows the header with the mobile menu in open state (X icon).
 * This story is best viewed at mobile viewport sizes.
 */
export const MobileMenuOpen: Story = {
  args: {
    isMobileMenuOpen: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/* =============================================================================
   RESPONSIVE BEHAVIOR
   ============================================================================= */

/**
 * Desktop View
 *
 * Shows the header at desktop viewport size.
 * Navigation links are displayed horizontally.
 */
export const DesktopView: Story = {
  args: {
    navItems: [
      { label: "Home", href: "/", active: true },
      { label: "Scam Types", href: "/scams" },
      { label: "Warning Signs", href: "/warning-signs" },
      { label: "Get Help", href: "/help" },
      { label: "Resources", href: "/resources" },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

/**
 * Tablet View
 *
 * Shows the header at tablet viewport size.
 * Navigation links are displayed horizontally on larger tablets.
 */
export const TabletView: Story = {
  args: {
    navItems: [
      { label: "Home", href: "/", active: true },
      { label: "Scam Types", href: "/scams" },
      { label: "Warning Signs", href: "/warning-signs" },
      { label: "Get Help", href: "/help" },
      { label: "Resources", href: "/resources" },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

/**
 * Mobile View
 *
 * Shows the header at mobile viewport size.
 * Hamburger menu button is displayed instead of navigation links.
 */
export const MobileView: Story = {
  args: {
    navItems: [
      { label: "Home", href: "/", active: true },
      { label: "Scam Types", href: "/scams" },
      { label: "Warning Signs", href: "/warning-signs" },
      { label: "Get Help", href: "/help" },
      { label: "Resources", href: "/resources" },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/* =============================================================================
   ACCESSIBILITY SHOWCASE
   ============================================================================= */

/**
 * Keyboard Navigation Demo
 *
 * This story demonstrates the keyboard navigation capabilities.
 * Tab through the header to see focus states on all interactive elements.
 */
export const KeyboardNavigationDemo: Story = {
  args: {
    navItems: [
      { label: "Home", href: "/" },
      { label: "Scam Types", href: "/scams", active: true },
      { label: "Warning Signs", href: "/warning-signs" },
      { label: "Get Help", href: "/help" },
      { label: "Resources", href: "/resources" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use Tab key to navigate through the header. All interactive elements have visible focus indicators for keyboard users.",
      },
    },
  },
};

/* =============================================================================
   REAL-WORLD USAGE
   ============================================================================= */

/**
 * Full Page Context
 *
 * Shows the header in a full page context with scrollable content.
 * Demonstrates the sticky positioning behavior.
 */
export const FullPageContext: Story = {
  args: {
    navItems: [
      { label: "Home", href: "/" },
      { label: "Scam Types", href: "/scams" },
      { label: "Warning Signs", href: "/warning-signs", active: true },
      { label: "Get Help", href: "/help" },
      { label: "Resources", href: "/resources" },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "150vh" }}>
        <Story />
        <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Warning Signs
          </h1>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "1rem" }}>
            Learn to recognize the warning signs of common scams. Scroll down to
            see the sticky header behavior - the header remains fixed at the top
            of the viewport.
          </p>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "1rem" }}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "1rem" }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </main>
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Scroll the page to observe the sticky header behavior. The header remains fixed at the top while content scrolls beneath it.",
      },
    },
  },
};

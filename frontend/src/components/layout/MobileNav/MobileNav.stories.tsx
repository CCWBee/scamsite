/**
 * MobileNav Component Stories
 *
 * Storybook stories for the MobileNav component demonstrating:
 * - Open and closed states
 * - Navigation items with active states
 * - Responsive behavior
 * - Keyboard accessibility
 * - Animation and transitions
 *
 * The MobileNav component is a slide-in navigation drawer for mobile devices
 * with full accessibility support including focus trap and keyboard navigation.
 */

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { NavItem } from "@/components/layout/Header";

/**
 * Default navigation items for ScamAware Jersey
 */
const defaultNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Scam Types", href: "/scams" },
  { label: "Warning Signs", href: "/warning-signs" },
  { label: "Get Help", href: "/help" },
  { label: "Resources", href: "/resources" },
];

/**
 * Navigation items with Home active
 */
const navItemsWithHomeActive: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Scam Types", href: "/scams" },
  { label: "Warning Signs", href: "/warning-signs" },
  { label: "Get Help", href: "/help" },
  { label: "Resources", href: "/resources" },
];

/**
 * Navigation items with Get Help active
 */
const navItemsWithGetHelpActive: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Scam Types", href: "/scams" },
  { label: "Warning Signs", href: "/warning-signs" },
  { label: "Get Help", href: "/help", active: true },
  { label: "Resources", href: "/resources" },
];

/**
 * Meta configuration for the MobileNav component stories
 */
const meta: Meta<typeof MobileNav> = {
  title: "Layout/MobileNav",
  component: MobileNav,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A slide-in navigation drawer for mobile devices. Features smooth animations, focus trap, backdrop overlay, and comprehensive keyboard support. Implements WCAG 2.1 AA accessibility guidelines.",
      },
    },
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: true },
          { id: "aria-dialog-name", enabled: true },
        ],
      },
    },
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Whether the drawer is currently open",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onClose: {
      action: "closed",
      description: "Callback function to close the drawer",
    },
    navItems: {
      control: "object",
      description: "Array of navigation items to display",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MobileNav>;

/* =============================================================================
   INTERACTIVE STORIES
   ============================================================================= */

/**
 * Interactive Demo
 *
 * A fully interactive demo with a button to open/close the drawer.
 * Click the hamburger menu button to open the navigation drawer.
 */
export const InteractiveDemo: Story = {
  render: function InteractiveDemoRender() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        {/* Mock Header */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Icon name="Shield" size="lg" aria-hidden />
            <span style={{ fontWeight: "bold" }}>ScamAware Jersey</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <Icon name="Menu" size="lg" aria-hidden />
          </Button>
        </header>

        {/* Page Content */}
        <main style={{ padding: "1rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Welcome to ScamAware Jersey
          </h1>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "1rem" }}>
            Click the hamburger menu button in the top right corner to open the
            navigation drawer. The drawer slides in from the right with a smooth
            animation.
          </p>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "1rem" }}>
            <strong>Try these interactions:</strong>
          </p>
          <ul style={{ color: "#666", lineHeight: "1.8", paddingLeft: "1.5rem" }}>
            <li>Click the X button to close the drawer</li>
            <li>Click the backdrop (dark overlay) to close</li>
            <li>Press the Escape key to close</li>
            <li>Use Tab to cycle through navigation items (focus trap)</li>
            <li>Click any navigation link to close the drawer</li>
          </ul>
        </main>

        {/* MobileNav Drawer */}
        <MobileNav
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          navItems={navItemsWithHomeActive}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "A fully interactive demo showing the mobile navigation drawer in action. Open the drawer using the hamburger menu and try various closing methods.",
      },
    },
  },
};

/* =============================================================================
   STATE STORIES
   ============================================================================= */

/**
 * Open State
 *
 * Shows the drawer in its open state.
 * Best viewed at mobile viewport sizes.
 */
export const Open: Story = {
  args: {
    isOpen: true,
    navItems: defaultNavItems,
  },
};

/**
 * Closed State
 *
 * Shows the drawer in its closed state (not visible).
 * The component renders the backdrop and drawer but they are hidden.
 */
export const Closed: Story = {
  args: {
    isOpen: false,
    navItems: defaultNavItems,
  },
};

/* =============================================================================
   ACTIVE PAGE STATES
   ============================================================================= */

/**
 * With Home Active
 *
 * Shows the drawer with the Home navigation item highlighted as the current page.
 */
export const WithHomeActive: Story = {
  args: {
    isOpen: true,
    navItems: navItemsWithHomeActive,
  },
};

/**
 * With Get Help Active
 *
 * Shows the drawer with the Get Help navigation item highlighted.
 * This is a key action page for users who may be scam victims.
 */
export const WithGetHelpActive: Story = {
  args: {
    isOpen: true,
    navItems: navItemsWithGetHelpActive,
  },
};

/**
 * Scam Types Active
 *
 * Shows the drawer with Scam Types as the active page.
 */
export const ScamTypesActive: Story = {
  args: {
    isOpen: true,
    navItems: [
      { label: "Home", href: "/" },
      { label: "Scam Types", href: "/scams", active: true },
      { label: "Warning Signs", href: "/warning-signs" },
      { label: "Get Help", href: "/help" },
      { label: "Resources", href: "/resources" },
    ],
  },
};

/* =============================================================================
   NAVIGATION VARIATIONS
   ============================================================================= */

/**
 * Minimal Navigation
 *
 * Shows the drawer with a minimal set of navigation items.
 */
export const MinimalNavigation: Story = {
  args: {
    isOpen: true,
    navItems: [
      { label: "Home", href: "/", active: true },
      { label: "Get Help", href: "/help" },
    ],
  },
};

/**
 * Extended Navigation
 *
 * Shows the drawer with an extended set of navigation items.
 * Demonstrates scrolling behavior when content exceeds viewport.
 */
export const ExtendedNavigation: Story = {
  args: {
    isOpen: true,
    navItems: [
      { label: "Home", href: "/", active: true },
      { label: "Scam Types", href: "/scams" },
      { label: "Warning Signs", href: "/warning-signs" },
      { label: "Get Help", href: "/help" },
      { label: "Resources", href: "/resources" },
      { label: "Report a Scam", href: "/report" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "About JFSC", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
};

/* =============================================================================
   VIEWPORT STORIES
   ============================================================================= */

/**
 * Mobile Small Viewport
 *
 * Shows the drawer on a small mobile viewport (320px).
 */
export const MobileSmallViewport: Story = {
  args: {
    isOpen: true,
    navItems: navItemsWithHomeActive,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Mobile Large Viewport
 *
 * Shows the drawer on a larger mobile viewport (414px).
 */
export const MobileLargeViewport: Story = {
  args: {
    isOpen: true,
    navItems: navItemsWithHomeActive,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
};

/**
 * Tablet Viewport
 *
 * Shows the drawer on a tablet viewport.
 * The drawer maintains its max-width of 85vw.
 */
export const TabletViewport: Story = {
  args: {
    isOpen: true,
    navItems: navItemsWithHomeActive,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

/* =============================================================================
   ACCESSIBILITY STORIES
   ============================================================================= */

/**
 * Keyboard Navigation Demo
 *
 * Demonstrates the keyboard navigation capabilities of the drawer.
 * - Tab: Move focus to next element
 * - Shift + Tab: Move focus to previous element
 * - Escape: Close the drawer
 * - Enter/Space: Activate focused element
 */
export const KeyboardNavigationDemo: Story = {
  render: function KeyboardDemoRender() {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <div style={{ padding: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Keyboard Navigation Demo
          </h2>
          <p style={{ color: "#666", marginBottom: "1rem" }}>
            The drawer is open. Try these keyboard shortcuts:
          </p>
          <ul style={{ color: "#666", lineHeight: "1.8", paddingLeft: "1.5rem" }}>
            <li><strong>Tab</strong>: Move focus to next element</li>
            <li><strong>Shift + Tab</strong>: Move focus to previous element</li>
            <li><strong>Escape</strong>: Close the drawer</li>
            <li><strong>Enter/Space</strong>: Activate focused element</li>
          </ul>
          {!isOpen && (
            <Button onClick={() => setIsOpen(true)} style={{ marginTop: "1rem" }}>
              Reopen Drawer
            </Button>
          )}
        </div>
        <MobileNav
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          navItems={navItemsWithHomeActive}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the keyboard navigation and focus trap functionality. Focus is trapped within the drawer while open, and pressing Escape closes it.",
      },
    },
  },
};

/**
 * Focus Trap Demo
 *
 * Demonstrates that focus is trapped within the drawer.
 * Tab cycles through all focusable elements without escaping.
 */
export const FocusTrapDemo: Story = {
  args: {
    isOpen: true,
    navItems: navItemsWithHomeActive,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Focus is trapped within the drawer when open. Use Tab to cycle through elements - focus will wrap from the last element back to the first.",
      },
    },
  },
};

/* =============================================================================
   ANIMATION STORIES
   ============================================================================= */

/**
 * Animation Preview
 *
 * Toggle the drawer to see the slide-in/slide-out animation.
 */
export const AnimationPreview: Story = {
  render: function AnimationPreviewRender() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <div style={{ padding: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Animation Preview
          </h2>
          <p style={{ color: "#666", marginBottom: "1rem" }}>
            Click the button to toggle the drawer and see the 300ms slide animation.
            The drawer slides in from the right while the backdrop fades in.
          </p>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Close Drawer" : "Open Drawer"}
          </Button>
        </div>
        <MobileNav
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          navItems={navItemsWithHomeActive}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Toggle the drawer to preview the slide-in animation. The animation respects prefers-reduced-motion for users who prefer minimal motion.",
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
 * Shows the drawer in a realistic full-page context with header and content.
 */
export const FullPageContext: Story = {
  render: function FullPageContextRender() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ minHeight: "150vh", backgroundColor: "#f5f5f5" }}>
        {/* Mock Header */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Icon name="Shield" size="lg" aria-hidden />
            <span style={{ fontWeight: "bold" }}>ScamAware Jersey</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
          >
            <Icon name="Menu" size="lg" aria-hidden />
          </Button>
        </header>

        {/* Page Content */}
        <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Protect Yourself from Scams
          </h1>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "1rem" }}>
            ScamAware Jersey helps you identify and protect yourself from common
            scams targeting Jersey residents. Open the navigation menu to explore
            our resources and get help.
          </p>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "1rem" }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident.
          </p>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "1rem" }}>
            Scroll down to see that the navigation drawer covers the full viewport
            height and prevents body scroll when open.
          </p>
        </main>

        {/* MobileNav Drawer */}
        <MobileNav
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          navItems={navItemsWithHomeActive}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "A realistic full-page context showing the mobile navigation in use with a header and scrollable content. The drawer prevents body scroll when open.",
      },
    },
  },
};

/**
 * With Header Integration
 *
 * Demonstrates how the MobileNav works with the Header component.
 */
export const WithHeaderIntegration: Story = {
  render: function HeaderIntegrationRender() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        {/* Using inline header to simulate Header component behavior */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 1rem",
              height: "64px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Icon name="Shield" size="lg" aria-hidden />
              <span style={{ fontWeight: "bold", fontSize: "1.125rem" }}>
                ScamAware Jersey
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <Icon name={isOpen ? "X" : "Menu"} size="lg" aria-hidden />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: "2rem", textAlign: "center" }}>
          <p style={{ color: "#666" }}>
            This demonstrates how MobileNav integrates with the Header component.
            The hamburger button toggles between Menu and X icons.
          </p>
        </main>

        {/* MobileNav Drawer */}
        <MobileNav
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          navItems={navItemsWithHomeActive}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows how the MobileNav component integrates with the Header component, with the hamburger button toggling between Menu and X icons.",
      },
    },
  },
};

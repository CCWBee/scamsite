/**
 * Layout Component Stories
 *
 * Storybook stories for the Layout component demonstrating:
 * - Default layout with header and footer
 * - Different max-width configurations
 * - Header/footer visibility options
 * - Skip link accessibility feature
 * - Responsive behavior
 *
 * The Layout component provides consistent page structure for ScamAware Jersey,
 * composing Header, Footer, and main content with proper accessibility features.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';

/**
 * Meta configuration for Layout component stories
 */
const meta: Meta<typeof Layout> = {
  title: 'Layout/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A composable layout component that provides consistent page structure with Header, Footer, skip link for accessibility, and responsive main content area. Supports multiple max-width configurations for different content types.',
      },
    },
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'landmark-unique', enabled: true },
          { id: 'bypass', enabled: true }, // Skip link check
        ],
      },
    },
  },
  argTypes: {
    showHeader: {
      control: 'boolean',
      description: 'Whether to show the header',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showFooter: {
      control: 'boolean',
      description: 'Whether to show the footer',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    maxWidth: {
      control: 'select',
      options: ['default', 'narrow', 'wide', 'full'],
      description: 'Maximum width of the main content area',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the main content area',
    },
    navItems: {
      control: 'object',
      description: 'Custom navigation items for the header',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

/* =============================================================================
   SAMPLE CONTENT COMPONENT
   ============================================================================= */

/**
 * Sample page content for demonstration
 */
const SampleContent = ({ title = 'Page Title' }: { title?: string }) => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-[var(--color-navy)]">{title}</h1>
    <p className="text-gray-600 leading-relaxed">
      This is sample page content demonstrating the Layout component. The layout
      provides consistent structure with a header, main content area, and footer.
      The skip link allows keyboard users to bypass navigation and jump directly
      to the main content.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-4 bg-gray-100 rounded-lg border border-gray-200"
        >
          <h3 className="font-semibold text-[var(--color-navy)] mb-2">
            Card {i}
          </h3>
          <p className="text-sm text-gray-600">
            Sample card content to demonstrate the grid layout within the main
            content area.
          </p>
        </div>
      ))}
    </div>
    <p className="text-gray-600 leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </div>
);

/**
 * Long content for scrolling demonstration
 */
const LongContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-[var(--color-navy)]">
      Long Page Content
    </h1>
    {Array.from({ length: 10 }, (_, i) => (
      <div key={i} className="space-y-2">
        <h2 className="text-xl font-semibold text-[var(--color-navy)]">
          Section {i + 1}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
    ))}
  </div>
);

/* =============================================================================
   DEFAULT STORIES
   ============================================================================= */

/**
 * Default Story
 *
 * Shows the standard layout with header, footer, and default max-width.
 * This is the typical layout for most pages on ScamAware Jersey.
 */
export const Default: Story = {
  args: {
    children: <SampleContent />,
  },
};

/* =============================================================================
   MAX-WIDTH VARIATIONS
   ============================================================================= */

/**
 * Default Width (1200px)
 *
 * Standard content width for most pages.
 */
export const DefaultWidth: Story = {
  args: {
    maxWidth: 'default',
    children: (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[var(--color-navy)]">
          Default Width (1200px)
        </h1>
        <div className="bg-[var(--color-trust-blue)] bg-opacity-10 p-4 rounded-lg border-2 border-dashed border-[var(--color-trust-blue)]">
          <p className="text-center text-[var(--color-navy)]">
            Content container - max-width: 1200px
          </p>
        </div>
        <p className="text-gray-600">
          This is the standard width for most content pages, providing a
          comfortable reading width while utilizing screen space effectively.
        </p>
      </div>
    ),
  },
};

/**
 * Narrow Width (800px)
 *
 * Narrower content width optimized for reading-focused pages like articles.
 */
export const NarrowWidth: Story = {
  args: {
    maxWidth: 'narrow',
    children: (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[var(--color-navy)]">
          Narrow Width (800px)
        </h1>
        <div className="bg-[var(--color-safe-green)] bg-opacity-10 p-4 rounded-lg border-2 border-dashed border-[var(--color-safe-green)]">
          <p className="text-center text-[var(--color-navy)]">
            Content container - max-width: 800px
          </p>
        </div>
        <article className="prose text-gray-600 leading-relaxed">
          <p>
            This narrower width is ideal for long-form reading content like
            articles, blog posts, or detailed guides. The reduced width improves
            readability by keeping line lengths comfortable for extended
            reading.
          </p>
          <p>
            Studies show that optimal line length for reading is between 50-75
            characters per line. The narrow width helps achieve this while
            maintaining visual balance on larger screens.
          </p>
        </article>
      </div>
    ),
  },
};

/**
 * Wide Width (1400px)
 *
 * Wider content width for data-heavy pages or dashboards.
 */
export const WideWidth: Story = {
  args: {
    maxWidth: 'wide',
    children: (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[var(--color-navy)]">
          Wide Width (1400px)
        </h1>
        <div className="bg-[var(--color-alert-red)] bg-opacity-10 p-4 rounded-lg border-2 border-dashed border-[var(--color-alert-red)]">
          <p className="text-center text-[var(--color-navy)]">
            Content container - max-width: 1400px
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Data Card 1', 'Data Card 2', 'Data Card 3', 'Data Card 4'].map(
            (title) => (
              <div key={title} className="p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold text-[var(--color-navy)]">
                  {title}
                </h3>
                <p className="text-2xl font-bold text-[var(--color-trust-blue)]">
                  123
                </p>
              </div>
            )
          )}
        </div>
        <p className="text-gray-600">
          This wider layout is useful for pages with lots of data, tables, or
          multi-column layouts that benefit from additional horizontal space.
        </p>
      </div>
    ),
  },
};

/**
 * Full Width (100%)
 *
 * Full-width layout for full-bleed content like hero sections.
 */
export const FullWidth: Story = {
  args: {
    maxWidth: 'full',
    className: 'px-0',
    children: (
      <div className="space-y-0">
        {/* Full-bleed hero */}
        <div className="bg-[var(--color-navy)] text-white py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Full Width Layout</h1>
          <p className="text-xl opacity-80">
            Content spans the full width of the viewport
          </p>
        </div>
        {/* Contained content section */}
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <p className="text-gray-600">
            Full-width layouts are useful for landing pages, hero sections, or
            any content that should span edge-to-edge. You can mix full-bleed
            sections with contained content as shown here.
          </p>
        </div>
      </div>
    ),
  },
};

/* =============================================================================
   VISIBILITY OPTIONS
   ============================================================================= */

/**
 * Header Only
 *
 * Layout with header visible but no footer.
 * Useful for app-like experiences or wizard flows.
 */
export const HeaderOnly: Story = {
  args: {
    showHeader: true,
    showFooter: false,
    children: <SampleContent title="Header Only Layout" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Layout with only the header visible. Useful for app-like experiences, multi-step forms, or wizard flows where footer navigation is not needed.',
      },
    },
  },
};

/**
 * Footer Only
 *
 * Layout with footer visible but no header.
 * Useful for embedded content or minimal pages.
 */
export const FooterOnly: Story = {
  args: {
    showHeader: false,
    showFooter: true,
    children: <SampleContent title="Footer Only Layout" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Layout with only the footer visible. This might be used for embedded content, print-friendly pages, or special landing pages.',
      },
    },
  },
};

/**
 * No Header or Footer
 *
 * Minimal layout with only the main content area.
 * Useful for focused experiences like kiosk mode.
 */
export const NoHeaderOrFooter: Story = {
  args: {
    showHeader: false,
    showFooter: false,
    children: <SampleContent title="Minimal Layout (No Header/Footer)" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal layout with neither header nor footer. Useful for focused experiences, embedded widgets, or kiosk mode displays.',
      },
    },
  },
};

/* =============================================================================
   ACCESSIBILITY FEATURES
   ============================================================================= */

/**
 * Skip Link Demonstration
 *
 * Demonstrates the skip link accessibility feature.
 * Press Tab on page load to see the skip link become visible.
 */
export const SkipLinkDemo: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[var(--color-navy)]">
          Skip Link Accessibility
        </h1>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            <strong>Try it:</strong> Click anywhere on this page, then press the{' '}
            <kbd className="px-2 py-1 bg-blue-100 rounded text-sm">Tab</kbd> key.
            The &quot;Skip to main content&quot; link will appear in the top-left corner.
          </p>
        </div>
        <p className="text-gray-600">
          The skip link is a critical accessibility feature that allows keyboard
          and screen reader users to bypass repetitive navigation and jump
          directly to the main content. It is visually hidden by default but
          becomes visible when focused.
        </p>
        <p className="text-gray-600" id="main-content-target">
          This is the main content area that the skip link targets. When a user
          activates the skip link, focus moves here, saving them from having to
          tab through all navigation items.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the skip link feature. Press Tab to see the skip link appear. This is essential for keyboard accessibility, allowing users to bypass navigation.',
      },
    },
  },
};

/* =============================================================================
   RESPONSIVE BEHAVIOR
   ============================================================================= */

/**
 * Mobile View
 *
 * Shows the layout at mobile viewport size.
 */
export const MobileView: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'Layout at mobile viewport size. The header shows the hamburger menu, and content adjusts to narrower width with appropriate padding.',
      },
    },
  },
};

/**
 * Tablet View
 *
 * Shows the layout at tablet viewport size.
 */
export const TabletView: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

/**
 * Desktop View
 *
 * Shows the layout at desktop viewport size.
 */
export const DesktopView: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

/* =============================================================================
   REAL-WORLD USAGE
   ============================================================================= */

/**
 * Full Page with Scrolling
 *
 * Demonstrates the layout with long scrollable content.
 * Shows sticky header and footer at bottom behavior.
 */
export const FullPageWithScrolling: Story = {
  args: {
    children: <LongContent />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Full page layout with scrollable content. The header remains sticky at the top, and the footer stays at the bottom of the page (after content, not fixed).',
      },
    },
  },
};

/**
 * Custom Navigation Items
 *
 * Layout with custom navigation items passed to the header.
 */
export const CustomNavigationItems: Story = {
  args: {
    navItems: [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    children: <SampleContent title="Custom Navigation" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Layout with custom navigation items. You can pass a custom navItems array to override the default navigation in the header.',
      },
    },
  },
};

/**
 * Article Page Layout
 *
 * Example of a typical article/blog page using narrow width.
 */
export const ArticlePageLayout: Story = {
  args: {
    maxWidth: 'narrow',
    navItems: [
      { label: 'Home', href: '/' },
      { label: 'Scam Types', href: '/scams', active: true },
      { label: 'Warning Signs', href: '/warning-signs' },
      { label: 'Get Help', href: '/help' },
      { label: 'Resources', href: '/resources' },
    ],
    children: (
      <article className="space-y-6">
        <header className="space-y-4 border-b border-gray-200 pb-6">
          <span className="text-sm text-[var(--color-trust-blue)] font-medium">
            Scam Types
          </span>
          <h1 className="text-4xl font-bold text-[var(--color-navy)]">
            How to Recognize Phishing Emails
          </h1>
          <p className="text-lg text-gray-600">
            Learn the telltale signs of phishing attempts and how to protect
            yourself from email-based scams.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Updated: January 2025</span>
            <span>|</span>
            <span>5 min read</span>
          </div>
        </header>
        <div className="prose prose-lg text-gray-600 leading-relaxed space-y-4">
          <p>
            Phishing emails are designed to trick you into revealing personal
            information or clicking malicious links. They often impersonate
            trusted organizations like banks, government agencies, or well-known
            companies.
          </p>
          <h2 className="text-2xl font-bold text-[var(--color-navy)] pt-4">
            Warning Signs to Look For
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Urgent language demanding immediate action</li>
            <li>Generic greetings instead of your name</li>
            <li>Suspicious sender email addresses</li>
            <li>Spelling and grammar mistakes</li>
            <li>Requests for personal or financial information</li>
          </ul>
          <p>
            If you receive a suspicious email, do not click any links or
            download attachments. Instead, contact the organization directly
            using official contact information from their website.
          </p>
        </div>
      </article>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example of a typical article page using the narrow max-width for optimal readability. This layout is ideal for blog posts, guides, and educational content.',
      },
    },
  },
};

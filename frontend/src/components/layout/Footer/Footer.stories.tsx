/**
 * Footer Component Stories
 *
 * Storybook stories for the Footer component demonstrating various
 * viewport sizes and configurations.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Footer component provides the main site footer for ScamAware Jersey.

## Features
- **Brand Section**: Logo, tagline, and partner logos
- **Quick Links**: Navigation to main site pages
- **External Resources**: Links to official Jersey services (with external link indicators)
- **Contact Information**: Phone numbers and email for reporting scams
- **Emergency Notice**: Prominent 999 emergency reminder
- **Legal Links**: Privacy policy, disclaimer, and accessibility links

## Accessibility
- Semantic \`<footer>\` element with \`role="contentinfo"\`
- External links include \`rel="noopener noreferrer"\` and visual indicator
- Proper navigation landmarks with \`aria-label\`
- Phone links use \`tel:\` protocol
- Email links use \`mailto:\` protocol

## Responsive Behavior
- **Mobile**: Single column, stacked sections
- **Tablet**: Two column layout
- **Desktop**: Three column layout
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

/**
 * Default footer display
 */
export const Default: Story = {
  args: {},
};

/**
 * Footer with custom className
 */
export const WithCustomClass: Story = {
  args: {
    className: 'mt-8',
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with additional margin-top for spacing from page content.',
      },
    },
  },
};

/**
 * Mobile viewport
 */
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Footer on mobile devices (320px width). Sections stack vertically.',
      },
    },
  },
};

/**
 * Tablet viewport
 */
export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Footer on tablet devices (768px width). Two-column layout.',
      },
    },
  },
};

/**
 * Desktop viewport
 */
export const Desktop: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Footer on desktop (1024px width). Full three-column layout.',
      },
    },
  },
};

/**
 * Wide desktop viewport
 */
export const WideDesktop: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'large',
    },
    docs: {
      description: {
        story: 'Footer on wide desktop (1440px width). Content is constrained to max-width.',
      },
    },
  },
};

/**
 * Footer in context with page content
 */
export const InPageContext: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      {/* Simulated page content */}
      <main className="flex-1 bg-gray-100 p-8">
        <div className="mx-auto max-w-content">
          <h1 className="text-3xl font-bold text-navy mb-4">Page Content</h1>
          <p className="text-gray-600 mb-4">
            This demonstrates the footer in context with page content above it.
            The footer should appear at the bottom of the viewport when content
            is short, or after the content when content is long.
          </p>
          <div className="h-64 bg-white rounded-lg shadow-card flex items-center justify-center">
            <span className="text-gray-400">Content Area</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer displayed in context with page content, demonstrating typical usage.',
      },
    },
  },
};

/**
 * Dark mode appearance (always dark by design)
 */
export const DarkAppearance: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="bg-white p-8">
        <div className="text-navy text-center mb-8">
          <p className="text-sm">
            The footer maintains its dark navy appearance regardless of page theme,
            providing consistent brand identity.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Footer with light content above, showing contrast and visual separation.',
      },
    },
  },
};

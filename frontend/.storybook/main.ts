/**
 * Storybook Main Configuration
 *
 * This file configures Storybook for the ScamAware Jersey frontend.
 * It uses @storybook/nextjs for optimal Next.js App Router integration.
 *
 * Key features:
 * - Next.js framework support with App Router compatibility
 * - TypeScript support via automatic detection
 * - Accessibility testing via @storybook/addon-a11y
 * - Stories located in src/components directory
 */

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  // Define where to find story files
  // This pattern matches all .stories.tsx files within src/components
  // and all .mdx documentation files within src/components/docs
  stories: [
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/docs/**/*.mdx",
  ],

  // Storybook addons configuration
  // Note: In Storybook 10, many previously separate addons are now built-in
  addons: [
    // Accessibility testing addon - helps identify a11y issues in components
    // Adds an "Accessibility" tab in the addon panel showing WCAG violations
    "@storybook/addon-a11y",
  ],

  // Use @storybook/nextjs for Next.js App Router support
  // This ensures proper handling of:
  // - next/image optimization
  // - next/font loading
  // - next/link navigation
  // - App Router layouts and routing context
  framework: {
    name: "@storybook/nextjs",
    options: {
      // Enable Next.js App Router support (default in Next.js 13.4+)
      // This ensures proper handling of server components and client components
    },
  },

  // TypeScript configuration
  // Storybook 10 has improved TypeScript support out of the box
  typescript: {
    // Enable type checking for stories
    check: false,
    // Use react-docgen for prop extraction
    reactDocgen: "react-docgen-typescript",
  },

  // Static directories - files here are served at the root
  staticDirs: ["../public"],

  // Documentation mode configuration
  docs: {
    // Automatically generate documentation from stories
    autodocs: "tag",
  },
};

export default config;

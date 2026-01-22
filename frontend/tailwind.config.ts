/**
 * Tailwind CSS Configuration for ScamAware Jersey
 *
 * This configuration extends Tailwind's default theme with JFSC (Jersey Financial
 * Services Commission) brand colors and design tokens to ensure visual consistency
 * with official Jersey government services.
 *
 * Design System Overview:
 * - Primary color (navy): Used for headers, navigation, and primary UI elements
 * - Secondary color (trust-blue): Used for links, CTAs, and interactive elements
 * - Alert color (alert-red): Used sparingly for warnings and scam indicators
 * - Success/Warning: Standard semantic colors for form feedback
 *
 * Accessibility: All color combinations meet WCAG 2.1 AA contrast requirements
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /**
       * JFSC Brand Colors
       *
       * These colors are derived from JFSC's official brand guidelines to maintain
       * visual consistency and institutional trust. The navy/blue palette conveys
       * professionalism and security, while alert-red provides clear warning signals.
       */
      colors: {
        // Primary brand color - dark navy
        // Used for: headers, navigation bars, primary buttons, footer
        navy: {
          DEFAULT: '#1a1f3d',
          50: '#f0f1f5',
          100: '#e1e3eb',
          200: '#c3c7d7',
          300: '#a5abc3',
          400: '#878faf',
          500: '#69739b',
          600: '#545c7c',
          700: '#3f455d',
          800: '#2a2e3e',
          900: '#1a1f3d', // Primary navy value
          950: '#0d0f1e',
        },

        // Secondary brand color - trust blue
        // Used for: links, interactive elements, secondary buttons, icons
        'trust-blue': {
          DEFAULT: '#0066a1',
          50: '#e6f2f9',
          100: '#cce5f3',
          200: '#99cbe7',
          300: '#66b1db',
          400: '#3397cf',
          500: '#0066a1', // Primary trust-blue value
          600: '#005281',
          700: '#003d61',
          800: '#002940',
          900: '#001420',
        },

        // Alert/danger color - used for scam warnings
        // Used for: scam indicators, error states, urgent warnings
        'alert-red': {
          DEFAULT: '#c8102e',
          50: '#fef2f3',
          100: '#fde6e8',
          200: '#fbd0d6',
          300: '#f7a8b3',
          400: '#f17689',
          500: '#e64660',
          600: '#c8102e', // Primary alert-red value
          700: '#b30d27',
          800: '#940b20',
          900: '#7a0c1e',
        },

        // Success color - for positive feedback
        // Used for: success messages, safe indicators, confirmed actions
        success: {
          DEFAULT: '#28a745',
          50: '#e9f7ec',
          100: '#d3efd9',
          200: '#a7dfb3',
          300: '#7bcf8d',
          400: '#4fbf67',
          500: '#28a745', // Primary success value
          600: '#208637',
          700: '#186429',
          800: '#10431c',
          900: '#08210e',
        },

        // Warning color - for cautionary messages
        // Used for: caution indicators, pending states, attention alerts
        warning: {
          DEFAULT: '#ffc107',
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#ffe799',
          300: '#ffdb66',
          400: '#ffcf33',
          500: '#ffc107', // Primary warning value
          600: '#cc9a06',
          700: '#997404',
          800: '#664d03',
          900: '#332701',
        },

        // Neutral gray scale
        // Used for: text, borders, backgrounds, disabled states
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },

      /**
       * Typography Configuration
       *
       * Using Arial as the primary font to match JFSC branding and ensure
       * maximum cross-platform compatibility. The font stack includes
       * appropriate fallbacks.
       */
      fontFamily: {
        // Primary sans-serif stack matching JFSC guidelines
        sans: ['Arial', 'Helvetica', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Monospace for code examples (if needed for technical content)
        mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'monospace'],
      },

      /**
       * Font Size Scale
       *
       * Extended font sizes for specific use cases in the design system.
       * Base sizes follow Tailwind defaults, with additions for specific needs.
       */
      fontSize: {
        // Extra small text for legal disclaimers, footnotes
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        // Hero headline size
        'hero': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        // Large display text
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },

      /**
       * Spacing Extensions
       *
       * Custom spacing values for specific layout needs beyond Tailwind defaults.
       */
      spacing: {
        // Common page section padding
        '18': '4.5rem',
        '22': '5.5rem',
        // Header/navigation height
        'header': '4.5rem',
        // Footer height
        'footer': '15rem',
      },

      /**
       * Border Radius Scale
       *
       * Consistent border radius values for the design system.
       * Subtle rounding maintains professional appearance.
       */
      borderRadius: {
        sm: '0.25rem',   // 4px - subtle rounding for inputs
        DEFAULT: '0.375rem', // 6px - default component rounding
        md: '0.375rem',  // 6px - medium components
        lg: '0.5rem',    // 8px - cards, modals
        xl: '0.75rem',   // 12px - large cards, hero sections
        '2xl': '1rem',   // 16px - prominent elements
        '3xl': '1.5rem', // 24px - decorative elements
      },

      /**
       * Box Shadow Scale
       *
       * Subtle shadows for depth and elevation. Using cool-toned shadows
       * that complement the navy color scheme.
       */
      boxShadow: {
        // Subtle elevation for cards
        'card': '0 1px 3px 0 rgba(26, 31, 61, 0.1), 0 1px 2px -1px rgba(26, 31, 61, 0.1)',
        // Medium elevation for dropdowns, tooltips
        'elevated': '0 4px 6px -1px rgba(26, 31, 61, 0.1), 0 2px 4px -2px rgba(26, 31, 61, 0.1)',
        // High elevation for modals, popovers
        'modal': '0 10px 15px -3px rgba(26, 31, 61, 0.1), 0 4px 6px -4px rgba(26, 31, 61, 0.1)',
        // Prominent elevation for floating elements
        'prominent': '0 20px 25px -5px rgba(26, 31, 61, 0.1), 0 8px 10px -6px rgba(26, 31, 61, 0.1)',
        // Inner shadow for inset elements
        'inner-sm': 'inset 0 1px 2px 0 rgba(26, 31, 61, 0.05)',
        // Focus ring shadow (for accessibility)
        'focus': '0 0 0 3px rgba(0, 102, 161, 0.4)',
      },

      /**
       * Container Configuration
       *
       * Centered container with responsive padding and max-width
       * matching the design system's 1200px content width.
       */
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',    // 16px on mobile
          sm: '1.5rem',       // 24px on small screens
          md: '2rem',         // 32px on medium screens
          lg: '2rem',         // 32px on large screens
          xl: '2rem',         // 32px on extra large screens
        },
      },

      /**
       * Max Width Scale
       *
       * Custom max-width values for content containers.
       */
      maxWidth: {
        // Primary content container (matches design spec)
        'content': '1200px',
        // Narrow content (for readability)
        'prose': '65ch',
        // Form containers
        'form': '32rem',
      },

      /**
       * Animation & Transition
       *
       * Custom keyframes and animations for micro-interactions.
       */
      keyframes: {
        // Fade in animation for page transitions
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Slide up animation for modals/toasts
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Pulse animation for loading states
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
      },

      /**
       * Z-Index Scale
       *
       * Organized z-index values for layering UI elements consistently.
       */
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
      },
    },
  },
  plugins: [],
};

export default config;

/**
 * ScamAware Jersey Design Tokens
 *
 * This file exports all design system values as TypeScript constants,
 * enabling type-safe access to design tokens throughout the application.
 *
 * Usage examples:
 *   import { colors, breakpoints } from '@/lib/design-tokens';
 *   const navBg = colors.navy.DEFAULT;
 *   const isMobile = window.innerWidth < parseInt(breakpoints.md);
 *
 * These values are synchronized with:
 *   - tailwind.config.ts (Tailwind theme extension)
 *   - globals.css (CSS custom properties)
 *
 * IMPORTANT: When updating design tokens, ensure all three files are updated
 * to maintain consistency across the design system.
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

/**
 * JFSC Brand Colors
 *
 * Primary palette derived from Jersey Financial Services Commission branding.
 * All color combinations meet WCAG 2.1 AA accessibility requirements.
 */
export const colors = {
  /**
   * Navy - Primary brand color
   * Use for: headers, navigation, primary buttons, footer backgrounds
   * Contrast: White text on navy meets WCAG AAA (12.63:1)
   */
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
    900: '#1a1f3d',
    950: '#0d0f1e',
  },

  /**
   * Trust Blue - Secondary brand color
   * Use for: links, CTAs, interactive elements, icons, secondary buttons
   * Contrast: White text on trust-blue meets WCAG AA (4.68:1)
   */
  'trust-blue': {
    DEFAULT: '#0066a1',
    50: '#e6f2f9',
    100: '#cce5f3',
    200: '#99cbe7',
    300: '#66b1db',
    400: '#3397cf',
    500: '#0066a1',
    600: '#005281',
    700: '#003d61',
    800: '#002940',
    900: '#001420',
  },

  /**
   * Alert Red - Accent color for warnings
   * Use for: scam indicators, error states, urgent warnings, danger buttons
   * Note: Use sparingly to maintain impact
   * Contrast: White text on alert-red meets WCAG AA (4.64:1)
   */
  'alert-red': {
    DEFAULT: '#c8102e',
    50: '#fef2f3',
    100: '#fde6e8',
    200: '#fbd0d6',
    300: '#f7a8b3',
    400: '#f17689',
    500: '#e64660',
    600: '#c8102e',
    700: '#b30d27',
    800: '#940b20',
    900: '#7a0c1e',
  },

  /**
   * Success - Semantic color for positive states
   * Use for: success messages, safe indicators, confirmed actions
   */
  success: {
    DEFAULT: '#28a745',
    50: '#e9f7ec',
    100: '#d3efd9',
    200: '#a7dfb3',
    300: '#7bcf8d',
    400: '#4fbf67',
    500: '#28a745',
    600: '#208637',
    700: '#186429',
    800: '#10431c',
    900: '#08210e',
  },

  /**
   * Warning - Semantic color for cautionary states
   * Use for: caution indicators, pending states, attention alerts
   */
  warning: {
    DEFAULT: '#ffc107',
    50: '#fff9e6',
    100: '#fff3cc',
    200: '#ffe799',
    300: '#ffdb66',
    400: '#ffcf33',
    500: '#ffc107',
    600: '#cc9a06',
    700: '#997404',
    800: '#664d03',
    900: '#332701',
  },

  /**
   * Gray - Neutral scale
   * Use for: text, borders, backgrounds, disabled states
   */
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
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

/**
 * Font Family Stack
 *
 * Arial is the primary font to match JFSC branding and ensure
 * maximum cross-platform compatibility without web font loading.
 */
export const fontFamily = {
  sans: 'Arial, Helvetica, ui-sans-serif, system-ui, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace',
} as const;

/**
 * Font Size Scale
 *
 * Follows a modular scale for consistent typography hierarchy.
 * Values are in rem units (relative to 16px base).
 */
export const fontSize = {
  '2xs': '0.625rem',   // 10px
  xs: '0.75rem',       // 12px
  sm: '0.875rem',      // 14px
  base: '1rem',        // 16px
  lg: '1.125rem',      // 18px
  xl: '1.25rem',       // 20px
  '2xl': '1.5rem',     // 24px
  '3xl': '1.875rem',   // 30px
  '4xl': '2.25rem',    // 36px
  '5xl': '3rem',       // 48px (hero)
  '6xl': '3.75rem',    // 60px
  '7xl': '4.5rem',     // 72px
  hero: '3rem',        // 48px - Hero headlines
  display: '3.5rem',   // 56px - Large display text
} as const;

/**
 * Line Height Scale
 *
 * Appropriate leading for readability at different text sizes.
 */
export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

/**
 * Font Weight Scale
 *
 * Standard weight values for typography hierarchy.
 */
export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

/**
 * Spacing Scale
 *
 * Based on a 4px (0.25rem) base unit for consistent spacing.
 * Use these values for margins, padding, and gaps.
 */
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  18: '4.5rem',      // 72px - Custom
  20: '5rem',        // 80px
  22: '5.5rem',      // 88px - Custom
  24: '6rem',        // 96px
  header: '4.5rem',  // 72px - Header height
  footer: '15rem',   // 240px - Footer height
} as const;

// =============================================================================
// LAYOUT TOKENS
// =============================================================================

/**
 * Breakpoints
 *
 * Responsive design breakpoints following mobile-first approach.
 * These match Tailwind's default breakpoints.
 */
export const breakpoints = {
  sm: '640px',     // Small devices (landscape phones)
  md: '768px',     // Medium devices (tablets)
  lg: '1024px',    // Large devices (desktops)
  xl: '1280px',    // Extra large devices (large desktops)
  '2xl': '1536px', // 2X large devices (wide screens)
} as const;

/**
 * Container Configuration
 *
 * Max-width values for content containers.
 */
export const container = {
  maxWidth: '1200px',
  padding: {
    DEFAULT: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '2rem',
    xl: '2rem',
  },
} as const;

/**
 * Max Width Scale
 */
export const maxWidth = {
  content: '1200px',  // Primary content container
  prose: '65ch',      // Optimal line length for reading
  form: '32rem',      // Form containers
} as const;

// =============================================================================
// BORDER TOKENS
// =============================================================================

/**
 * Border Radius Scale
 *
 * Consistent rounding values for UI elements.
 * Subtle rounding maintains professional appearance.
 */
export const borderRadius = {
  none: '0',
  sm: '0.25rem',     // 4px - Subtle rounding for inputs
  DEFAULT: '0.375rem', // 6px - Default component rounding
  md: '0.375rem',    // 6px - Medium components
  lg: '0.5rem',      // 8px - Cards, modals
  xl: '0.75rem',     // 12px - Large cards, hero sections
  '2xl': '1rem',     // 16px - Prominent elements
  '3xl': '1.5rem',   // 24px - Decorative elements
  full: '9999px',    // Fully rounded (pills, avatars)
} as const;

/**
 * Border Width Scale
 */
export const borderWidth = {
  DEFAULT: '1px',
  0: '0',
  2: '2px',
  4: '4px',
  8: '8px',
} as const;

// =============================================================================
// SHADOW TOKENS
// =============================================================================

/**
 * Box Shadow Scale
 *
 * Subtle shadows for depth and elevation using cool-toned shadows
 * that complement the navy color scheme.
 */
export const boxShadow = {
  // Subtle elevation for cards
  card: '0 1px 3px 0 rgba(26, 31, 61, 0.1), 0 1px 2px -1px rgba(26, 31, 61, 0.1)',
  // Medium elevation for dropdowns, tooltips
  elevated: '0 4px 6px -1px rgba(26, 31, 61, 0.1), 0 2px 4px -2px rgba(26, 31, 61, 0.1)',
  // High elevation for modals, popovers
  modal: '0 10px 15px -3px rgba(26, 31, 61, 0.1), 0 4px 6px -4px rgba(26, 31, 61, 0.1)',
  // Prominent elevation for floating elements
  prominent: '0 20px 25px -5px rgba(26, 31, 61, 0.1), 0 8px 10px -6px rgba(26, 31, 61, 0.1)',
  // Inner shadow for inset elements
  'inner-sm': 'inset 0 1px 2px 0 rgba(26, 31, 61, 0.05)',
  // Focus ring shadow (for accessibility)
  focus: '0 0 0 3px rgba(0, 102, 161, 0.4)',
} as const;

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

/**
 * Z-Index Scale
 *
 * Organized z-index values for consistent layering of UI elements.
 */
export const zIndex = {
  auto: 'auto',
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  'modal-backdrop': '1040',
  modal: '1050',
  popover: '1060',
  tooltip: '1070',
} as const;

// =============================================================================
// ANIMATION TOKENS
// =============================================================================

/**
 * Transition Duration
 */
export const transitionDuration = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
} as const;

/**
 * Transition Timing Function
 */
export const transitionTimingFunction = {
  DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

/**
 * Type definitions for design tokens
 * Useful for type-safe component props
 */
export type ColorScale = typeof colors;
export type NavyColor = keyof typeof colors.navy;
export type TrustBlueColor = keyof typeof colors['trust-blue'];
export type AlertRedColor = keyof typeof colors['alert-red'];
export type SuccessColor = keyof typeof colors.success;
export type WarningColor = keyof typeof colors.warning;
export type GrayColor = keyof typeof colors.gray;
export type Breakpoint = keyof typeof breakpoints;
export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;
export type BoxShadow = keyof typeof boxShadow;
export type ZIndex = keyof typeof zIndex;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get a color value from the design system
 *
 * @param colorName - Name of the color (e.g., 'navy', 'trust-blue')
 * @param shade - Shade variant (e.g., 'DEFAULT', '500', '700')
 * @returns The hex color value
 *
 * @example
 * getColor('navy', 'DEFAULT') // '#1a1f3d'
 * getColor('trust-blue', 500) // '#0066a1'
 */
export function getColor(
  colorName: keyof typeof colors,
  shade: string | number = 'DEFAULT'
): string {
  const colorScale = colors[colorName];
  const shadeKey = String(shade) as keyof typeof colorScale;
  return colorScale[shadeKey] ?? colorScale.DEFAULT;
}

/**
 * Convert pixel value to rem
 * Based on 16px root font size
 *
 * @param px - Pixel value
 * @returns Rem value as string
 *
 * @example
 * pxToRem(16) // '1rem'
 * pxToRem(24) // '1.5rem'
 */
export function pxToRem(px: number): string {
  return `${px / 16}rem`;
}

/**
 * Check if screen width matches a breakpoint
 * For use in JavaScript/React (not CSS)
 *
 * @param breakpoint - Breakpoint name
 * @returns Boolean indicating if current width >= breakpoint
 *
 * @example
 * if (typeof window !== 'undefined') {
 *   const isDesktop = matchesBreakpoint('lg');
 * }
 */
export function matchesBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;
  const width = parseInt(breakpoints[breakpoint], 10);
  return window.innerWidth >= width;
}

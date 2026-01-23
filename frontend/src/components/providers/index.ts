/**
 * Provider Components - Barrel Export
 *
 * This module exports all context providers and their associated hooks
 * for the ScamAware Jersey application.
 *
 * ## Available Providers
 *
 * ### ThemeProvider
 * Manages theme state (light/dark/system) for the application.
 * - MVP: Light mode only
 * - Future: Will support dark mode and system preference
 *
 * ## Usage
 *
 * ```tsx
 * // Import provider for app layout
 * import { ThemeProvider } from '@/components/providers';
 *
 * // Import hook for components
 * import { useTheme } from '@/components/providers';
 * ```
 *
 * ## Adding New Providers
 *
 * When adding new providers to this directory:
 * 1. Create ProviderName.tsx with the context and provider component
 * 2. Create useProviderName.ts with the hook
 * 3. Export both from this index.ts file
 *
 * Example for a future AuthProvider:
 * ```ts
 * export { AuthProvider, type AuthContextValue } from './AuthProvider';
 * export { useAuth } from './useAuth';
 * ```
 */

// Theme Provider exports
export {
  ThemeProvider,
  ThemeContext,
  themeInitScript,
  type Theme,
  type ResolvedTheme,
  type ThemeContextValue,
  type ThemeProviderProps,
} from './ThemeProvider';

export { useTheme } from './useTheme';

// AI Disclaimer Provider exports (re-exported from disclaimers for convenience)
export {
  AIDisclaimerProvider,
  useAIDisclaimer,
  type AIDisclaimerProviderProps,
} from '@/components/disclaimers';

'use client';

/**
 * useTheme Hook - Access theme state and controls
 *
 * This hook provides access to the theme context for any component
 * that needs to read or modify the current theme.
 *
 * ## Usage
 *
 * ```tsx
 * import { useTheme } from '@/components/providers';
 *
 * function MyComponent() {
 *   const { theme, setTheme, resolvedTheme } = useTheme();
 *
 *   // Read the current theme setting
 *   console.log(theme); // 'light' | 'dark' | 'system'
 *
 *   // Read the actual applied theme
 *   console.log(resolvedTheme); // 'light' | 'dark'
 *
 *   // Change the theme
 *   const toggleTheme = () => {
 *     setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
 *   };
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current: {resolvedTheme}
 *     </button>
 *   );
 * }
 * ```
 *
 * ## Important Notes
 *
 * 1. This hook must be used within a ThemeProvider
 * 2. For MVP, resolvedTheme will always be 'light'
 * 3. The hook will throw an error if used outside of ThemeProvider
 *
 * ## Future Dark Mode Implementation
 *
 * When dark mode is enabled, components can use this hook to:
 * - Display the current theme in settings
 * - Provide a theme toggle button
 * - Conditionally render theme-specific content
 * - Apply theme-specific logic (e.g., different chart colors)
 */

import { useContext } from 'react';
import { ThemeContext, type ThemeContextValue } from './ThemeProvider';

/**
 * Hook to access theme context
 *
 * @returns ThemeContextValue containing theme, setTheme, and resolvedTheme
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { resolvedTheme, setTheme } = useTheme();
 *
 *   return (
 *     <button
 *       onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
 *       aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
 *     >
 *       {resolvedTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
        'Ensure your component is wrapped in <ThemeProvider>.'
    );
  }

  return context;
}

export default useTheme;

'use client';

/**
 * ThemeProvider - Context provider for theme management
 *
 * This provider establishes the foundation for theming in the ScamAware Jersey application.
 * While the MVP is light mode only, this architecture supports future dark mode implementation.
 *
 * ## Architecture Overview
 *
 * The theme system follows a three-tier approach:
 * 1. User preference (stored in localStorage)
 * 2. System preference (via prefers-color-scheme media query)
 * 3. Default fallback (light mode)
 *
 * ## Theme Values
 * - 'light': Force light mode
 * - 'dark': Force dark mode (disabled in MVP)
 * - 'system': Follow OS/browser preference
 *
 * ## How it works
 * - On mount, the provider reads the stored theme preference from localStorage
 * - If 'system' is selected, it listens to the prefers-color-scheme media query
 * - The resolved theme ('light' or 'dark') is set as a data attribute on the document
 * - CSS variables in globals.css respond to [data-theme="dark"] selector
 *
 * ## Future Dark Mode Implementation
 * To enable dark mode:
 * 1. Remove the MVP_LIGHT_MODE_ONLY flag check
 * 2. Ensure all [data-theme="dark"] CSS variables are defined in globals.css
 * 3. Test all components for proper dark mode styling
 * 4. Add theme toggle UI component
 *
 * ## Preventing Flash of Wrong Theme
 * The inline script in layout.tsx sets the theme before React hydration,
 * preventing the flash of wrong theme (FOWT) issue.
 */

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

// =============================================================================
// Types
// =============================================================================

/** Available theme options */
export type Theme = 'light' | 'dark' | 'system';

/** The actual applied theme after resolving 'system' preference */
export type ResolvedTheme = 'light' | 'dark';

/** Theme context value exposed to consumers */
export interface ThemeContextValue {
  /** Current theme setting (may be 'system') */
  theme: Theme;
  /** Update the theme preference */
  setTheme: (theme: Theme) => void;
  /** The actual applied theme ('light' or 'dark') */
  resolvedTheme: ResolvedTheme;
}

// =============================================================================
// Constants
// =============================================================================

/** localStorage key for persisting theme preference */
const THEME_STORAGE_KEY = 'scamaware-theme';

/** Default theme when no preference is stored */
const DEFAULT_THEME: Theme = 'light';

/**
 * MVP Flag: When true, always resolves to 'light' regardless of settings
 * Set to false when ready to implement dark mode
 */
const MVP_LIGHT_MODE_ONLY = true;

// =============================================================================
// Context
// =============================================================================

/**
 * Theme context with undefined default to enforce provider usage
 * Using undefined allows us to detect if the hook is used outside provider
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get the system's preferred color scheme
 * @returns 'dark' if system prefers dark mode, 'light' otherwise
 */
function getSystemTheme(): ResolvedTheme {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'light';
  }

  // Query the system preference
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  return mediaQuery.matches ? 'dark' : 'light';
}

/**
 * Read theme preference from localStorage
 * @returns Stored theme or default if not found/invalid
 */
function getStoredTheme(): Theme {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // localStorage may be unavailable (e.g., private browsing)
    console.warn('Unable to access localStorage for theme preference');
  }

  return DEFAULT_THEME;
}

/**
 * Save theme preference to localStorage
 * @param theme - Theme to persist
 */
function storeTheme(theme: Theme): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage may be unavailable
    console.warn('Unable to save theme preference to localStorage');
  }
}

/**
 * Apply theme to the document
 * Sets the data-theme attribute on the document element
 * @param resolvedTheme - The theme to apply
 */
function applyThemeToDocument(resolvedTheme: ResolvedTheme): void {
  if (typeof document === 'undefined') {
    return;
  }

  // Set data attribute for CSS selectors
  document.documentElement.setAttribute('data-theme', resolvedTheme);

  // Also update the color-scheme property for native UI elements
  // This affects scrollbars, form controls, etc.
  document.documentElement.style.colorScheme = resolvedTheme;
}

// =============================================================================
// Provider Component
// =============================================================================

export interface ThemeProviderProps {
  /** Child components to wrap */
  children: React.ReactNode;
  /** Optional initial theme (overrides localStorage on first render) */
  defaultTheme?: Theme;
  /**
   * Storage key for localStorage (allows multiple apps on same domain)
   * @default 'scamaware-theme'
   */
  storageKey?: string;
}

/**
 * ThemeProvider Component
 *
 * Provides theme context to the application. Must wrap any components
 * that need access to theme state via useTheme().
 *
 * @example
 * ```tsx
 * // In layout.tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * // In a component
 * const { theme, setTheme, resolvedTheme } = useTheme();
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme,
}: ThemeProviderProps): React.JSX.Element {
  // Track the user's theme preference
  const [theme, setThemeState] = useState<Theme>(() => {
    // Use default if provided, otherwise read from storage
    return defaultTheme ?? getStoredTheme();
  });

  // Track the system preference for 'system' mode
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    getSystemTheme()
  );

  // Calculate the resolved theme
  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    // MVP: Always return light mode
    if (MVP_LIGHT_MODE_ONLY) {
      return 'light';
    }

    // Full implementation for future dark mode support:
    if (theme === 'system') {
      return systemTheme;
    }
    return theme;
  }, [theme, systemTheme]);

  // Listen for system preference changes
  useEffect(() => {
    // Skip if MVP light mode only
    if (MVP_LIGHT_MODE_ONLY) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    // Modern browsers
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Apply theme to document when it changes
  useEffect(() => {
    applyThemeToDocument(resolvedTheme);
  }, [resolvedTheme]);

  // Memoized setter that also persists to localStorage
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    storeTheme(newTheme);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
    }),
    [theme, setTheme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// =============================================================================
// Inline Script for Preventing Flash of Wrong Theme
// =============================================================================

/**
 * Script to inject in <head> to prevent flash of wrong theme
 *
 * This script runs before React hydration to set the correct theme immediately.
 * It reads from localStorage and applies the theme to the document.
 *
 * IMPORTANT: This script is a string to be used with dangerouslySetInnerHTML
 * in the layout.tsx file's <head> section.
 *
 * ## Future Usage (when dark mode is enabled):
 * Add this to your layout.tsx in the <head>:
 *
 * ```tsx
 * <script
 *   dangerouslySetInnerHTML={{ __html: themeInitScript }}
 * />
 * ```
 *
 * For MVP (light mode only), this script is not needed but is prepared
 * for future implementation.
 */
export const themeInitScript = `
(function() {
  // MVP: Light mode only - skip detection
  // Uncomment below when enabling dark mode
  /*
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = 'light';

    if (stored === 'dark') {
      theme = 'dark';
    } else if (stored === 'system' || !stored) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
  */

  // MVP: Always set light theme
  document.documentElement.setAttribute('data-theme', 'light');
  document.documentElement.style.colorScheme = 'light';
})();
`;

export default ThemeProvider;

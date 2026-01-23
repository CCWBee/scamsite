/**
 * Disclaimer Components - Barrel Export
 *
 * This module exports all AI disclaimer components for ScamAware Jersey.
 * These components ensure users are informed about AI limitations and
 * liability disclaimers throughout the application.
 *
 * ## Available Components
 *
 * ### AIDisclaimerBanner
 * Persistent warning banner displayed at the top of every page.
 *
 * ### AIDisclaimerModal
 * Modal requiring explicit user acknowledgment before AI chatbot use.
 *
 * ### AIDisclaimerProvider
 * Context provider for managing disclaimer acceptance state.
 *
 * ## Usage
 *
 * ```tsx
 * // In your root layout:
 * import { AIDisclaimerProvider, AIDisclaimerBanner } from '@/components/disclaimers';
 *
 * function RootLayout({ children }) {
 *   return (
 *     <AIDisclaimerProvider>
 *       <AIDisclaimerBanner />
 *       {children}
 *     </AIDisclaimerProvider>
 *   );
 * }
 *
 * // In components that use AI chatbot:
 * import { useAIDisclaimer } from '@/components/disclaimers';
 *
 * function ChatButton() {
 *   const { requireDisclaimerAcceptance } = useAIDisclaimer();
 *
 *   const handleClick = async () => {
 *     const accepted = await requireDisclaimerAcceptance();
 *     if (accepted) {
 *       // Open chat
 *     }
 *   };
 * }
 * ```
 */

// Banner Component
export { AIDisclaimerBanner } from './AIDisclaimerBanner';
export type { AIDisclaimerBannerProps } from './AIDisclaimerBanner';

// Modal Component
export { AIDisclaimerModal } from './AIDisclaimerModal';
export type { AIDisclaimerModalProps } from './AIDisclaimerModal';

// Provider and Hook
export { AIDisclaimerProvider, useAIDisclaimer } from './AIDisclaimerProvider';
export type { AIDisclaimerProviderProps } from './AIDisclaimerProvider';

/**
 * AI Disclaimer Provider
 *
 * Context provider for managing AI disclaimer acknowledgment state.
 * Persists acknowledgment in localStorage so users don't have to accept repeatedly.
 *
 * @example
 * ```tsx
 * // In your app layout:
 * <AIDisclaimerProvider>
 *   <App />
 * </AIDisclaimerProvider>
 *
 * // In components that use AI:
 * const { hasAcceptedDisclaimer, showDisclaimerModal } = useAIDisclaimer();
 * ```
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AIDisclaimerModal } from './AIDisclaimerModal';

const STORAGE_KEY = 'scamaware-ai-disclaimer-accepted';

interface AIDisclaimerContextValue {
  /**
   * Whether the user has accepted the AI disclaimer.
   */
  hasAcceptedDisclaimer: boolean;

  /**
   * Show the disclaimer modal. Call this before allowing AI chatbot access.
   * Returns a promise that resolves to true if accepted, false if declined.
   */
  requireDisclaimerAcceptance: () => Promise<boolean>;

  /**
   * Reset the disclaimer acceptance (useful for testing or settings).
   */
  resetDisclaimerAcceptance: () => void;
}

const AIDisclaimerContext = createContext<AIDisclaimerContextValue | null>(null);

export interface AIDisclaimerProviderProps {
  children: React.ReactNode;
}

/**
 * AI Disclaimer Provider Component
 *
 * Wraps the application and provides disclaimer state management.
 */
export const AIDisclaimerProvider: React.FC<AIDisclaimerProviderProps> = ({
  children,
}) => {
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingResolve, setPendingResolve] = useState<((value: boolean) => void) | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'true') {
        setHasAcceptedDisclaimer(true);
      }
    }
  }, []);

  const requireDisclaimerAcceptance = useCallback((): Promise<boolean> => {
    // If already accepted, resolve immediately
    if (hasAcceptedDisclaimer) {
      return Promise.resolve(true);
    }

    // Show modal and return promise
    return new Promise((resolve) => {
      setPendingResolve(() => resolve);
      setIsModalOpen(true);
    });
  }, [hasAcceptedDisclaimer]);

  const handleAccept = useCallback(() => {
    setHasAcceptedDisclaimer(true);
    setIsModalOpen(false);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
    }

    if (pendingResolve) {
      pendingResolve(true);
      setPendingResolve(null);
    }
  }, [pendingResolve]);

  const handleDecline = useCallback(() => {
    setIsModalOpen(false);

    if (pendingResolve) {
      pendingResolve(false);
      setPendingResolve(null);
    }
  }, [pendingResolve]);

  const resetDisclaimerAcceptance = useCallback(() => {
    setHasAcceptedDisclaimer(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const contextValue: AIDisclaimerContextValue = {
    hasAcceptedDisclaimer,
    requireDisclaimerAcceptance,
    resetDisclaimerAcceptance,
  };

  return (
    <AIDisclaimerContext.Provider value={contextValue}>
      {children}
      <AIDisclaimerModal
        isOpen={isModalOpen}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </AIDisclaimerContext.Provider>
  );
};

/**
 * Hook to access AI disclaimer context.
 *
 * @example
 * ```tsx
 * function ChatComponent() {
 *   const { requireDisclaimerAcceptance } = useAIDisclaimer();
 *
 *   const handleStartChat = async () => {
 *     const accepted = await requireDisclaimerAcceptance();
 *     if (accepted) {
 *       // Start chat
 *     } else {
 *       // Navigate away or show message
 *     }
 *   };
 * }
 * ```
 */
export function useAIDisclaimer(): AIDisclaimerContextValue {
  const context = useContext(AIDisclaimerContext);
  if (!context) {
    throw new Error('useAIDisclaimer must be used within an AIDisclaimerProvider');
  }
  return context;
}

export default AIDisclaimerProvider;

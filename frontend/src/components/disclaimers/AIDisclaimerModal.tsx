/**
 * AI Disclaimer Modal Component
 *
 * A modal dialog that requires users to acknowledge AI limitations
 * and liability disclaimers before using the AI chatbot feature.
 *
 * @example
 * ```tsx
 * <AIDisclaimerModal
 *   isOpen={showModal}
 *   onAccept={() => setHasAccepted(true)}
 *   onDecline={() => navigateAway()}
 * />
 * ```
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export interface AIDisclaimerModalProps {
  /**
   * Whether the modal is currently visible.
   */
  isOpen: boolean;

  /**
   * Callback when user accepts the disclaimer.
   */
  onAccept: () => void;

  /**
   * Callback when user declines the disclaimer.
   */
  onDecline: () => void;
}

/**
 * AI Disclaimer Modal
 *
 * Displays a blocking modal requiring user acknowledgment before AI chatbot use.
 * Cannot be dismissed by clicking outside - user must explicitly accept or decline.
 */
export const AIDisclaimerModal: React.FC<AIDisclaimerModalProps> = ({
  isOpen,
  onAccept,
  onDecline,
}) => {
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management - focus accept button when modal opens
  useEffect(() => {
    if (isOpen && acceptButtonRef.current) {
      acceptButtonRef.current.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-disclaimer-title"
      aria-describedby="ai-disclaimer-description"
    >
      {/* Backdrop - no click to dismiss */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg rounded-lg bg-white shadow-2xl dark:bg-gray-900">
        {/* Warning Header */}
        <div className="flex items-center gap-3 rounded-t-lg bg-amber-500 px-6 py-4 text-black">
          <Icon name="AlertTriangle" size="lg" aria-hidden />
          <h2 id="ai-disclaimer-title" className="text-xl font-bold">
            Important AI Disclaimer
          </h2>
        </div>

        {/* Body */}
        <div id="ai-disclaimer-description" className="px-6 py-6 space-y-4">
          <div className="rounded-lg border-2 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
            <p className="font-bold text-red-700 dark:text-red-400 text-lg mb-2">
              Please Read Carefully Before Proceeding
            </p>
          </div>

          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>
              <strong>This AI chatbot is provided for informational purposes only.</strong>
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>AI makes mistakes:</strong> The artificial intelligence powering this
                chatbot can and does generate incorrect, incomplete, or misleading information.
              </li>
              <li>
                <strong>Not professional advice:</strong> Responses should never be considered
                legal, financial, or professional advice.
              </li>
              <li>
                <strong>Verify all information:</strong> Always verify important information
                with official sources such as the States of Jersey Police, Jersey Financial
                Services Commission, or other authorised bodies.
              </li>
              <li>
                <strong>No liability:</strong> ScamAware Jersey, its partners, and affiliates
                accept <strong>no responsibility or liability</strong> for any actions taken
                based on AI-generated content.
              </li>
              <li>
                <strong>Emergency situations:</strong> If you are in immediate danger or
                experiencing an emergency, call <strong>999</strong> immediately. Do not
                rely on this chatbot.
              </li>
            </ul>

            <div className="mt-4 rounded bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm font-medium">
                By clicking &quot;I Understand and Accept&quot;, you acknowledge that you have
                read and understood these limitations and agree that you will not hold
                ScamAware Jersey liable for any AI-generated content.
              </p>
            </div>
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={onDecline}
            className="w-full sm:w-auto"
          >
            Decline - Return to Site
          </Button>
          <Button
            ref={acceptButtonRef}
            variant="primary"
            onClick={onAccept}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black font-bold"
          >
            I Understand and Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

AIDisclaimerModal.displayName = 'AIDisclaimerModal';

export default AIDisclaimerModal;

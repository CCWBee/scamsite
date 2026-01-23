/**
 * AI Disclaimer Banner Component
 *
 * A prominent, persistent warning banner displayed at the top of every page
 * to inform users about AI limitations and liability disclaimers.
 *
 * @example
 * ```tsx
 * <AIDisclaimerBanner />
 * ```
 */

import React from 'react';
import { Icon } from '@/components/ui/Icon';

export interface AIDisclaimerBannerProps {
  /**
   * Additional CSS classes to apply to the banner.
   */
  className?: string;
}

/**
 * AI Disclaimer Banner
 *
 * Displays a fixed warning banner at the top of the page with AI disclaimer text.
 * Uses alert colors and warning icon for high visibility.
 */
export const AIDisclaimerBanner: React.FC<AIDisclaimerBannerProps> = ({
  className = '',
}) => {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        w-full bg-amber-500 text-black
        border-b-2 border-amber-600
        ${className}
      `.trim()}
    >
      <div className="mx-auto max-w-[1400px] px-4 py-2 sm:px-6">
        <div className="flex items-center justify-center gap-2 text-center">
          <Icon
            name="AlertTriangle"
            size="sm"
            className="flex-shrink-0"
            aria-hidden
          />
          <p className="text-xs sm:text-sm font-semibold">
            <span className="font-bold">AI DISCLAIMER:</span>{' '}
            This site uses artificial intelligence which can make mistakes and provide inaccurate information.{' '}
            <span className="hidden sm:inline">
              Always verify important information with official sources.{' '}
            </span>
            <span className="font-bold">
              ScamAware Jersey accepts no liability for AI-generated content.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

AIDisclaimerBanner.displayName = 'AIDisclaimerBanner';

export default AIDisclaimerBanner;

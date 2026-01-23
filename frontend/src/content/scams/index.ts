/**
 * Scam Types Content
 *
 * Central export for all scam type content used in ScamAware Jersey.
 * Provides the complete list of scams and lookup utilities.
 */

// Re-export types
export type {
  ScamType,
  HowItWorksStep,
  RedFlag,
  ActionStep,
  DangerLevel,
  ScamIcon,
} from './types';

// Import all scam types
import { bankImpersonation } from './bank-impersonation';
import { investmentFraud } from './investment-fraud';
import { romanceScams } from './romance-scams';
import { invoiceFraud } from './invoice-fraud';
import { deliveryScams } from './delivery-scams';
import { techSupportScams } from './tech-support-scams';
import { prizeLotteryScams } from './prize-lottery-scams';
import { phishing } from './phishing';
import { authorisedPushPayment } from './authorised-push-payment';

import type { ScamType } from './types';

// Export individual scam types for direct import
export {
  bankImpersonation,
  investmentFraud,
  romanceScams,
  invoiceFraud,
  deliveryScams,
  techSupportScams,
  prizeLotteryScams,
  phishing,
  authorisedPushPayment,
};

/**
 * Complete array of all scam types
 *
 * Ordered by danger level (high first) then alphabetically
 */
export const scamTypes: ScamType[] = [
  // High danger scams
  authorisedPushPayment,
  bankImpersonation,
  investmentFraud,
  invoiceFraud,
  romanceScams,
  // Medium danger scams
  deliveryScams,
  phishing,
  prizeLotteryScams,
  techSupportScams,
];

/**
 * Look up a scam type by its URL slug
 *
 * @param slug - The URL-friendly identifier (e.g., 'bank-impersonation')
 * @returns The matching ScamType or undefined if not found
 *
 * @example
 * const scam = getScamBySlug('phishing');
 * if (scam) {
 *   console.log(scam.title); // "Phishing"
 * }
 */
export const getScamBySlug = (slug: string): ScamType | undefined => {
  return scamTypes.find((scam) => scam.slug === slug);
};

/**
 * Get all scam types filtered by danger level
 *
 * @param level - The danger level to filter by ('low', 'medium', 'high')
 * @returns Array of ScamTypes matching the specified danger level
 *
 * @example
 * const highDangerScams = getScamsByDangerLevel('high');
 */
export const getScamsByDangerLevel = (
  level: 'low' | 'medium' | 'high'
): ScamType[] => {
  return scamTypes.filter((scam) => scam.dangerLevel === level);
};

/**
 * Get related scam types for a given scam
 *
 * @param slug - The slug of the scam to get related scams for
 * @returns Array of related ScamTypes
 *
 * @example
 * const related = getRelatedScams('phishing');
 * // Returns full ScamType objects for delivery-scams, bank-impersonation, etc.
 */
export const getRelatedScams = (slug: string): ScamType[] => {
  const scam = getScamBySlug(slug);
  if (!scam) return [];

  return scam.relatedScams
    .map((relatedSlug) => getScamBySlug(relatedSlug))
    .filter((s): s is ScamType => s !== undefined);
};

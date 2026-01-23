/**
 * ScamType Content Types
 *
 * Type definitions for scam type content files used throughout
 * the ScamAware Jersey application.
 */

/**
 * A single step in the "How it Works" section explaining scam methodology
 */
export interface HowItWorksStep {
  /** Step number (1-indexed) */
  number: number;
  /** Short title for the step */
  title: string;
  /** Detailed description of what happens in this step */
  description: string;
}

/**
 * A red flag warning sign to watch for
 */
export interface RedFlag {
  /** Unique identifier for the red flag */
  id: string;
  /** Description of the warning sign */
  text: string;
}

/**
 * An action step for what to do if targeted
 */
export interface ActionStep {
  /** Action number (1-indexed) */
  number: number;
  /** Short title for the action */
  title: string;
  /** Detailed description of the action to take */
  description: string;
}

/**
 * Danger level indicating severity of the scam type
 */
export type DangerLevel = 'low' | 'medium' | 'high';

/**
 * Icon names from lucide-react used for scam type cards
 */
export type ScamIcon =
  | 'Building2'
  | 'TrendingUp'
  | 'Heart'
  | 'FileText'
  | 'Package'
  | 'Monitor'
  | 'Gift'
  | 'Mail'
  | 'Banknote'
  | 'ShieldAlert'
  | 'AlertTriangle';

/**
 * Complete scam type content structure
 */
export interface ScamType {
  /** URL-friendly identifier */
  slug: string;
  /** Display title */
  title: string;
  /** Brief description for cards and previews */
  description: string;
  /** Icon name from lucide-react */
  icon: ScamIcon;
  /** Severity level (low, medium, high) */
  dangerLevel: DangerLevel;
  /** Steps explaining how the scam typically works */
  howItWorks: HowItWorksStep[];
  /** Warning signs to watch for */
  redFlags: RedFlag[];
  /** Actions to take if targeted or victimised */
  actions: ActionStep[];
  /** Slugs of related scam types */
  relatedScams: string[];
}

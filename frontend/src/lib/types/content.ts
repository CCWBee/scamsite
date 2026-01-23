/**
 * Content Data Structures for ScamAware Jersey
 *
 * This module defines TypeScript interfaces and Zod schemas for all content types
 * used throughout the ScamAware Jersey application. These types ensure type safety
 * at compile time and runtime validation of content data.
 *
 * @module content
 */

import { z } from 'zod';

// ============================================================================
// Helper Types and Constants
// ============================================================================

/**
 * Danger level classification for scam types.
 * - high: Immediate financial or personal risk
 * - medium: Significant risk with potential for harm
 * - low: Lower risk but still requires awareness
 */
export type DangerLevel = 'high' | 'medium' | 'low';

/**
 * Alert category classification.
 * - warning: Urgent scam alerts requiring immediate attention
 * - news: General news about scam trends and awareness
 * - update: Updates to existing scam information or guidance
 */
export type AlertCategory = 'warning' | 'news' | 'update';

/**
 * Supported file types for downloadable resources.
 */
export type FileType = 'pdf' | 'png' | 'docx';

/**
 * Zod schema for danger level validation.
 */
export const DangerLevelSchema = z.enum(['high', 'medium', 'low']);

/**
 * Zod schema for alert category validation.
 */
export const AlertCategorySchema = z.enum(['warning', 'news', 'update']);

/**
 * Zod schema for file type validation.
 */
export const FileTypeSchema = z.enum(['pdf', 'png', 'docx']);

// ============================================================================
// Step - For "How It Works" Sections
// ============================================================================

/**
 * Represents a single step in a process explanation.
 * Used to break down how scams work into numbered, digestible steps.
 */
export interface Step {
  /** Sequential step number (1-based) */
  number: number;
  /** Brief title describing the step */
  title: string;
  /** Detailed explanation of what happens in this step */
  description: string;
  /** Optional Lucide icon name to visually represent the step */
  icon?: string;
}

/**
 * Zod schema for Step validation.
 */
export const StepSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional(),
});

/**
 * Type inferred from StepSchema for runtime-validated Step objects.
 */
export type StepValidated = z.infer<typeof StepSchema>;

// ============================================================================
// RedFlag - Warning Signs
// ============================================================================

/**
 * Represents a specific warning sign or red flag that indicates a potential scam.
 * These are quick identifiers that users can check against suspicious communications.
 */
export interface RedFlag {
  /** Unique identifier for the red flag */
  id: string;
  /** Concise description of the warning sign */
  text: string;
  /** Optional additional detail or explanation */
  detail?: string;
}

/**
 * Zod schema for RedFlag validation.
 */
export const RedFlagSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  detail: z.string().optional(),
});

/**
 * Type inferred from RedFlagSchema for runtime-validated RedFlag objects.
 */
export type RedFlagValidated = z.infer<typeof RedFlagSchema>;

// ============================================================================
// ActionStep - What To Do
// ============================================================================

/**
 * Represents an action step that users should take when they encounter a scam.
 * Provides clear guidance with optional links to external resources.
 */
export interface ActionStep {
  /** Sequential step number (1-based) */
  number: number;
  /** Brief title describing the action */
  title: string;
  /** Detailed explanation of what the user should do */
  description: string;
  /** Optional link to an external resource or further information */
  link?: {
    /** Display text for the link */
    text: string;
    /** URL or path to the resource */
    href: string;
  };
}

/**
 * Zod schema for the link object within ActionStep.
 */
export const ActionStepLinkSchema = z.object({
  text: z.string().min(1),
  href: z.string().min(1),
});

/**
 * Zod schema for ActionStep validation.
 */
export const ActionStepSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  link: ActionStepLinkSchema.optional(),
});

/**
 * Type inferred from ActionStepSchema for runtime-validated ActionStep objects.
 */
export type ActionStepValidated = z.infer<typeof ActionStepSchema>;

// ============================================================================
// ScamType - For Each Scam Category
// ============================================================================

/**
 * Represents a complete scam type entry with all associated information.
 * This is the primary content type for scam education pages.
 */
export interface ScamType {
  /** URL-friendly unique identifier */
  slug: string;
  /** Display title of the scam type */
  title: string;
  /** Brief description of the scam */
  description: string;
  /** Lucide icon name for visual representation */
  icon: string;
  /** Risk classification for the scam type */
  dangerLevel: DangerLevel;
  /** Step-by-step breakdown of how the scam typically works */
  howItWorks: Step[];
  /** List of warning signs to watch for */
  redFlags: RedFlag[];
  /** Recommended actions if you encounter this scam */
  actions: ActionStep[];
  /** Slugs of related scam types for cross-referencing */
  relatedScams: string[];
}

/**
 * Zod schema for ScamType validation.
 */
export const ScamTypeSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens',
  }),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  dangerLevel: DangerLevelSchema,
  howItWorks: z.array(StepSchema).min(1),
  redFlags: z.array(RedFlagSchema).min(1),
  actions: z.array(ActionStepSchema).min(1),
  relatedScams: z.array(z.string()),
});

/**
 * Type inferred from ScamTypeSchema for runtime-validated ScamType objects.
 */
export type ScamTypeValidated = z.infer<typeof ScamTypeSchema>;

// ============================================================================
// WarningSign - Universal Warning Signs
// ============================================================================

/**
 * Represents a universal warning sign that applies across multiple scam types.
 * These are general red flags that users should always be aware of.
 */
export interface WarningSign {
  /** Unique identifier for the warning sign */
  id: string;
  /** Title of the warning sign */
  title: string;
  /** Detailed description explaining why this is a warning sign */
  description: string;
  /** Real-world examples of this warning sign in action */
  examples: string[];
  /** Lucide icon name for visual representation */
  icon: string;
}

/**
 * Zod schema for WarningSign validation.
 */
export const WarningSignSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  examples: z.array(z.string().min(1)).min(1),
  icon: z.string().min(1),
});

/**
 * Type inferred from WarningSignSchema for runtime-validated WarningSign objects.
 */
export type WarningSignValidated = z.infer<typeof WarningSignSchema>;

// ============================================================================
// Alert - From RSS Feeds
// ============================================================================

/**
 * Represents an alert or news item, typically sourced from RSS feeds.
 * Used to display timely information about current scam threats.
 */
export interface Alert {
  /** Unique identifier for the alert */
  id: string;
  /** Title of the alert */
  title: string;
  /** Brief summary of the alert content */
  summary: string;
  /** Publication date in ISO 8601 format (YYYY-MM-DD) */
  date: string;
  /** Classification of the alert type */
  category: AlertCategory;
  /** Source organization or publication name */
  source: string;
  /** URL to the full article or resource */
  href: string;
}

/**
 * Zod schema for Alert validation.
 */
export const AlertSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in ISO format (YYYY-MM-DD)',
  }),
  category: AlertCategorySchema,
  source: z.string().min(1),
  href: z.string().url(),
});

/**
 * Type inferred from AlertSchema for runtime-validated Alert objects.
 */
export type AlertValidated = z.infer<typeof AlertSchema>;

// ============================================================================
// Resource - Downloadable Materials
// ============================================================================

/**
 * Represents a downloadable resource such as guides, infographics, or documents.
 * Used for the resources section where users can download educational materials.
 */
export interface Resource {
  /** Unique identifier for the resource */
  id: string;
  /** Title of the resource */
  title: string;
  /** Description of what the resource contains */
  description: string;
  /** File format of the downloadable resource */
  fileType: FileType;
  /** Human-readable file size (e.g., "2.5 MB") */
  fileSize: string;
  /** URL to download the resource */
  downloadUrl: string;
  /** Optional URL to a thumbnail preview image */
  thumbnailUrl?: string;
}

/**
 * Zod schema for Resource validation.
 */
export const ResourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  fileType: FileTypeSchema,
  fileSize: z.string().min(1),
  downloadUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
});

/**
 * Type inferred from ResourceSchema for runtime-validated Resource objects.
 */
export type ResourceValidated = z.infer<typeof ResourceSchema>;

// ============================================================================
// ExternalLink - Partner Resources
// ============================================================================

/**
 * Represents an external link to a partner organization's resource.
 * Used to provide users with additional trusted resources from official bodies.
 */
export interface ExternalLink {
  /** Unique identifier for the external link */
  id: string;
  /** Title of the linked resource */
  title: string;
  /** Description of what the resource provides */
  description: string;
  /** URL to the external resource */
  url: string;
  /** Name of the organization providing the resource */
  organization: string;
}

/**
 * Zod schema for ExternalLink validation.
 */
export const ExternalLinkSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url(),
  organization: z.string().min(1),
});

/**
 * Type inferred from ExternalLinkSchema for runtime-validated ExternalLink objects.
 */
export type ExternalLinkValidated = z.infer<typeof ExternalLinkSchema>;

// ============================================================================
// Collection Schemas - For validating arrays of content
// ============================================================================

/**
 * Schema for validating an array of ScamType objects.
 */
export const ScamTypesArraySchema = z.array(ScamTypeSchema);

/**
 * Schema for validating an array of WarningSign objects.
 */
export const WarningSignsArraySchema = z.array(WarningSignSchema);

/**
 * Schema for validating an array of Alert objects.
 */
export const AlertsArraySchema = z.array(AlertSchema);

/**
 * Schema for validating an array of Resource objects.
 */
export const ResourcesArraySchema = z.array(ResourceSchema);

/**
 * Schema for validating an array of ExternalLink objects.
 */
export const ExternalLinksArraySchema = z.array(ExternalLinkSchema);

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Validates a ScamType object and returns the validated data or throws an error.
 * @param data - The data to validate
 * @returns The validated ScamType object
 * @throws ZodError if validation fails
 */
export function validateScamType(data: unknown): ScamType {
  return ScamTypeSchema.parse(data);
}

/**
 * Safely validates a ScamType object and returns a result object.
 * @param data - The data to validate
 * @returns An object with success status and either data or error
 */
export function safeValidateScamType(data: unknown) {
  return ScamTypeSchema.safeParse(data);
}

/**
 * Validates an array of ScamType objects.
 * @param data - The data to validate
 * @returns The validated array of ScamType objects
 * @throws ZodError if validation fails
 */
export function validateScamTypes(data: unknown): ScamType[] {
  return ScamTypesArraySchema.parse(data);
}

/**
 * Validates a WarningSign object.
 * @param data - The data to validate
 * @returns The validated WarningSign object
 * @throws ZodError if validation fails
 */
export function validateWarningSign(data: unknown): WarningSign {
  return WarningSignSchema.parse(data);
}

/**
 * Validates an Alert object.
 * @param data - The data to validate
 * @returns The validated Alert object
 * @throws ZodError if validation fails
 */
export function validateAlert(data: unknown): Alert {
  return AlertSchema.parse(data);
}

/**
 * Validates a Resource object.
 * @param data - The data to validate
 * @returns The validated Resource object
 * @throws ZodError if validation fails
 */
export function validateResource(data: unknown): Resource {
  return ResourceSchema.parse(data);
}

/**
 * Validates an ExternalLink object.
 * @param data - The data to validate
 * @returns The validated ExternalLink object
 * @throws ZodError if validation fails
 */
export function validateExternalLink(data: unknown): ExternalLink {
  return ExternalLinkSchema.parse(data);
}

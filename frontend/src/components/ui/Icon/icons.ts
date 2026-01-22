/**
 * Common Icons Re-export
 *
 * This file re-exports commonly used icons from lucide-react for
 * convenient direct imports in ScamAware Jersey.
 *
 * Usage:
 * ```tsx
 * // Import specific icons directly
 * import { Shield, AlertTriangle } from '@/components/ui/Icon/icons';
 *
 * // Or use the Icon wrapper component
 * import { Icon } from '@/components/ui/Icon';
 * <Icon name="Shield" aria-hidden />
 * ```
 *
 * Icon Categories:
 * - Security: Shield variants for security-related UI
 * - Alerts: Warning and information indicators
 * - Communication: Contact and messaging icons
 * - Status: Success/error state indicators
 * - Navigation: Chevrons and directional icons
 * - Links: External link and URL indicators
 * - Mobile: Menu and close icons for mobile navigation
 * - Utility: Search, user, and settings icons
 */

// ============================================================================
// SECURITY ICONS
// Used for security-related content, scam warnings, and protection indicators
// ============================================================================

/**
 * Shield icon - represents security, protection, and trust
 */
export { Shield } from "lucide-react";

/**
 * ShieldAlert icon - security warning, potential threat
 */
export { ShieldAlert } from "lucide-react";

/**
 * ShieldCheck icon - verified security, protected status
 */
export { ShieldCheck } from "lucide-react";

// ============================================================================
// ALERT ICONS
// Used for warnings, information notices, and status messages
// ============================================================================

/**
 * AlertTriangle icon - warning, caution, moderate risk
 */
export { AlertTriangle } from "lucide-react";

/**
 * AlertCircle icon - alert, attention required
 */
export { AlertCircle } from "lucide-react";

/**
 * Info icon - informational content, help text
 */
export { Info } from "lucide-react";

// ============================================================================
// COMMUNICATION ICONS
// Used for contact information and messaging features
// ============================================================================

/**
 * Phone icon - telephone contact, call action
 */
export { Phone } from "lucide-react";

/**
 * Mail icon - email contact, message
 */
export { Mail } from "lucide-react";

/**
 * MessageSquare icon - chat, chatbot, conversation
 */
export { MessageSquare } from "lucide-react";

// ============================================================================
// STATUS ICONS
// Used for success/error states and confirmation indicators
// ============================================================================

/**
 * CheckCircle icon - success, completed, verified
 */
export { CheckCircle } from "lucide-react";

/**
 * XCircle icon - error, failed, rejected
 */
export { XCircle } from "lucide-react";

// ============================================================================
// NAVIGATION ICONS
// Used for expandable sections, accordions, and directional navigation
// ============================================================================

/**
 * ChevronDown icon - expand, dropdown, more content below
 */
export { ChevronDown } from "lucide-react";

/**
 * ChevronRight icon - navigate forward, expand right
 */
export { ChevronRight } from "lucide-react";

/**
 * ChevronUp icon - collapse, less content, scroll up
 */
export { ChevronUp } from "lucide-react";

// ============================================================================
// LINK ICONS
// Used for external links and URL references
// ============================================================================

/**
 * ExternalLink icon - opens in new tab, external resource
 */
export { ExternalLink } from "lucide-react";

/**
 * Link icon - URL, hyperlink, connection
 */
export { Link } from "lucide-react";

// ============================================================================
// MOBILE NAVIGATION ICONS
// Used for mobile hamburger menu and close buttons
// ============================================================================

/**
 * Menu icon - hamburger menu, navigation toggle
 */
export { Menu } from "lucide-react";

/**
 * X icon - close, dismiss, cancel
 */
export { X } from "lucide-react";

// ============================================================================
// UTILITY ICONS
// General purpose icons for common UI elements
// ============================================================================

/**
 * Search icon - search functionality, find content
 */
export { Search } from "lucide-react";

/**
 * User icon - user profile, account
 */
export { User } from "lucide-react";

/**
 * Settings icon - configuration, preferences
 */
export { Settings } from "lucide-react";

// ============================================================================
// TYPE RE-EXPORT
// Re-export LucideIcon type for custom icon usage
// ============================================================================

export type { LucideIcon, LucideProps } from "lucide-react";

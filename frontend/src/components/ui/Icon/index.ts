/**
 * Icon Component Public API
 *
 * Re-exports the Icon component, types, and commonly used icons for clean imports.
 *
 * @example
 * // Import the Icon wrapper component
 * import { Icon } from '@/components/ui/Icon';
 *
 * // Import types for TypeScript
 * import type { IconProps, IconName, IconSize } from '@/components/ui/Icon';
 *
 * // Import specific icons directly
 * import { Shield, AlertTriangle, CheckCircle } from '@/components/ui/Icon';
 */

// Export the Icon component and its types
export { Icon, default } from "./Icon";
export type { IconProps, IconName, IconSize } from "./Icon";

// Re-export commonly used icons for direct imports
export {
  // Security
  Shield,
  ShieldAlert,
  ShieldCheck,
  // Alerts
  AlertTriangle,
  AlertCircle,
  Info,
  // Communication
  Phone,
  Mail,
  MessageSquare,
  // Status
  CheckCircle,
  XCircle,
  // Navigation
  ChevronDown,
  ChevronRight,
  ChevronUp,
  // Links
  ExternalLink,
  Link,
  // Mobile navigation
  Menu,
  X,
  // Utility
  Search,
  User,
  Settings,
  // Types
  type LucideIcon,
  type LucideProps,
} from "./icons";

/**
 * Typography Components
 *
 * Semantic typography components for consistent text styling throughout
 * the ScamAware Jersey application.
 *
 * @example
 * ```tsx
 * import { Heading, Text, Label } from '@/components/ui/Typography';
 *
 * // Page structure
 * <Heading level={1}>Welcome to ScamAware Jersey</Heading>
 * <Text variant="lead">Learn how to protect yourself from scams.</Text>
 * <Text>Stay informed and stay safe.</Text>
 *
 * // Form fields
 * <Label htmlFor="email" required>Email Address</Label>
 * <input id="email" type="email" required />
 * ```
 */

export { Heading } from './Heading';
export type { HeadingProps } from './Heading';

export { Text } from './Text';
export type { TextProps } from './Text';

export { Label } from './Label';
export type { LabelProps } from './Label';

/**
 * Card Component Public API
 *
 * Re-exports the Card component and its sub-components for clean imports.
 *
 * @example
 * import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
 * import type { CardProps, CardHeaderProps, CardTitleProps } from '@/components/ui/Card';
 */

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  default,
} from "./Card";

export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./Card";

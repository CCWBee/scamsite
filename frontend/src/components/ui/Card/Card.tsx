/**
 * Card Component
 *
 * A versatile content container component for ScamAware Jersey.
 * Used for:
 * - Scam information cards
 * - Alert notifications
 * - Content sections
 * - Interactive clickable/linkable cards
 *
 * Features:
 * - Multiple visual variants (default, elevated, outlined, interactive)
 * - Compound component pattern (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
 * - Support for both onClick and href for interactive cards
 * - Accessible with proper focus states and keyboard navigation
 */

import React, { forwardRef } from "react";
import Link from "next/link";

/**
 * Props for the Card component
 */
export interface CardProps {
  /**
   * Visual variant determining the card's appearance
   * - default: White background, subtle border, small shadow
   * - elevated: White background, no border, larger shadow
   * - outlined: White background, prominent border, no shadow
   * - interactive: Hover state with lift effect, cursor pointer
   * @default "default"
   */
  variant?: "default" | "elevated" | "outlined" | "interactive";

  /**
   * The content to display inside the card
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;

  /**
   * Click handler for interactive cards
   * When provided, card becomes clickable
   */
  onClick?: () => void;

  /**
   * Makes the entire card a link
   * When provided, card renders as a Next.js Link
   */
  href?: string;
}

/**
 * Props for the CardHeader component
 */
export interface CardHeaderProps {
  /**
   * The content to display inside the card header
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * Props for the CardTitle component
 */
export interface CardTitleProps {
  /**
   * The title text or content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * Props for the CardDescription component
 */
export interface CardDescriptionProps {
  /**
   * The description text or content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * Props for the CardContent component
 */
export interface CardContentProps {
  /**
   * The main content of the card
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * Props for the CardFooter component
 */
export interface CardFooterProps {
  /**
   * The content to display in the card footer (typically actions)
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * Style mappings for card variants
 */
const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
  default: [
    "bg-white",
    "border border-gray-200",
    "shadow-sm",
  ].join(" "),

  elevated: [
    "bg-white",
    "shadow-lg",
  ].join(" "),

  outlined: [
    "bg-white",
    "border-2 border-gray-300",
  ].join(" "),

  interactive: [
    "bg-white",
    "border border-gray-200",
    "shadow-sm",
    "cursor-pointer",
    // Hover state with lift effect
    "hover:shadow-lg hover:-translate-y-1",
    // Active state
    "active:shadow-md active:translate-y-0",
  ].join(" "),
};

/**
 * Card Component
 *
 * A flexible container component following the compound component pattern.
 * Supports multiple variants and can be made interactive with onClick or href.
 *
 * @example
 * // Basic usage
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Scam Alert</CardTitle>
 *     <CardDescription>Bank impersonation detected</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Content here...</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Learn More</Button>
 *   </CardFooter>
 * </Card>
 *
 * @example
 * // As a link
 * <Card variant="interactive" href="/scams/phishing">
 *   <CardHeader>
 *     <CardTitle>Phishing Scams</CardTitle>
 *   </CardHeader>
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", children, className = "", onClick, href }, ref) => {
    // Determine if card is interactive
    const isInteractive = Boolean(onClick || href);

    // Use interactive variant styles if card is interactive but no specific variant was set
    const effectiveVariant = isInteractive && variant === "default" ? "interactive" : variant;

    // Build base styles
    const baseStyles = [
      // Shape and spacing
      "rounded-[var(--radius-lg)]",
      "overflow-hidden",
      // Transitions for interactive effects
      "transition-all duration-[var(--transition-normal)]",
    ].join(" ");

    // Focus styles for keyboard navigation (only for interactive cards)
    const focusStyles = isInteractive
      ? [
          "focus-visible:outline-2",
          "focus-visible:outline-offset-2",
          "focus-visible:outline-[var(--color-trust-blue)]",
          "focus-visible:ring-2",
          "focus-visible:ring-[var(--color-trust-blue)]",
          "focus-visible:ring-offset-2",
        ].join(" ")
      : "";

    const combinedClassName = `${baseStyles} ${variantStyles[effectiveVariant]} ${focusStyles} ${className}`.trim();

    // Render as Link if href is provided
    if (href) {
      return (
        <Link
          href={href}
          className={`block ${combinedClassName}`}
          role="article"
        >
          {children}
        </Link>
      );
    }

    // Render as interactive div if onClick is provided
    if (onClick) {
      return (
        <div
          ref={ref}
          className={combinedClassName}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Interactive card"
        >
          {children}
        </div>
      );
    }

    // Render as static card
    return (
      <div ref={ref} className={combinedClassName} role="article">
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/**
 * CardHeader Component
 *
 * Container for the card's header section, typically containing
 * CardTitle and CardDescription.
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  const baseStyles = "flex flex-col gap-1.5 p-6 pb-0";

  return (
    <div className={`${baseStyles} ${className}`.trim()}>
      {children}
    </div>
  );
};

CardHeader.displayName = "CardHeader";

/**
 * CardTitle Component
 *
 * The main title of the card. Renders as an h3 by default
 * for proper semantic structure.
 */
export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = "",
}) => {
  const baseStyles = [
    "text-xl md:text-2xl",
    "font-semibold",
    "text-navy",
    "leading-tight",
  ].join(" ");

  return (
    <h3 className={`${baseStyles} ${className}`.trim()}>
      {children}
    </h3>
  );
};

CardTitle.displayName = "CardTitle";

/**
 * CardDescription Component
 *
 * Secondary text below the title, typically a brief description
 * or subtitle.
 */
export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = "",
}) => {
  const baseStyles = [
    "text-sm md:text-base",
    "text-gray-500",
    "leading-relaxed",
  ].join(" ");

  return (
    <p className={`${baseStyles} ${className}`.trim()}>
      {children}
    </p>
  );
};

CardDescription.displayName = "CardDescription";

/**
 * CardContent Component
 *
 * The main content area of the card. Use for the primary content
 * such as text, images, or other components.
 */
export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  const baseStyles = "p-6";

  return (
    <div className={`${baseStyles} ${className}`.trim()}>
      {children}
    </div>
  );
};

CardContent.displayName = "CardContent";

/**
 * CardFooter Component
 *
 * Container for card actions or additional information.
 * Typically contains buttons, links, or metadata.
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
}) => {
  const baseStyles = [
    "flex items-center gap-4",
    "p-6 pt-0",
  ].join(" ");

  return (
    <div className={`${baseStyles} ${className}`.trim()}>
      {children}
    </div>
  );
};

CardFooter.displayName = "CardFooter";

export default Card;

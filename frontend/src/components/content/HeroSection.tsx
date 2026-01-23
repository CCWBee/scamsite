/**
 * HeroSection Component
 *
 * A reusable hero section component for landing pages in ScamAware Jersey.
 * Provides a prominent, full-width banner with customizable background,
 * headline, subtitle, and call-to-action buttons.
 *
 * Features:
 * - Three background variants: navy (default), gradient, and light
 * - Three size variants affecting padding and text sizes
 * - Primary CTA rendered as a prominent button with trust-blue background
 * - Secondary CTA rendered as a text link with arrow icon
 * - Responsive design with larger text on desktop
 * - Accessible focus states on all interactive elements
 * - Centered content with max-width constraint (1200px)
 *
 * @example
 * ```tsx
 * // Basic usage with default navy background
 * <HeroSection
 *   title="Protect Yourself from Scams"
 *   subtitle="Learn to identify and avoid common scam tactics"
 *   primaryCTA={{ label: "Get Started", href: "/learn" }}
 * />
 *
 * // With gradient background and secondary CTA
 * <HeroSection
 *   title="Report a Scam"
 *   subtitle="Help protect your community by reporting suspicious activity"
 *   primaryCTA={{ label: "Report Now", href: "/report" }}
 *   secondaryCTA={{ label: "Learn More", href: "/about" }}
 *   backgroundVariant="gradient"
 *   size="lg"
 * />
 *
 * // Light variant for secondary pages
 * <HeroSection
 *   title="Contact Us"
 *   backgroundVariant="light"
 *   size="sm"
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic heading structure (h1 for title)
 * - Focus-visible states for keyboard navigation
 * - Sufficient color contrast on all backgrounds (WCAG 2.1 AA)
 * - CTA buttons have clear, descriptive labels
 */

import React from 'react';
import { Button } from '../ui/Button/Button';
import { Heading } from '../ui/Typography/Heading';
import { Text } from '../ui/Typography/Text';

/**
 * Configuration for a call-to-action button
 */
interface CTAConfig {
  /** The text label displayed on the CTA */
  label: string;
  /** The URL the CTA links to */
  href: string;
  /** Optional click handler (for tracking, etc.) */
  onClick?: () => void;
}

/**
 * Props for the HeroSection component
 */
export interface HeroSectionProps {
  /**
   * The main headline text displayed prominently in the hero
   */
  title: string;

  /**
   * Optional subtitle text displayed below the title
   * Provides additional context or a brief description
   */
  subtitle?: string;

  /**
   * Primary call-to-action configuration
   * Rendered as a prominent button with trust-blue background
   */
  primaryCTA?: CTAConfig;

  /**
   * Secondary call-to-action configuration
   * Rendered as a text link with an arrow icon
   */
  secondaryCTA?: CTAConfig;

  /**
   * Background style variant
   * - navy: Solid JFSC navy background (#1a1f3d) - default
   * - gradient: Navy to lighter blue gradient for visual interest
   * - light: Light gray background for secondary pages
   * @default "navy"
   */
  backgroundVariant?: 'navy' | 'gradient' | 'light';

  /**
   * Size variant affecting padding and text sizes
   * - sm: Compact hero for secondary pages
   * - md: Standard hero - default
   * - lg: Large hero for primary landing pages
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Additional CSS classes to apply to the root element
   */
  className?: string;
}

/**
 * Background style mappings for each variant
 *
 * Navy: Uses the primary JFSC brand color for institutional trust
 * Gradient: Creates depth with a navy to trust-blue diagonal gradient
 * Light: Provides contrast for secondary pages while maintaining readability
 */
const backgroundStyles: Record<NonNullable<HeroSectionProps['backgroundVariant']>, string> = {
  // Solid navy background - conveys trust and authority
  navy: 'bg-navy',
  // Diagonal gradient from navy to a lighter blue - adds visual interest
  gradient: 'bg-gradient-to-br from-navy via-navy-800 to-trust-blue-800',
  // Light gray background - for secondary/interior pages
  light: 'bg-gray-50',
};

/**
 * Text color mappings based on background variant
 *
 * Navy and gradient backgrounds use white text for contrast
 * Light background uses navy text for readability
 */
const textColorStyles: Record<NonNullable<HeroSectionProps['backgroundVariant']>, {
  title: string;
  subtitle: string;
}> = {
  navy: {
    title: 'text-white',
    subtitle: 'text-gray-200',
  },
  gradient: {
    title: 'text-white',
    subtitle: 'text-gray-200',
  },
  light: {
    title: 'text-navy',
    subtitle: 'text-gray-600',
  },
};

/**
 * Padding and spacing mappings for size variants
 *
 * These values provide appropriate visual weight for different page contexts:
 * - sm: Minimal padding for interior pages where hero is less prominent
 * - md: Balanced padding for standard landing pages
 * - lg: Generous padding for primary/home page hero sections
 */
const sizeStyles: Record<NonNullable<HeroSectionProps['size']>, {
  padding: string;
  titleSize: string;
  subtitleSize: string;
  gap: string;
}> = {
  sm: {
    // Compact padding for secondary pages
    padding: 'py-12 md:py-16',
    // Smaller heading for less visual prominence
    titleSize: 'text-2xl md:text-3xl',
    subtitleSize: 'text-base md:text-lg',
    gap: 'gap-4',
  },
  md: {
    // Standard padding for typical landing pages
    padding: 'py-16 md:py-24',
    // Medium heading - balanced visual weight
    titleSize: 'text-3xl md:text-4xl lg:text-5xl',
    subtitleSize: 'text-lg md:text-xl',
    gap: 'gap-6',
  },
  lg: {
    // Generous padding for maximum visual impact
    padding: 'py-20 md:py-32',
    // Large heading using custom hero/display sizes
    titleSize: 'text-4xl md:text-5xl lg:text-display',
    subtitleSize: 'text-xl md:text-2xl',
    gap: 'gap-8',
  },
};

/**
 * Arrow icon component for secondary CTA
 * Provides visual affordance indicating a link/navigation action
 */
const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * HeroSection Component
 *
 * A prominent banner section for landing pages that displays a headline,
 * optional subtitle, and call-to-action buttons. Designed to capture
 * attention and guide users to key actions.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  backgroundVariant = 'navy',
  size = 'md',
  className = '',
}) => {
  // Get style configurations based on variants
  const bgStyle = backgroundStyles[backgroundVariant];
  const textColors = textColorStyles[backgroundVariant];
  const sizeConfig = sizeStyles[size];

  // Determine button variant based on background
  // On dark backgrounds, use secondary (outlined) style that inverts to filled on hover
  // On light backgrounds, use primary style for contrast
  const primaryButtonVariant = backgroundVariant === 'light' ? 'primary' : 'secondary';

  // Secondary CTA text color - white on dark, trust-blue on light
  const secondaryCTAColor = backgroundVariant === 'light'
    ? 'text-trust-blue hover:text-trust-blue-700'
    : 'text-white hover:text-gray-200';

  return (
    <section
      className={`
        ${bgStyle}
        ${sizeConfig.padding}
        w-full
        ${className}
      `.trim()}
      // Use region role for landmark navigation
      role="region"
      aria-label="Hero section"
    >
      {/* Content container with max-width constraint */}
      <div className="container-custom">
        {/*
          Centered content wrapper
          Uses flex column layout with centered alignment
          Max-width ensures readable line lengths on wide screens
        */}
        <div className={`
          flex flex-col items-center text-center
          max-w-4xl mx-auto
          ${sizeConfig.gap}
        `}>
          {/*
            Main headline
            Uses semantic h1 for primary page title
            Custom title sizes override Heading component defaults
            for hero-specific responsive scaling
          */}
          <Heading
            level={1}
            className={`
              ${sizeConfig.titleSize}
              ${textColors.title}
              font-bold leading-tight tracking-tight
            `}
          >
            {title}
          </Heading>

          {/*
            Optional subtitle
            Provides supporting context below the headline
            Uses slightly muted color for visual hierarchy
          */}
          {subtitle && (
            <Text
              variant="lead"
              as="p"
              className={`
                ${sizeConfig.subtitleSize}
                ${textColors.subtitle}
                max-w-2xl
                leading-relaxed
              `}
            >
              {subtitle}
            </Text>
          )}

          {/*
            CTA button group
            Horizontal layout on larger screens, vertical on mobile
            Adequate gap between buttons for touch targets
          */}
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              {/*
                Primary CTA button
                Uses Button component with appropriate variant
                On dark backgrounds: secondary (outlined) variant that stands out
                On light backgrounds: primary (filled) variant for contrast
              */}
              {primaryCTA && (
                <Button
                  variant={primaryButtonVariant}
                  size="lg"
                  onClick={primaryCTA.onClick}
                  className={
                    backgroundVariant === 'light'
                      ? 'bg-trust-blue hover:bg-trust-blue-600 text-white'
                      : 'border-white text-white hover:bg-white hover:text-navy'
                  }
                >
                  <a
                    href={primaryCTA.href}
                    className="flex items-center gap-2 no-underline text-inherit"
                  >
                    {primaryCTA.label}
                  </a>
                </Button>
              )}

              {/*
                Secondary CTA link
                Rendered as a text link with arrow icon
                Provides a less prominent alternative action
              */}
              {secondaryCTA && (
                <a
                  href={secondaryCTA.href}
                  className={`
                    inline-flex items-center gap-2
                    ${secondaryCTAColor}
                    font-semibold
                    no-underline
                    transition-colors duration-150
                    focus-visible:outline-2 focus-visible:outline-offset-2
                    ${backgroundVariant === 'light'
                      ? 'focus-visible:outline-trust-blue'
                      : 'focus-visible:outline-white'
                    }
                    group
                  `}
                >
                  {secondaryCTA.label}
                  {/* Arrow icon with hover animation */}
                  <ArrowRightIcon className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-1" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Display name for React DevTools
HeroSection.displayName = 'HeroSection';

export default HeroSection;

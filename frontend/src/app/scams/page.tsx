/**
 * Scams Index Page
 *
 * Lists all scam types with filtering by danger level.
 * Provides an overview of common scams targeting Jersey residents.
 *
 * Features:
 * - Breadcrumb navigation
 * - Page title and description
 * - Filter by danger level (all/high/medium/low)
 * - Responsive grid of scam type cards
 * - CTA section for suspicious messages
 *
 * @route /scams
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { scamTypes, getScamsByDangerLevel } from '@/content/scams';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import { Button } from '@/components/ui/Button';
import { ScamTypeCard } from '@/components/content/ScamTypeCard';
import { Icon, MessageSquare, AlertTriangle, ShieldAlert, Phone, AlertCircle } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import type { DangerLevel } from '@/content/scams';

/**
 * Page metadata for SEO
 */
export const metadata: Metadata = generatePageMetadata({
  title: 'Types of Scams',
  description:
    'Learn about common scams targeting Jersey residents and how to protect yourself. Includes bank impersonation, investment fraud, romance scams, and more.',
  path: '/scams',
});

/**
 * Breadcrumb items for the page
 */
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Scam Types' },
];

/**
 * Filter option configuration
 */
interface FilterOption {
  value: 'all' | DangerLevel;
  label: string;
  description: string;
}

const filterOptions: FilterOption[] = [
  { value: 'all', label: 'All Scams', description: 'View all scam types' },
  { value: 'high', label: 'High Risk', description: 'Most dangerous scams' },
  { value: 'medium', label: 'Medium Risk', description: 'Moderately risky scams' },
  { value: 'low', label: 'Low Risk', description: 'Lower risk scams' },
];

/**
 * Filter button styles based on active state
 */
function getFilterButtonStyles(isActive: boolean): string {
  const baseStyles = [
    'px-4 py-2',
    'text-sm font-medium',
    'rounded-lg',
    'transition-all duration-200',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trust-blue-500',
  ].join(' ');

  if (isActive) {
    return `${baseStyles} bg-navy text-white`;
  }
  return `${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200`;
}

/**
 * Props for the scams page (for filter state)
 */
interface ScamsPageProps {
  searchParams: Promise<{ filter?: string }>;
}

/**
 * ScamsPage Component
 *
 * Displays all scam types in a filterable grid layout.
 */
export default async function ScamsPage({ searchParams }: ScamsPageProps) {
  // Get filter from URL params (default to 'all')
  const params = await searchParams;
  const activeFilter = (params.filter as 'all' | DangerLevel) || 'all';

  // Get filtered scam types
  const filteredScams =
    activeFilter === 'all' ? scamTypes : getScamsByDangerLevel(activeFilter);

  // Count scams by danger level for filter badges
  const highCount = getScamsByDangerLevel('high').length;
  const mediumCount = getScamsByDangerLevel('medium').length;
  const lowCount = getScamsByDangerLevel('low').length;

  const filterCounts: Record<string, number> = {
    all: scamTypes.length,
    high: highCount,
    medium: mediumCount,
    low: lowCount,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} className="mb-4" />

          {/* Title and Subtitle */}
          <div className="max-w-3xl">
            <Heading level={1} className="mb-3">
              Types of Scams
            </Heading>
            <Text variant="lead" color="muted">
              Learn about common scams targeting Jersey residents and how to
              protect yourself.
            </Text>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <section
        className="bg-white border-b border-gray-200"
        aria-label="Filter scams by risk level"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <Text as="span" variant="small" color="muted" className="mr-2">
              Filter by risk:
            </Text>
            {filterOptions.map((option) => (
              <Link
                key={option.value}
                href={option.value === 'all' ? '/scams' : `/scams?filter=${option.value}`}
                className={getFilterButtonStyles(activeFilter === option.value)}
                aria-current={activeFilter === option.value ? 'page' : undefined}
                title={option.description}
              >
                {option.label}
                <span className="ml-1.5 text-xs opacity-75">
                  ({filterCounts[option.value]})
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scam Types Grid */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        aria-label="Scam types"
      >
        {/* Results count */}
        <div className="mb-6">
          <Text variant="small" color="muted">
            Showing {filteredScams.length}{' '}
            {filteredScams.length === 1 ? 'scam type' : 'scam types'}
            {activeFilter !== 'all' && (
              <span>
                {' '}
                with{' '}
                <span className="font-medium">
                  {activeFilter === 'high'
                    ? 'high'
                    : activeFilter === 'medium'
                      ? 'medium'
                      : 'low'}{' '}
                  risk
                </span>
              </span>
            )}
          </Text>
        </div>

        {/* Grid */}
        {filteredScams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredScams.map((scam) => (
              <ScamTypeCard
                key={scam.slug}
                icon={scam.icon as IconName}
                title={scam.title}
                description={scam.description}
                href={`/scams/${scam.slug}`}
                dangerLevel={scam.dangerLevel}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon
              name="Search"
              size="xl"
              className="mx-auto text-gray-400 mb-4"
              aria-hidden
            />
            <Heading level={3} className="mb-2">
              No scams found
            </Heading>
            <Text color="muted">
              No scam types match the selected filter. Try selecting a different
              risk level.
            </Text>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-navy" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Heading level={2} className="text-white mb-4" as="h2">
              <span id="cta-heading">Received something suspicious?</span>
            </Heading>
            <Text variant="lead" className="text-gray-300 mb-8">
              Not sure if a message, call, or email is a scam? Our AI-powered
              checker can help you identify warning signs.
            </Text>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/chat">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<MessageSquare size={20} aria-hidden />}
                  className="border-white text-white hover:bg-white hover:text-navy"
                >
                  Check a Message
                </Button>
              </Link>
              <Link href="/warning-signs">
                <Button
                  variant="ghost"
                  size="lg"
                  leftIcon={<AlertTriangle size={20} aria-hidden />}
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                >
                  View Warning Signs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section
        className="bg-white border-t border-gray-200"
        aria-labelledby="resources-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Heading level={2} className="mb-6" as="h2">
            <span id="resources-heading">Need Help?</span>
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Report a Scam */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <ShieldAlert
                size={24}
                className="text-alert-red-500 mb-4"
                aria-hidden
              />
              <Heading level={3} className="mb-2">
                Report a Scam
              </Heading>
              <Text variant="small" color="muted" className="mb-4">
                If you&apos;ve been targeted or lost money, report it immediately to
                help protect others.
              </Text>
              <Link
                href="/report"
                className="text-trust-blue-600 hover:text-trust-blue-700 font-medium text-sm"
              >
                Learn how to report &rarr;
              </Link>
            </div>

            {/* Contact JFSC */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <Phone
                size={24}
                className="text-trust-blue-500 mb-4"
                aria-hidden
              />
              <Heading level={3} className="mb-2">
                Contact JFSC
              </Heading>
              <Text variant="small" color="muted" className="mb-4">
                The Jersey Financial Services Commission can help with
                financial fraud concerns.
              </Text>
              <a
                href="tel:+441534822000"
                className="text-trust-blue-600 hover:text-trust-blue-700 font-medium text-sm"
              >
                +44 (0)1534 822000 &rarr;
              </a>
            </div>

            {/* Emergency */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <AlertCircle
                size={24}
                className="text-warning-500 mb-4"
                aria-hidden
              />
              <Heading level={3} className="mb-2">
                Emergency?
              </Heading>
              <Text variant="small" color="muted" className="mb-4">
                If you&apos;re in immediate danger or a crime is in progress, call
                emergency services right away.
              </Text>
              <a
                href="tel:999"
                className="text-alert-red-600 hover:text-alert-red-700 font-medium text-sm"
              >
                Call 999 &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * Dynamic Scam Type Page
 *
 * Individual page for each scam type, generated statically at build time.
 * Displays comprehensive information about a specific scam including:
 * - How it works (step-by-step visualization)
 * - Red flags to watch for
 * - What to do if targeted
 * - Related scam types
 *
 * @example URL: /scams/phishing, /scams/bank-impersonation
 */

import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Icon, IconName } from "@/components/ui/Icon";
import {
  StepVisualization,
  RedFlagChecklist,
  ActionSteps,
  ScamTypeCard,
} from "@/components/content";
import {
  scamTypes,
  getScamBySlug,
  getRelatedScams,
  type ScamType,
  type DangerLevel,
} from "@/content/scams";
import { generateScamMetadata } from "@/lib/metadata";

/**
 * Page props interface
 */
interface ScamPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all scam types
 * This enables static generation of all scam pages at build time
 */
export async function generateStaticParams() {
  return scamTypes.map((scam) => ({
    slug: scam.slug,
  }));
}

/**
 * Generate metadata for each scam page
 * Uses the scam's title and description for SEO
 */
export async function generateMetadata({
  params,
}: ScamPageProps): Promise<Metadata> {
  const { slug } = await params;
  const scam = getScamBySlug(slug);

  if (!scam) {
    return {
      title: "Scam Not Found | ScamAware Jersey",
      description: "The requested scam type could not be found.",
    };
  }

  return generateScamMetadata(scam);
}

/**
 * Maps danger levels to Badge variants
 */
const dangerLevelVariantMap: Record<
  DangerLevel,
  "danger" | "warning" | "success"
> = {
  high: "danger",
  medium: "warning",
  low: "success",
};

/**
 * Maps danger levels to display labels
 */
const dangerLevelLabelMap: Record<DangerLevel, string> = {
  high: "High Risk",
  medium: "Medium Risk",
  low: "Low Risk",
};

/**
 * Section heading component for consistent styling
 */
function SectionHeading({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="text-2xl md:text-3xl font-bold text-navy mb-6 scroll-mt-24"
    >
      {children}
    </h2>
  );
}

/**
 * ScamPage Component
 *
 * Displays detailed information about a specific scam type.
 * Includes how it works, red flags, actions to take, and related scams.
 */
export default async function ScamPage({ params }: ScamPageProps) {
  const { slug } = await params;
  const scam = getScamBySlug(slug);

  // Return 404 if scam not found
  if (!scam) {
    notFound();
  }

  // Get related scams (limit to 3)
  const relatedScams = getRelatedScams(slug).slice(0, 3);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Scams", href: "/scams" },
    { label: scam.title },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page content container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Page Header */}
        <header className="mb-10 md:mb-12">
          {/* Icon and Badge row */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={`
                w-16 h-16 md:w-20 md:h-20
                rounded-xl
                flex items-center justify-center
                ${scam.dangerLevel === "high" ? "bg-alert-red-50" : ""}
                ${scam.dangerLevel === "medium" ? "bg-warning-50" : ""}
                ${scam.dangerLevel === "low" ? "bg-success-50" : ""}
              `}
            >
              <Icon
                name={scam.icon as IconName}
                size="xl"
                className={`
                  ${scam.dangerLevel === "high" ? "text-alert-red-600" : ""}
                  ${scam.dangerLevel === "medium" ? "text-warning-600" : ""}
                  ${scam.dangerLevel === "low" ? "text-success-600" : ""}
                `}
                aria-hidden
              />
            </div>
            <Badge
              variant={dangerLevelVariantMap[scam.dangerLevel]}
              size="md"
              dot
            >
              {dangerLevelLabelMap[scam.dangerLevel]}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
            {scam.title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {scam.description}
          </p>
        </header>

        {/* How It Works Section */}
        <section className="mb-12 md:mb-16" aria-labelledby="how-it-works">
          <SectionHeading id="how-it-works">How It Works</SectionHeading>
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <StepVisualization
              steps={scam.howItWorks}
              variant="vertical"
              showConnectors={true}
            />
          </div>
        </section>

        {/* Red Flags Section */}
        <section className="mb-12 md:mb-16" aria-labelledby="red-flags">
          <SectionHeading id="red-flags">Red Flags to Watch For</SectionHeading>
          <RedFlagChecklist
            flags={scam.redFlags}
            expandable={true}
            variant="list"
          />
        </section>

        {/* What To Do Section */}
        <section className="mb-12 md:mb-16" aria-labelledby="what-to-do">
          <SectionHeading id="what-to-do">What To Do</SectionHeading>
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <ActionSteps steps={scam.actions} variant="numbered" />
          </div>
        </section>

        {/* Related Scams Section */}
        {relatedScams.length > 0 && (
          <section aria-labelledby="related-scams">
            <SectionHeading id="related-scams">Related Scams</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {relatedScams.map((relatedScam) => (
                <ScamTypeCard
                  key={relatedScam.slug}
                  icon={relatedScam.icon as IconName}
                  title={relatedScam.title}
                  description={relatedScam.description}
                  href={`/scams/${relatedScam.slug}`}
                  dangerLevel={relatedScam.dangerLevel}
                />
              ))}
            </div>
          </section>
        )}

        {/* Back to all scams link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/scams"
            className="inline-flex items-center gap-2 text-trust-blue-600 hover:text-trust-blue-700 font-medium transition-colors"
          >
            <Icon name="ChevronLeft" size="sm" aria-hidden />
            <span>View all scam types</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

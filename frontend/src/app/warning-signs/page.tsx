/**
 * Warning Signs Hub Page
 *
 * A comprehensive educational page about universal scam warning signs.
 * Helps Jersey residents identify potential scams through:
 * - Universal warning signs with examples
 * - Scam language decoder for common phrases
 * - Side-by-side comparisons of legitimate vs scam communications
 *
 * @route /warning-signs
 */

import { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { Heading } from "@/components/ui/Typography/Heading";
import { Text } from "@/components/ui/Typography/Text";
import { Button } from "@/components/ui/Button/Button";
import { WarningSignCard } from "@/components/content/WarningSignCard";
import { ScamLanguageDecoder } from "@/components/content/ScamLanguageDecoder";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { warningSigns } from "@/content/warning-signs";
import { scamPhrases } from "@/content/scam-language";
import { comparisonExamples } from "@/content/comparison-examples";

/**
 * Page metadata for SEO
 */
export const metadata: Metadata = generatePageMetadata({
  title: "Universal Warning Signs of a Scam",
  description:
    "Learn the 10 universal warning signs that indicate a potential scam. Recognize common scam phrases, compare legitimate vs fraudulent communications, and protect yourself from fraud.",
  path: "/warning-signs",
});

/**
 * Breadcrumb navigation items
 */
const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Warning Signs" },
];

/**
 * Warning Signs Hub Page Component
 *
 * Displays comprehensive educational content about identifying scams:
 * 1. Page header with breadcrumb navigation
 * 2. Grid of all 10 warning sign cards
 * 3. Scam language decoder section
 * 4. Comparison tables showing legitimate vs scam characteristics
 * 5. Call-to-action section for further assistance
 */
export default function WarningSignsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header Section */}
      <section className="bg-navy py-12 md:py-16">
        <div className="container-custom">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={breadcrumbItems}
            className="mb-6 [&_a]:text-gray-300 [&_a:hover]:text-white [&_span[aria-current]]:text-white"
          />

          {/* Page Title */}
          <Heading
            level={1}
            className="text-white text-3xl md:text-4xl lg:text-5xl mb-4"
          >
            Universal Warning Signs of a Scam
          </Heading>

          {/* Subtitle */}
          <Text
            variant="lead"
            className="text-gray-200 max-w-3xl"
          >
            Scammers use a variety of tactics to deceive their victims. By
            learning to recognise these universal warning signs, you can protect
            yourself and your loved ones from fraud. If you spot any of these
            red flags, stop and verify before taking action.
          </Text>
        </div>
      </section>

      {/* Warning Signs Grid Section */}
      <section className="py-12 md:py-16" aria-labelledby="warning-signs-heading">
        <div className="container-custom">
          <Heading level={2} className="mb-8">
            <span id="warning-signs-heading">The 10 Warning Signs</span>
          </Heading>

          <Text color="muted" className="mb-8 max-w-3xl">
            Each of these warning signs is a common tactic used by scammers.
            Click on any card to see real-world examples of how scammers use
            these techniques.
          </Text>

          {/* Warning Signs Card Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {warningSigns.map((sign) => (
              <WarningSignCard
                key={sign.id}
                icon={sign.icon}
                title={sign.title}
                description={sign.description}
                examples={sign.examples}
                expandable
                defaultExpanded={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Scam Language Decoder Section */}
      <section
        className="py-12 md:py-16 bg-white"
        aria-labelledby="decoder-heading"
      >
        <div className="container-custom">
          <ScamLanguageDecoder
            phrases={scamPhrases}
            title="Scam Language Decoder"
            description="Scammers often use specific phrases designed to manipulate, pressure, or deceive you. Learn what these common phrases really mean and how to respond when you hear them."
            searchable
            limit={6}
          />
        </div>
      </section>

      {/* Comparison Section - Spot the Difference */}
      <section
        className="py-12 md:py-16"
        aria-labelledby="comparison-heading"
      >
        <div className="container-custom">
          <Heading level={2} className="mb-4">
            <span id="comparison-heading">Spot the Difference</span>
          </Heading>

          <Text color="muted" className="mb-10 max-w-3xl">
            Knowing the difference between legitimate communications and scams
            can save you from becoming a victim. Use these side-by-side
            comparisons to help identify suspicious contacts.
          </Text>

          {/* Comparison Tables */}
          <div className="space-y-12">
            {comparisonExamples.map((example, index) => (
              <ComparisonTable
                key={index}
                category={example.category}
                legitimate={example.legitimate}
                scam={example.scam}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-12 md:py-16 bg-trust-blue-50 border-t border-trust-blue-100"
        aria-labelledby="cta-heading"
      >
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <Heading level={2} className="mb-4">
              <span id="cta-heading">Still Unsure?</span>
            </Heading>

            <Text className="mb-8 text-gray-600">
              If you have received a suspicious message or call and are not sure
              whether it is a scam, we can help. Use our AI-powered checker to
              analyse the message, or if you think you may have already been
              scammed, check our emergency guide for immediate steps to take.
            </Text>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/check" className="no-underline">
                <Button variant="primary" size="lg">
                  Check a Message
                </Button>
              </Link>

              <Link href="/emergency" className="no-underline">
                <Button variant="secondary" size="lg">
                  Emergency Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

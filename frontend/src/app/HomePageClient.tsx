"use client";

/**
 * HomePageClient Component
 *
 * Client-side component for the ScamAware Jersey homepage.
 * Handles interactive elements including:
 * - Chat button onClick handler
 * - Dismissible emergency banner
 *
 * This component receives data from the server component and renders
 * all homepage sections with proper interactivity.
 */

import React from "react";
import Link from "next/link";
import {
  HeroSection,
  EmergencyBanner,
  ScamTypeCard,
  AlertPreview,
  type AlertCategory,
} from "@/components/content";
import { Text } from "@/components/ui/Typography/Text";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { ScamType } from "@/content/scams";
import type { WarningSign } from "@/content/warning-signs";

/**
 * Alert data structure for the alerts section
 */
interface AlertData {
  id: string;
  title: string;
  date: string;
  category: AlertCategory;
  summary?: string;
  href: string;
}

/**
 * Props for the HomePageClient component
 */
interface HomePageClientProps {
  /** Array of all scam types to display in the grid */
  scamTypes: ScamType[];
  /** Array of recent alerts to display */
  alerts: AlertData[];
  /** Array of warning signs for the teaser section */
  warningSigns: WarningSign[];
}

/**
 * HomePageClient Component
 *
 * Renders the complete homepage with all sections and interactive elements.
 */
export function HomePageClient({
  scamTypes,
  alerts,
  warningSigns,
}: HomePageClientProps) {
  /**
   * Handler for "Check a message" CTA
   * Opens the chat interface (placeholder implementation)
   */
  const handleOpenChat = () => {
    // TODO: Implement chat opening in Sprint 4/5
    // For now, this is a placeholder that could:
    // - Open a chat modal
    // - Navigate to a chat page
    // - Trigger a chat widget
    console.log("Chat button clicked - chat implementation coming in Sprint 4/5");
  };

  return (
    <main>
      {/* ============================================
          Section 1: Hero Section
          Navy background with main CTAs
          ============================================ */}
      <HeroSection
        title="Think you've received a scam? We can help you check."
        subtitle="ScamAware Jersey helps you identify suspicious messages and protect yourself from fraud."
        primaryCTA={{
          label: "Check a message",
          href: "#chat",
          onClick: handleOpenChat,
        }}
        secondaryCTA={{
          label: "I've been scammed",
          href: "/help/ive-been-scammed",
        }}
        backgroundVariant="navy"
        size="lg"
      />

      {/* ============================================
          Section 2: Emergency Banner
          Dismissible banner for scam victims
          ============================================ */}
      <EmergencyBanner dismissible />

      {/* ============================================
          Section 3: Common Scams in Jersey
          Responsive grid of scam type cards
          ============================================ */}
      <section
        className="py-12 md:py-16 lg:py-20 bg-gray-50"
        aria-labelledby="scam-types-heading"
      >
        <div className="container-custom">
          {/* Section header */}
          <div className="text-center mb-8 md:mb-12">
            <h2
              id="scam-types-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy leading-tight mb-4"
            >
              Common Scams in Jersey
            </h2>
            <Text
              variant="body"
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Learn about the most prevalent scams targeting Jersey residents
              and how to protect yourself.
            </Text>
          </div>

          {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {scamTypes.map((scam) => (
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
        </div>
      </section>

      {/* ============================================
          Section 4: Latest Alerts
          Recent scam alerts with link to all alerts
          ============================================ */}
      <section
        className="py-12 md:py-16 lg:py-20 bg-white"
        aria-labelledby="alerts-heading"
      >
        <div className="container-custom">
          {/* Section header with "View all" link */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-12">
            <h2
              id="alerts-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy leading-tight"
            >
              Latest Alerts
            </h2>
            <Link
              href="/alerts"
              className="inline-flex items-center gap-2 text-trust-blue font-semibold hover:text-trust-blue-700 transition-colors group"
            >
              View all alerts
              <Icon
                name="ArrowRight"
                size="sm"
                className="transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>

          {/* Alerts grid or empty state */}
          {alerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {alerts.map((alert) => (
                <AlertPreview
                  key={alert.id}
                  title={alert.title}
                  date={alert.date}
                  category={alert.category}
                  summary={alert.summary}
                  href={alert.href}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Icon
                name="Bell"
                size="lg"
                className="text-gray-400 mx-auto mb-4"
                aria-hidden
              />
              <Text variant="body" className="text-gray-600">
                No alerts at this time. Check back later for updates.
              </Text>
            </div>
          )}
        </div>
      </section>

      {/* ============================================
          Section 5: Warning Signs Teaser
          Brief section linking to full warning signs page
          ============================================ */}
      <section
        className="py-12 md:py-16 lg:py-20 bg-navy text-white"
        aria-labelledby="warning-signs-heading"
      >
        <div className="container-custom">
          {/* Section header */}
          <div className="text-center mb-8 md:mb-12">
            <h2
              id="warning-signs-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4"
            >
              Know the Warning Signs
            </h2>
            <Text
              variant="body"
              className="text-gray-200 max-w-2xl mx-auto"
            >
              Recognising common scam tactics is your first line of defence.
              Here are some key signs to watch for.
            </Text>
          </div>

          {/* Warning signs quick tips grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {warningSigns.map((sign) => (
              <div
                key={sign.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-white/20"
              >
                {/* Icon */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                  <Icon
                    name={sign.icon as IconName}
                    size="md"
                    className="text-amber-400"
                    aria-hidden
                  />
                </div>
                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {sign.title}
                </h3>
                {/* Brief description - truncated for teaser */}
                <p className="text-sm text-gray-300 line-clamp-2">
                  {sign.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA to full warning signs page */}
          <div className="text-center">
            <Link
              href="/warning-signs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-navy font-semibold rounded-md hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white group"
            >
              See all warning signs
              <Icon
                name="ArrowRight"
                size="sm"
                className="transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePageClient;

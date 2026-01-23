/**
 * ScamAware Jersey Homepage
 *
 * The main landing page for ScamAware Jersey, integrating all key content
 * sections to help Jersey residents identify and protect against scams.
 *
 * Sections:
 * 1. Hero Section - Main call-to-action with chat prompt
 * 2. Emergency Banner - Dismissible banner for scam victims
 * 3. Scam Types Grid - All 9 scam types displayed as cards
 * 4. Latest Alerts - Recent scam alerts with link to all
 * 5. Warning Signs Teaser - Quick tips linking to full guide
 */

import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { scamTypes } from "@/content/scams";
import { warningSigns } from "@/content/warning-signs";
import { HomePageClient } from "./HomePageClient";

/**
 * Page metadata for SEO and social sharing
 */
export const metadata: Metadata = generatePageMetadata({
  title: "Home",
  description:
    "ScamAware Jersey helps you identify suspicious messages and protect yourself from fraud. Learn about common scams, check suspicious messages, and get help if you have been scammed.",
  path: "/",
});

/**
 * Mock alerts data for display
 * Real API integration will come in Sprint 6
 */
const mockAlerts = [
  {
    id: "1",
    title: "JFSC Warning: Fake Investment Schemes Targeting Jersey Residents",
    date: "2024-01-22T10:00:00Z",
    category: "warning" as const,
    summary:
      "The Jersey Financial Services Commission has issued an urgent warning about fraudulent investment schemes claiming guaranteed high returns.",
    href: "/alerts/fake-investment-schemes-january-2024",
  },
  {
    id: "2",
    title: "New Phishing Campaign Impersonating Local Banks",
    date: "2024-01-20T14:30:00Z",
    category: "warning" as const,
    summary:
      "Reports of sophisticated phishing emails mimicking Jersey banks. Messages claim account verification is required urgently.",
    href: "/alerts/bank-phishing-campaign-january-2024",
  },
  {
    id: "3",
    title: "ScamAware Jersey Launches New AI Chat Assistant",
    date: "2024-01-18T09:00:00Z",
    category: "news" as const,
    summary:
      "Our new AI-powered chat assistant can help you check suspicious messages and identify potential scams in seconds.",
    href: "/alerts/ai-chat-assistant-launch",
  },
];

/**
 * Select first 4 warning signs for the teaser section
 */
const featuredWarningSigns = warningSigns.slice(0, 4);

/**
 * Homepage Component
 *
 * Server component that renders the main ScamAware Jersey homepage
 * with all integrated content sections.
 */
export default function Home() {
  return (
    <HomePageClient
      scamTypes={scamTypes}
      alerts={mockAlerts}
      warningSigns={featuredWarningSigns}
    />
  );
}

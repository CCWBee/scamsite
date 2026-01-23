/**
 * 404 Not Found Page
 *
 * Custom 404 error page for ScamAware Jersey with JFSC-styled design.
 * Provides helpful navigation links to guide users back to useful content.
 *
 * Features:
 * - Friendly error message
 * - JFSC brand styling
 * - Quick links to key pages
 * - Search suggestion
 * - Emergency help access
 */

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found. Browse our resources on scam protection and fraud awareness.",
};

/**
 * Quick navigation links for the 404 page
 */
const quickLinks = [
  {
    label: "Homepage",
    href: "/",
    description: "Return to the main page",
    icon: "home",
  },
  {
    label: "Scam Types",
    href: "/scams",
    description: "Learn about different types of scams",
    icon: "shield",
  },
  {
    label: "Warning Signs",
    href: "/warning-signs",
    description: "Recognize the signs of a scam",
    icon: "alert",
  },
  {
    label: "Emergency Help",
    href: "/help/ive-been-scammed",
    description: "Get help if you've been scammed",
    icon: "emergency",
    highlight: true,
  },
];

/**
 * Icon component for quick links
 */
function LinkIcon({ type }: { type: string }) {
  const iconPaths: Record<string, React.ReactNode> = {
    home: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    ),
    shield: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
    alert: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    ),
    emergency: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    ),
  };

  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      {iconPaths[type] || iconPaths.home}
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--color-navy)] transition-opacity hover:opacity-80"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-lg font-bold md:text-xl">ScamAware Jersey</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        <div className="text-center">
          {/* 404 illustration */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="text-[120px] font-bold leading-none text-[var(--color-navy-100)] md:text-[180px]">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="h-20 w-20 text-[var(--color-trust-blue)] md:h-28 md:w-28"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Error message */}
          <h1 className="mb-4 text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
            Page Not Found
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-lg text-[var(--color-gray-600)]">
            Sorry, we could not find the page you are looking for. It may have been moved,
            deleted, or the URL might be incorrect.
          </p>

          {/* Search suggestion */}
          <div className="mb-12 rounded-lg bg-[var(--color-trust-blue-50)] p-6">
            <p className="mb-4 text-[var(--color-trust-blue-700)]">
              <strong>Looking for something specific?</strong> Try using our search
              or browse the quick links below to find what you need.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-trust-blue)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-trust-blue-700)]"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search ScamAware Jersey
            </Link>
          </div>

          {/* Quick links */}
          <div className="mb-12">
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-navy)]">
              Quick Links
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    group flex flex-col items-center rounded-lg border-2 p-6 text-center
                    transition-all duration-[var(--transition-fast)]
                    ${
                      link.highlight
                        ? "border-[var(--color-alert-red)] bg-[var(--color-alert-red-50)] hover:bg-[var(--color-alert-red)] hover:text-white"
                        : "border-[var(--color-gray-200)] bg-white hover:border-[var(--color-trust-blue)] hover:shadow-md"
                    }
                  `}
                >
                  <div
                    className={`
                      mb-3 rounded-full p-3
                      ${
                        link.highlight
                          ? "bg-[var(--color-alert-red-100)] text-[var(--color-alert-red)] group-hover:bg-white/20 group-hover:text-white"
                          : "bg-[var(--color-navy-50)] text-[var(--color-navy)] group-hover:bg-[var(--color-trust-blue-50)] group-hover:text-[var(--color-trust-blue)]"
                      }
                    `}
                  >
                    <LinkIcon type={link.icon} />
                  </div>
                  <h3
                    className={`
                      mb-1 font-semibold
                      ${link.highlight ? "text-[var(--color-alert-red-700)] group-hover:text-white" : "text-[var(--color-navy)]"}
                    `}
                  >
                    {link.label}
                  </h3>
                  <p
                    className={`
                      text-sm
                      ${link.highlight ? "text-[var(--color-alert-red-600)] group-hover:text-white/80" : "text-[var(--color-gray-600)]"}
                    `}
                  >
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact information */}
          <div className="rounded-lg bg-[var(--color-navy)] p-6 text-white">
            <h2 className="mb-4 text-lg font-semibold">Need Immediate Help?</h2>
            <p className="mb-4 text-[var(--color-navy-200)]">
              If you believe you have been the victim of a scam, contact the authorities immediately.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:01534612612"
                className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-alert-red)] px-4 py-2 font-semibold text-white transition-colors hover:bg-[var(--color-alert-red-700)]"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Police Fraud Line: 01534 612612
              </a>
              <a
                href="tel:+441534822000"
                className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-white/10 px-4 py-2 font-semibold text-white transition-colors hover:bg-white/20"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                JFSC: +44 (0)1534 822000
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-gray-200)] bg-white py-6">
        <div className="mx-auto max-w-[1200px] px-4 text-center text-sm text-[var(--color-gray-600)] md:px-6">
          <p>
            &copy; {new Date().getFullYear()} ScamAware Jersey. Helping Jersey residents
            stay safe from scams.
          </p>
        </div>
      </footer>
    </div>
  );
}

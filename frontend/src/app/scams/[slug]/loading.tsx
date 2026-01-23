/**
 * Scam Page Loading Component
 *
 * Loading state for individual scam type detail pages.
 * Matches the layout of a typical scam detail page with:
 * - Breadcrumb navigation skeleton
 * - Hero section with title and description
 * - Warning signs checklist skeleton
 * - How it works steps skeleton
 * - Protection tips skeleton
 * - Related resources skeleton
 *
 * Features:
 * - Shimmer animation for visual feedback
 * - Accessible loading indicators
 * - Layout matches actual scam detail page structure
 */

import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

export default function ScamPageLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Skeleton width={32} height={32} rounded="md" />
            <Skeleton width={140} height={24} rounded="sm" className="hidden sm:block" />
          </div>
          <nav className="hidden md:flex md:items-center md:gap-2">
            <Skeleton width={60} height={32} rounded="md" />
            <Skeleton width={80} height={32} rounded="md" />
            <Skeleton width={100} height={32} rounded="md" />
            <Skeleton width={60} height={32} rounded="md" />
            <Skeleton width={80} height={32} rounded="md" />
            <Skeleton width={110} height={32} rounded="md" />
          </nav>
          <div className="md:hidden">
            <Skeleton width={40} height={40} rounded="md" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        {/* Breadcrumb skeleton */}
        <nav className="mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Skeleton width={50} height={16} rounded="sm" />
            <Skeleton width={8} height={16} rounded="sm" />
            <Skeleton width={80} height={16} rounded="sm" />
            <Skeleton width={8} height={16} rounded="sm" />
            <Skeleton width={120} height={16} rounded="sm" />
          </div>
        </nav>

        {/* Hero section skeleton */}
        <section className="mb-10 rounded-xl bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4 md:gap-6">
            {/* Icon placeholder */}
            <Skeleton
              width={64}
              height={64}
              rounded="lg"
              className="shrink-0 md:h-20 md:w-20"
            />
            <div className="flex-1">
              {/* Badge skeleton */}
              <Skeleton width={100} height={24} rounded="full" className="mb-3" />
              {/* Title skeleton */}
              <Skeleton width="70%" height={36} rounded="sm" className="mb-4" />
              {/* Description skeleton */}
              <SkeletonText lines={3} className="mb-6" />
              {/* Alert banner skeleton */}
              <div className="rounded-lg bg-[var(--color-alert-red-50)] p-4">
                <div className="flex items-start gap-3">
                  <Skeleton width={20} height={20} rounded="full" className="shrink-0 mt-0.5" />
                  <SkeletonText lines={2} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Warning Signs section skeleton */}
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Skeleton width={28} height={28} rounded="md" />
                <Skeleton width={180} height={28} rounded="sm" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-[var(--color-gray-200)] p-4"
                  >
                    <Skeleton width={24} height={24} rounded="md" className="shrink-0" />
                    <div className="flex-1">
                      <Skeleton width="80%" height={18} rounded="sm" className="mb-2" />
                      <Skeleton width="60%" height={14} rounded="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* How It Works section skeleton */}
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Skeleton width={28} height={28} rounded="md" />
                <Skeleton width={150} height={28} rounded="sm" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton
                      width={40}
                      height={40}
                      rounded="full"
                      className="shrink-0"
                    />
                    <div className="flex-1 border-l-2 border-[var(--color-gray-200)] pl-4 pb-4">
                      <Skeleton width="50%" height={20} rounded="sm" className="mb-2" />
                      <SkeletonText lines={2} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Protection Tips section skeleton */}
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Skeleton width={28} height={28} rounded="md" />
                <Skeleton width={200} height={28} rounded="sm" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-[var(--color-success-50)] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Skeleton width={24} height={24} rounded="full" className="shrink-0" />
                      <SkeletonText lines={2} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar column */}
          <div className="space-y-6">
            {/* Quick Actions skeleton */}
            <div className="rounded-xl bg-[var(--color-navy)] p-6 text-white">
              <Skeleton
                width="80%"
                height={24}
                rounded="sm"
                className="mb-4 bg-white/20"
              />
              <div className="space-y-3">
                <Skeleton height={44} rounded="md" className="bg-white/20" />
                <Skeleton height={44} rounded="md" className="bg-white/20" />
              </div>
            </div>

            {/* Related Scams skeleton */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <Skeleton width={140} height={24} rounded="sm" className="mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-[var(--color-gray-200)] p-3"
                  >
                    <Skeleton width={40} height={40} rounded="md" className="shrink-0" />
                    <div className="flex-1">
                      <Skeleton width="80%" height={16} rounded="sm" className="mb-1" />
                      <Skeleton width="60%" height={12} rounded="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources skeleton */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <Skeleton width={120} height={24} rounded="sm" className="mb-4" />
              <div className="space-y-2">
                <Skeleton height={40} rounded="md" />
                <Skeleton height={40} rounded="md" />
                <Skeleton height={40} rounded="md" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Loading scam information...
      </div>
    </div>
  );
}

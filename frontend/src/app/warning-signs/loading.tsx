/**
 * Warning Signs Page Loading Component
 *
 * Loading state for the warning signs overview page.
 * Matches the layout of the warning signs page with:
 * - Hero section skeleton
 * - Category filter skeleton
 * - Warning sign cards grid skeleton
 * - Interactive checklist skeleton
 *
 * Features:
 * - Shimmer animation for visual feedback
 * - Accessible loading indicators
 * - Layout matches actual warning signs page structure
 */

import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui/Skeleton";

export default function WarningSingsLoading() {
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
            <Skeleton width={100} height={16} rounded="sm" />
          </div>
        </nav>

        {/* Hero section skeleton */}
        <section className="mb-10 text-center">
          <Skeleton
            width="50%"
            height={40}
            rounded="md"
            className="mx-auto mb-4"
          />
          <Skeleton
            width="70%"
            height={24}
            rounded="sm"
            className="mx-auto mb-2"
          />
          <Skeleton
            width="60%"
            height={24}
            rounded="sm"
            className="mx-auto"
          />
        </section>

        {/* Quick stats skeleton */}
        <section className="mb-10 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-white p-6 text-center shadow-sm"
            >
              <Skeleton width={64} height={64} rounded="full" className="mx-auto mb-3" />
              <Skeleton width={48} height={32} rounded="sm" className="mx-auto mb-2" />
              <Skeleton width={100} height={16} rounded="sm" className="mx-auto" />
            </div>
          ))}
        </section>

        {/* Category filters skeleton */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton width={80} height={20} rounded="sm" />
            <div className="flex flex-wrap gap-2">
              <Skeleton width={60} height={36} rounded="full" />
              <Skeleton width={90} height={36} rounded="full" />
              <Skeleton width={75} height={36} rounded="full" />
              <Skeleton width={100} height={36} rounded="full" />
              <Skeleton width={85} height={36} rounded="full" />
            </div>
          </div>
        </section>

        {/* Warning signs grid skeleton */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <Skeleton width={200} height={28} rounded="sm" />
            <Skeleton width={120} height={36} rounded="md" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                {/* Icon and badge row */}
                <div className="mb-4 flex items-start justify-between">
                  <Skeleton width={48} height={48} rounded="lg" />
                  <Skeleton width={80} height={24} rounded="full" />
                </div>
                {/* Title */}
                <Skeleton width="80%" height={24} rounded="sm" className="mb-3" />
                {/* Description */}
                <SkeletonText lines={2} className="mb-4" />
                {/* Severity indicator */}
                <div className="flex items-center gap-2">
                  <Skeleton width={16} height={16} rounded="full" />
                  <Skeleton width={60} height={14} rounded="sm" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive checklist section skeleton */}
        <section className="mb-12 rounded-xl bg-[var(--color-warning-50)] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <Skeleton width={48} height={48} rounded="lg" className="shrink-0" />
            <div className="flex-1">
              <Skeleton width="40%" height={28} rounded="sm" className="mb-4" />
              <SkeletonText lines={2} className="mb-6" />

              {/* Checklist items skeleton */}
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg bg-white p-4"
                  >
                    <Skeleton width={24} height={24} rounded="md" className="shrink-0" />
                    <Skeleton width="85%" height={18} rounded="sm" />
                  </div>
                ))}
              </div>

              {/* Result area skeleton */}
              <div className="mt-6">
                <Skeleton width={150} height={44} rounded="md" />
              </div>
            </div>
          </div>
        </section>

        {/* Resources section skeleton */}
        <section className="rounded-xl bg-white p-6 shadow-sm md:p-8">
          <Skeleton width={180} height={28} rounded="sm" className="mb-6" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-lg border border-[var(--color-gray-200)] p-4"
              >
                <Skeleton width={40} height={40} rounded="md" className="shrink-0" />
                <div className="flex-1">
                  <Skeleton width="70%" height={18} rounded="sm" className="mb-2" />
                  <Skeleton width="90%" height={14} rounded="sm" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Emergency banner skeleton */}
      <aside className="bg-[var(--color-alert-red-50)] py-6">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <Skeleton width={32} height={32} rounded="full" className="shrink-0" />
              <Skeleton width={250} height={20} rounded="sm" />
            </div>
            <Skeleton width={180} height={44} rounded="md" />
          </div>
        </div>
      </aside>

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Loading warning signs information...
      </div>
    </div>
  );
}

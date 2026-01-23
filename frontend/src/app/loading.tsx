/**
 * Root Loading Component
 *
 * Global loading state for the ScamAware Jersey application.
 * Displayed during route transitions and data fetching at the root level.
 *
 * Features:
 * - Skeleton layout matching typical page structure
 * - Header skeleton with navigation placeholders
 * - Main content skeleton with hero and card sections
 * - Shimmer animation for visual feedback
 * - Accessible loading indicators
 */

import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-6">
          {/* Logo skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton width={32} height={32} rounded="md" />
            <Skeleton width={140} height={24} rounded="sm" className="hidden sm:block" />
          </div>

          {/* Navigation skeleton (desktop) */}
          <nav className="hidden md:flex md:items-center md:gap-2">
            <Skeleton width={60} height={32} rounded="md" />
            <Skeleton width={80} height={32} rounded="md" />
            <Skeleton width={100} height={32} rounded="md" />
            <Skeleton width={60} height={32} rounded="md" />
            <Skeleton width={80} height={32} rounded="md" />
            <Skeleton width={110} height={32} rounded="md" />
          </nav>

          {/* Mobile menu button skeleton */}
          <div className="md:hidden">
            <Skeleton width={40} height={40} rounded="md" />
          </div>
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
        {/* Hero section skeleton */}
        <section className="mb-12 text-center">
          <Skeleton
            width="60%"
            height={48}
            rounded="md"
            className="mx-auto mb-4"
          />
          <Skeleton
            width="80%"
            height={24}
            rounded="sm"
            className="mx-auto mb-2"
          />
          <Skeleton
            width="70%"
            height={24}
            rounded="sm"
            className="mx-auto mb-6"
          />
          <div className="flex justify-center gap-4">
            <Skeleton width={150} height={48} rounded="md" />
            <Skeleton width={150} height={48} rounded="md" />
          </div>
        </section>

        {/* Featured content skeleton */}
        <section className="mb-12">
          <Skeleton width={200} height={32} rounded="sm" className="mb-6" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SkeletonCard hasImage={false} lines={3} />
            <SkeletonCard hasImage={false} lines={3} />
            <SkeletonCard hasImage={false} lines={3} />
          </div>
        </section>

        {/* Secondary content skeleton */}
        <section className="mb-12">
          <Skeleton width={180} height={32} rounded="sm" className="mb-6" />
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <Skeleton width={48} height={48} rounded="full" className="mb-4" />
              <Skeleton width="70%" height={24} rounded="sm" className="mb-3" />
              <SkeletonText lines={3} />
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <Skeleton width={48} height={48} rounded="full" className="mb-4" />
              <Skeleton width="70%" height={24} rounded="sm" className="mb-3" />
              <SkeletonText lines={3} />
            </div>
          </div>
        </section>

        {/* Alert banner skeleton */}
        <section className="rounded-lg bg-[var(--color-navy-50)] p-6">
          <div className="flex items-start gap-4">
            <Skeleton width={40} height={40} rounded="full" className="shrink-0" />
            <div className="flex-1">
              <Skeleton width="50%" height={24} rounded="sm" className="mb-3" />
              <SkeletonText lines={2} />
              <Skeleton width={120} height={40} rounded="md" className="mt-4" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer skeleton */}
      <footer className="border-t border-[var(--color-gray-200)] bg-white py-8">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Footer column skeletons */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton width={100} height={20} rounded="sm" className="mb-4" />
                <div className="space-y-2">
                  <Skeleton width="80%" height={16} rounded="sm" />
                  <Skeleton width="60%" height={16} rounded="sm" />
                  <Skeleton width="70%" height={16} rounded="sm" />
                  <Skeleton width="50%" height={16} rounded="sm" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-[var(--color-gray-200)] pt-6">
            <Skeleton width={300} height={16} rounded="sm" className="mx-auto" />
          </div>
        </div>
      </footer>

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Loading page content...
      </div>
    </div>
  );
}

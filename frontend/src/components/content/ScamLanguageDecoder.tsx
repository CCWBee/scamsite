/**
 * ScamLanguageDecoder Component
 *
 * A component that displays common scam phrases with explanations and recommended actions.
 * Designed to help Jersey residents recognize deceptive language patterns used by scammers.
 *
 * Features:
 * - Card-based layout with visual distinction between phrase, meaning, and action
 * - Optional search/filter functionality for finding specific phrases
 * - Optional "Show more/less" pagination for managing large lists
 * - Accessible with proper semantic markup and keyboard navigation
 * - Responsive design for mobile and desktop viewing
 *
 * @example
 * // Basic usage
 * <ScamLanguageDecoder phrases={scamPhrases} />
 *
 * @example
 * // With search and limit
 * <ScamLanguageDecoder
 *   phrases={scamPhrases}
 *   searchable
 *   limit={5}
 * />
 */

"use client";

import React, { useState, useMemo, useId } from "react";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";

/**
 * Represents a single scam phrase with its explanation and recommended action
 */
export interface ScamPhrase {
  /**
   * The scam phrase displayed in quotes with emphasis
   * @example "You've been selected for an exclusive offer!"
   */
  phrase: string;

  /**
   * Explanation of what the phrase really means
   * @example "Scammers use urgency and exclusivity to make you feel special and rush your decision"
   */
  meaning: string;

  /**
   * Recommended action the user should take
   * @example "Legitimate offers don't require immediate decisions. Take time to research."
   */
  whatToDo: string;
}

/**
 * Props for the ScamLanguageDecoder component
 */
export interface ScamLanguageDecoderProps {
  /**
   * Array of scam phrases to display
   */
  phrases: ScamPhrase[];

  /**
   * Whether to show a search input for filtering phrases
   * @default false
   */
  searchable?: boolean;

  /**
   * Maximum number of phrases to show initially.
   * When set, displays a "Show more" button to reveal additional items.
   * @default undefined (shows all)
   */
  limit?: number;

  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;

  /**
   * Title for the component section
   * @default "Scam Language Decoder"
   */
  title?: string;

  /**
   * Description text displayed below the title
   */
  description?: string;
}

/**
 * Props for the individual phrase card component
 */
interface PhraseCardProps {
  /** The scam phrase data to display */
  phrase: ScamPhrase;
  /** Unique identifier for accessibility */
  id: string;
}

/**
 * PhraseCard Component
 *
 * Renders a single scam phrase with its meaning and recommended action.
 * Uses visual hierarchy to distinguish between the phrase, explanation, and action.
 */
const PhraseCard: React.FC<PhraseCardProps> = ({ phrase, id }) => {
  return (
    <Card
      variant="outlined"
      className="hover:border-trust-blue-300 transition-colors duration-200"
    >
      <CardContent className="space-y-4">
        {/* Scam Phrase - displayed in quotes with emphasis */}
        <div className="relative">
          <div
            className="absolute -left-1 top-0 text-4xl text-trust-blue-200 font-serif leading-none select-none"
            aria-hidden="true"
          >
            &ldquo;
          </div>
          <p
            id={`${id}-phrase`}
            className="text-lg md:text-xl font-semibold text-navy pl-6 pr-2 italic"
          >
            {phrase.phrase}
          </p>
          <div
            className="absolute -right-1 bottom-0 text-4xl text-trust-blue-200 font-serif leading-none select-none"
            aria-hidden="true"
          >
            &rdquo;
          </div>
        </div>

        {/* What it means - explanation section */}
        <div className="border-l-4 border-warning-400 pl-4 bg-warning-50 py-3 rounded-r-md">
          <div className="flex items-start gap-2">
            <Icon
              name="TriangleAlert"
              size="sm"
              className="text-warning-600 mt-0.5 flex-shrink-0"
              aria-hidden
            />
            <div>
              <h4 className="text-sm font-semibold text-warning-800 mb-1">
                What it means
              </h4>
              <p
                id={`${id}-meaning`}
                className="text-sm text-warning-900"
              >
                {phrase.meaning}
              </p>
            </div>
          </div>
        </div>

        {/* What to do - action section */}
        <div className="border-l-4 border-success-500 pl-4 bg-success-50 py-3 rounded-r-md">
          <div className="flex items-start gap-2">
            <Icon
              name="ShieldCheck"
              size="sm"
              className="text-success-600 mt-0.5 flex-shrink-0"
              aria-hidden
            />
            <div>
              <h4 className="text-sm font-semibold text-success-800 mb-1">
                What to do
              </h4>
              <p
                id={`${id}-action`}
                className="text-sm text-success-900"
              >
                {phrase.whatToDo}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * ScamLanguageDecoder Component
 *
 * Displays a collection of common scam phrases with explanations and recommended actions.
 * Helps users identify deceptive language patterns commonly used by scammers.
 *
 * @example
 * const phrases = [
 *   {
 *     phrase: "Act now or lose this opportunity forever!",
 *     meaning: "Scammers create artificial urgency to prevent you from thinking clearly.",
 *     whatToDo: "Take your time. Legitimate offers will still be available after you've done your research."
 *   }
 * ];
 *
 * <ScamLanguageDecoder phrases={phrases} searchable limit={5} />
 */
export function ScamLanguageDecoder({
  phrases,
  searchable = false,
  limit,
  className = "",
  title = "Scam Language Decoder",
  description,
}: ScamLanguageDecoderProps) {
  // Generate unique IDs for accessibility
  const componentId = useId();

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("");

  // State for show more/less functionality
  const [showAll, setShowAll] = useState(false);

  /**
   * Filter phrases based on search query
   * Searches in phrase, meaning, and whatToDo fields
   */
  const filteredPhrases = useMemo(() => {
    if (!searchQuery.trim()) {
      return phrases;
    }

    const query = searchQuery.toLowerCase().trim();
    return phrases.filter(
      (item) =>
        item.phrase.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query) ||
        item.whatToDo.toLowerCase().includes(query)
    );
  }, [phrases, searchQuery]);

  /**
   * Apply limit to visible phrases if specified
   */
  const visiblePhrases = useMemo(() => {
    if (!limit || showAll) {
      return filteredPhrases;
    }
    return filteredPhrases.slice(0, limit);
  }, [filteredPhrases, limit, showAll]);

  // Calculate if there are more items to show
  const hasMoreItems = limit && filteredPhrases.length > limit && !showAll;
  const hiddenCount = hasMoreItems
    ? filteredPhrases.length - limit
    : 0;

  // Check if search returned no results
  const noResults = searchQuery.trim() && filteredPhrases.length === 0;

  // Check if there are no phrases at all
  const isEmpty = phrases.length === 0;

  /**
   * Handle search input change
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // Reset show all when searching
    setShowAll(false);
  };

  /**
   * Clear the search query
   */
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  /**
   * Toggle show more/less
   */
  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <section
      className={`scam-language-decoder ${className}`.trim()}
      aria-labelledby={`${componentId}-title`}
    >
      {/* Header section */}
      <div className="mb-6">
        <h2
          id={`${componentId}-title`}
          className="text-2xl md:text-3xl font-bold text-navy mb-2"
        >
          {title}
        </h2>
        {description && (
          <p className="text-gray-600 text-base md:text-lg">
            {description}
          </p>
        )}
      </div>

      {/* Search input */}
      {searchable && !isEmpty && (
        <div className="mb-6 relative">
          <Input
            type="search"
            placeholder="Search scam phrases..."
            value={searchQuery}
            onChange={handleSearchChange}
            leftIcon={<Icon name="Search" size="sm" aria-hidden />}
            rightIcon={
              searchQuery ? (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <Icon name="X" size="sm" aria-hidden />
                </button>
              ) : undefined
            }
            fullWidth
            aria-label="Search scam phrases"
          />
          {/* Search results count */}
          {searchQuery.trim() && (
            <p
              className="mt-2 text-sm text-gray-500"
              aria-live="polite"
              aria-atomic="true"
            >
              {filteredPhrases.length === 0
                ? "No phrases found"
                : `Found ${filteredPhrases.length} phrase${filteredPhrases.length !== 1 ? "s" : ""}`}
            </p>
          )}
        </div>
      )}

      {/* Empty state */}
      {isEmpty && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Icon
            name="MessageSquareOff"
            size="xl"
            className="text-gray-400 mx-auto mb-4"
            aria-hidden
          />
          <p className="text-gray-600 text-lg">
            No scam phrases available yet.
          </p>
        </div>
      )}

      {/* No results state */}
      {noResults && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Icon
            name="SearchX"
            size="xl"
            className="text-gray-400 mx-auto mb-4"
            aria-hidden
          />
          <p className="text-gray-600 text-lg mb-2">
            No phrases match your search.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSearch}
          >
            Clear search
          </Button>
        </div>
      )}

      {/* Phrase cards grid */}
      {!isEmpty && !noResults && (
        <>
          <div
            className="grid gap-6 md:grid-cols-2"
            role="list"
            aria-label="Scam phrases"
          >
            {visiblePhrases.map((phrase, index) => (
              <div key={`${componentId}-phrase-${index}`} role="listitem">
                <PhraseCard
                  phrase={phrase}
                  id={`${componentId}-phrase-${index}`}
                />
              </div>
            ))}
          </div>

          {/* Show more/less button */}
          {limit && filteredPhrases.length > limit && (
            <div className="mt-8 text-center">
              <Button
                variant="secondary"
                onClick={toggleShowAll}
                rightIcon={
                  <Icon
                    name={showAll ? "ChevronUp" : "ChevronDown"}
                    size="sm"
                    aria-hidden
                  />
                }
              >
                {showAll
                  ? "Show less"
                  : `Show ${hiddenCount} more phrase${hiddenCount !== 1 ? "s" : ""}`}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

// Display name for React DevTools
ScamLanguageDecoder.displayName = "ScamLanguageDecoder";

export default ScamLanguageDecoder;

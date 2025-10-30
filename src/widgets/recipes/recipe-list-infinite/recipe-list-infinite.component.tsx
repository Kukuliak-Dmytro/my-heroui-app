"use client";
import { recipesInfiniteQueryOptions } from "@/entities/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { RecipeCard, RecipeCardSkeleton } from "@/features/recipe-card";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchStore } from "@/features/search";
import { PAGINATION_LIMIT } from "@/features/pagination/pagination.constants";
import { renderList } from "@/features/render-list/render-list";

/**
 * Infinite scroll recipe list component with search functionality.
 *
 * This component displays recipes using infinite scroll pagination with
 * search integration. It automatically loads more recipes as the user
 * scrolls and handles loading states and error states.
 *
 * @returns The infinite scroll recipe list component
 */
export const RecipeListInfinite = () => {
  const query = useSearchStore((state) => state.query);
  const [isSearching, setIsSearching] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    recipesInfiniteQueryOptions({ limit: PAGINATION_LIMIT, search: query }),
  );

  // Track when search query changes to show loading state
  useEffect(() => {
    if (query && isFetching) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [query, isFetching]);

  // Intersection observer for automatic loading
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: "100px", // Start loading 100px before the element comes into view
      root: null, // the viewport will be the root, not a child element
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleObserver, hasNextPage, isFetchingNextPage]);

  // Flatten all pages into a single array
  const allRecipes = data?.pages.flatMap((page) => page.recipes) ?? [];
  return (
    <>
      {renderList({
        items: allRecipes,
        isLoading,
        error,
        isSearching,
        title: "Recipe Collection",
        renderItem: (recipe, index) => (
          <RecipeCard key={recipe?.id || `skeleton-${index}`} recipe={recipe} />
        ),
        renderSkeleton: (index) => <RecipeCardSkeleton key={`s-${index}`} />,
        emptyMessage: query ? `No recipes found for "${query}"` : undefined,
      })}
      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="mt-8 flex flex-col items-center gap-4">
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span className="text-sm">Loading more recipes...</span>
            </div>
          ) : (
            <Button
              onPress={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              color="primary"
              variant="solid"
              className="min-w-[200px] shadow-lg hover:shadow-xl
                transition-shadow"
              size="lg">
              Load More Recipes
            </Button>
          )}
          <p className="text-xs text-default-400 text-center">
            {allRecipes.length} recipes loaded • Scroll down or click to load
            more
          </p>
        </div>
      )}
      {!hasNextPage && allRecipes.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm">
            You've reached the end of the recipe collection
          </p>
        </div>
      )}
    </>
  );
};

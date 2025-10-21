"use client";
import { recipesInfiniteQueryOptions } from "@/entities/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { RecipeCard } from "../recipe-card/recipe-card";
import { Skeleton } from "@heroui/skeleton";
import { Alert } from "@heroui/alert";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchStore } from "@/features/search";
import { PAGINATION_LIMIT } from "@/features/pagination/pagination.constants";

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

  // Show loading state for initial load or when searching
  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-2xl font-bold text-foreground">
            Recipe Collection
          </h1>
          {isSearching && (
            <div className="flex items-center gap-2 text-sm">
              <Spinner size="sm" />
              <span>Searching...</span>
            </div>
          )}
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-80">
              <Skeleton className="rounded-lg h-full w-full">
                <div className="aspect-[4/3] w-full bg-default-200 rounded-t-lg"></div>
                <div className="space-y-3 p-4">
                  <Skeleton className="h-5 w-3/4 rounded"></Skeleton>
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full"></Skeleton>
                    <Skeleton className="h-5 w-12 rounded-full"></Skeleton>
                  </div>
                  <Skeleton className="h-4 w-24 rounded"></Skeleton>
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-16 rounded"></Skeleton>
                    <Skeleton className="h-4 w-16 rounded"></Skeleton>
                  </div>
                </div>
              </Skeleton>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
        <h1 className="text-2xl font-bold mb-4 text-foreground">
          Recipe Collection
        </h1>
        <div className="min-h-[40vh] flex items-center justify-center">
          <Alert
            color="danger"
            title="Error Loading Recipes"
            description={error.message}
            className="max-w-md w-full"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold text-foreground">
          Recipe Collection
        </h1>
        {isSearching && data && (
          <div className="flex items-center gap-2 text-sm">
            <Spinner size="sm" />
            <span>Searching...</span>
          </div>
        )}
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
          gap-3 sm:gap-4">
        {allRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Load More Button - Always visible when there are more pages */}
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
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              color="primary"
              variant="solid"
              className="min-w-[200px] shadow-lg hover:shadow-xl
                transition-shadow"
              size="lg">
              Load More Recipes
            </Button>
          )}
          <p className="text-xs ult-400 text-center">
            {allRecipes.length} recipes loaded • Scroll down or click to load
            more
          </p>
        </div>
      )}

      {/* End of results message */}
      {!hasNextPage && allRecipes.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm">
            You've reached the end of the recipe collection
          </p>
        </div>
      )}

      {allRecipes.length === 0 && query && (
        <div className="text-center py-12">
          <p className="text-lg">No recipes found for &quot;{query}&quot;</p>
          <p className="text-sm mt-2">Try a different search term</p>
        </div>
      )}
    </section>
  );
};

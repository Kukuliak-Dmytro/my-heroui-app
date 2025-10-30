"use client";
import { recipesQueryOptions } from "@/entities/api";
import { useQuery } from "@tanstack/react-query";
import { RecipeCard } from "../recipe-card/recipe-card";
import { useState, useEffect } from "react";
import { usePaginationStore, PaginationComponent } from "@/features/pagination";
import { useSearchStore } from "@/features/search";
import { renderList } from "@/features/render-list/render-list";

/**
 * Paginated recipe list component with search functionality.
 *
 * This component displays a paginated list of recipes with search integration.
 * It handles loading states, error states, and provides pagination controls.
 *
 * @returns The paginated recipe list component
 */
export const RecipeListPaginated = () => {
  const query = useSearchStore((state) => state.query);
  const [isSearching, setIsSearching] = useState(false);

  // Get pagination state from store - use separate selectors to avoid re-renders
  const page = usePaginationStore((state) => state.page);
  const limit = usePaginationStore((state) => state.limit);
  const skip = usePaginationStore((state) => state.skip);
  const setPage = usePaginationStore((state) => state.setPage);
  const resetPagination = usePaginationStore((state) => state.resetPagination);

  const { data, isLoading, error, isFetching } = useQuery(
    recipesQueryOptions({ limit, skip, search: query }),
  );

  // Reset pagination when search query changes
  useEffect(() => {
    resetPagination();
  }, [query, resetPagination]);

  // Track when search query changes to show loading state
  useEffect(() => {
    if (query && isFetching) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [query, isFetching]);

  return renderList({
    items: data?.recipes ?? [],
    isLoading: isLoading || (isSearching && !data),
    error,
    isSearching,
    title: "Recipe Collection",
    renderItem: (recipe, index) => (
      <RecipeCard
        key={recipe?.id || `skeleton-${index}`}
        recipe={recipe}
        isLoading={!recipe}
      />
    ),
    emptyMessage: query ? `No recipes found for "${query}"` : undefined,
    children: data?.total && (
      <div className="mt-8">
        <PaginationComponent
          total={data.total}
          page={page}
          limit={limit}
          onPageChange={setPage}
        />
      </div>
    ),
  });
};

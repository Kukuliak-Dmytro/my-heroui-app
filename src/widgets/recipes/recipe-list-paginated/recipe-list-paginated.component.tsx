"use client";
import { recipesQueryOptions } from "@/entities/api";
import { useQuery } from "@tanstack/react-query";
import { RecipeCard } from "../recipe-card/recipe-card";
import { useState, useEffect, useCallback } from "react";
import { usePaginationStore, PaginationComponent } from "@/features/pagination";
import { useSearchStore } from "@/features/search";
import { renderList } from "@/features/render-list/render-list";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Route } from "next";

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

  // Router utilities for syncing page with URL
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading, error, isFetching } = useQuery(
    recipesQueryOptions({ limit, skip, search: query }),
  );

  // Reset pagination when search query changes and remove page param from URL
  const resetPagination = usePaginationStore((state) => state.resetPagination);
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

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);

      const params = new URLSearchParams(searchParams?.toString());
      if (newPage > 1) params.set("page", String(newPage));
      else params.delete("page");

      const queryString = params.toString();
      const href = (pathname + (queryString ? `?${queryString}` : "")) as Route;
      router.push(href);
    },
    [pathname, router, searchParams, setPage],
  );

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
          onPageChange={handlePageChange}
        />
      </div>
    ),
  });
};

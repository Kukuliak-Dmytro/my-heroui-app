import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import * as Sentry from "@sentry/nextjs";

import { getRecipes, getRecipe } from "./recipe.api";

// Query key constants
export const RECIPE_QUERY_KEYS = {
  recipes: (limit: number, skip: number, search: string) =>
    ["recipes", limit, skip, search] as const,
  recipesInfinite: (limit: number, search: string) =>
    ["recipes-infinite", limit, search] as const,
  recipe: (id: string) => ["recipe", id] as const,
} as const;

// Query options for recipes list
export const recipesQueryOptions = (params: {
  limit: number;
  skip: number;
  search: string;
}) => {
  return queryOptions({
    queryKey: RECIPE_QUERY_KEYS.recipes(
      params.limit,
      params.skip,
      params.search,
    ),
    queryFn: async () => {
      try {
        return await getRecipes(params);
      } catch (error) {
        // Capture query-level errors with additional context
        Sentry.captureException(error, {
          tags: {
            component: "react-query",
            query: "recipes",
          },
          extra: {
            queryKey: RECIPE_QUERY_KEYS.recipes(
              params.limit,
              params.skip,
              params.search,
            ),
            params,
          },
        });
        throw error;
      }
    },
    staleTime: 30 * 1000, // 30 seconds - align with Next.js revalidation
    gcTime: 2 * 60 * 1000, // 2 minutes - keep in cache for 2 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    refetchOnWindowFocus: false, // Don't refetch on window focus for better UX
    refetchOnMount: false, // Don't refetch on mount if data exists
    refetchOnReconnect: true, // Refetch on reconnect for data freshness
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (
        error instanceof Error &&
        "status" in error &&
        typeof error.status === "number"
      ) {
        if (error.status >= 400 && error.status < 500) {
          return false;
        }
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
};

// Query options for single recipe
export const recipeQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: RECIPE_QUERY_KEYS.recipe(id),
    queryFn: async () => {
      try {
        return await getRecipe(id);
      } catch (error) {
        // Capture query-level errors with additional context
        Sentry.captureException(error, {
          tags: {
            component: "react-query",
            query: "recipe",
          },
          extra: {
            queryKey: RECIPE_QUERY_KEYS.recipe(id),
            recipeId: id,
          },
        });
        throw error;
      }
    },
    staleTime: 30 * 1000, // 30 seconds - align with Next.js revalidation
    gcTime: 2 * 60 * 1000, // 2 minutes - keep in cache for 2 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    refetchOnWindowFocus: false,
    refetchOnMount: false, // Don't refetch on mount if data exists
    refetchOnReconnect: true,
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (
        error instanceof Error &&
        "status" in error &&
        typeof error.status === "number"
      ) {
        if (error.status >= 400 && error.status < 500) {
          return false;
        }
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
};

// Query options for infinite recipes list
export const recipesInfiniteQueryOptions = (params: {
  limit: number;
  search: string;
}) => {
  return infiniteQueryOptions({
    queryKey: RECIPE_QUERY_KEYS.recipesInfinite(params.limit, params.search),
    queryFn: async ({ pageParam = 0 }) => {
      try {
        return await getRecipes({
          limit: params.limit,
          skip: pageParam,
          search: params.search,
        });
      } catch (error) {
        // Capture query-level errors with additional context
        Sentry.captureException(error, {
          tags: {
            component: "react-query",
            query: "recipes-infinite",
          },
          extra: {
            queryKey: RECIPE_QUERY_KEYS.recipesInfinite(
              params.limit,
              params.search,
            ),
            params: { ...params, pageParam },
          },
        });
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      // If we have fewer items than the limit, we've reached the end
      if (lastPage.recipes.length < params.limit) {
        return undefined;
      }
      // Return the next skip value
      return lastPage.skip + lastPage.limit;
    },
    initialPageParam: 0,
    staleTime: 30 * 1000, // 30 seconds - align with Next.js revalidation
    gcTime: 2 * 60 * 1000, // 2 minutes - keep in cache for 2 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus for better UX
    refetchOnMount: false, // Don't refetch on mount if data exists
    refetchOnReconnect: true, // Refetch on reconnect for data freshness
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (
        error instanceof Error &&
        "status" in error &&
        typeof error.status === "number"
      ) {
        if (error.status >= 400 && error.status < 500) {
          return false;
        }
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
};

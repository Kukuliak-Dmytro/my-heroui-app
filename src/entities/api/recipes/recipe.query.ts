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
  });
};

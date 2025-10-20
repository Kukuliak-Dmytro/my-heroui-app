import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import { getRecipes, getRecipe } from "./recipe.api";

// Query key constants
export const RECIPE_QUERY_KEYS = {
  recipes: (limit: number, skip: number, search: string) =>
    ["recipes", limit, skip, search] as const,
  recipesInfinite: (limit: number, search: string) =>
    ["recipes-infinite", limit, search] as const,
  recipe: (id: string) => ["recipe", id] as const,
} as const;

/**
 * Query options for fetching a paginated list of recipes.
 *
 * This function creates query options for React Query to fetch recipes
 * with pagination and search parameters.
 *
 * @param {Object} params - Query parameters
 * @param {number} params.limit - Maximum number of recipes to return
 * @param {number} params.skip - Number of recipes to skip
 * @param {string} params.search - Search query string
 * @returns {QueryOptions} React Query options object
 */
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
      return await getRecipes(params);
    },
  });
};

/**
 * Query options for fetching a single recipe by ID.
 *
 * This function creates query options for React Query to fetch a single
 * recipe with the specified ID.
 *
 * @param {string} id - The unique identifier of the recipe
 * @returns {QueryOptions} React Query options object
 */
export const recipeQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: RECIPE_QUERY_KEYS.recipe(id),
    queryFn: async () => {
      return await getRecipe(id);
    },
  });
};

/**
 * Query options for fetching recipes with infinite scroll pagination.
 *
 * This function creates infinite query options for React Query to fetch
 * recipes with infinite scroll functionality, automatically loading more
 * data as the user scrolls.
 *
 * @param {Object} params - Query parameters
 * @param {number} params.limit - Number of recipes per page
 * @param {string} params.search - Search query string
 * @returns {InfiniteQueryOptions} React Query infinite query options object
 */
export const recipesInfiniteQueryOptions = (params: {
  limit: number;
  search: string;
}) => {
  return infiniteQueryOptions({
    queryKey: RECIPE_QUERY_KEYS.recipesInfinite(params.limit, params.search),
    queryFn: async ({ pageParam = 0 }) => {
      return await getRecipes({
        limit: params.limit,
        skip: pageParam,
        search: params.search,
      });
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

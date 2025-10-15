import { queryOptions } from "@tanstack/react-query";
import { getRecipes, getRecipe } from "./recipe.api";

// Query key constants
export const RECIPE_QUERY_KEYS = {
    recipes: (limit: number, skip: number) => ["recipes", limit, skip] as const,
    recipe: (id: string) => ["recipe", id] as const,
} as const;

// Query options for recipes list
export const recipesQueryOptions = (params: { limit: number; skip: number }) => {
    return queryOptions({
        queryKey: RECIPE_QUERY_KEYS.recipes(params.limit, params.skip),
        queryFn: () => getRecipes(params),
        staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache for 10 minutes
        refetchOnWindowFocus: false, // Don't refetch on window focus for better UX
        refetchOnMount: false, // Don't refetch on mount if data exists
        refetchOnReconnect: true, // Refetch on reconnect for data freshness
    });
};

// Query options for single recipe
export const recipeQueryOptions = (id: string) => {
    return queryOptions({
        queryKey: RECIPE_QUERY_KEYS.recipe(id),
        queryFn: () => getRecipe(id),
        staleTime: 10 * 60 * 1000, // 10 minutes - recipes don't change often
        gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache longer
        refetchOnWindowFocus: false,
        refetchOnMount: false, // Don't refetch on mount if data exists
        refetchOnReconnect: true,
    });
};
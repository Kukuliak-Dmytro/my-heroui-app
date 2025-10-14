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
        staleTime: 30 * 1000, // 30 seconds
        gcTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

// Query options for single recipe
export const recipeQueryOptions = (id: string) => {
    return queryOptions({
        queryKey: RECIPE_QUERY_KEYS.recipe(id),
        queryFn: () => getRecipe(id),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};
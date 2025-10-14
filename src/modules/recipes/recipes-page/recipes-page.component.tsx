import { recipesQueryOptions } from "@/entities/api";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { RecipeList } from "@/widgets";

/**
 * RecipesPageComponent component for displaying the recipes page
 * todo: add filter panel
 * todo: add search panel
 * todo: add pagination
 * @returns RecipesPageComponent component
 */
export const RecipesPageComponent = () => {
    getQueryClient().prefetchQuery(recipesQueryOptions({ limit: 10, skip: 0 }));
    return (
        <HydrationBoundary state={dehydrate(getQueryClient())}>
            <RecipeList />
        </HydrationBoundary>
    )
}

export default RecipesPageComponent;
import { recipeQueryOptions } from "@/entities/api";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { DetailedRecipeCard } from "@/widgets";
/**
 * SingleRecipePageComponent component for displaying the single recipe page
 * Server component that prefetches data
 * id passed as props from the page.tsx
 * @param id - Recipe ID
 * @returns SingleRecipePageComponent component
 */

export const SingleRecipePageComponent = async ({ id }: { id: string }) => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(recipeQueryOptions(id));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* recipe card will consume cache and will be client, thus bringing interactivity */}
            <DetailedRecipeCard id={id} />
        </HydrationBoundary>
    )
}

export default SingleRecipePageComponent;
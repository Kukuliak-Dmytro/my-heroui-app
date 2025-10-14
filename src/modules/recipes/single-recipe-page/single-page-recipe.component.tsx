"use client";
import { recipeQueryOptions } from "@/entities/api";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { DetailedRecipeCard } from "@/widgets";
/**
 * SingleRecipePageComponent component for displaying the single recipe page
 * possible client component in the future
 * id passed as props from the page.tsx
 * @param id - Recipe ID
 * @returns SingleRecipePageComponent component
 */

export const SingleRecipePageComponent = ({ id }: { id: string }) => {

    getQueryClient().prefetchQuery(recipeQueryOptions(id));
    return (
        <HydrationBoundary state={dehydrate(getQueryClient())}>
            {/* recipe card will consume cache and will be client, thus bringing interactivity */}
            <DetailedRecipeCard id={id} />
        </HydrationBoundary>
    )
}

export default SingleRecipePageComponent;
import { recipesQueryOptions } from "@/entities/api";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { RecipeList } from "@/widgets";
import { Searchbar } from "@/widgets/searchbar";
import { Suspense } from "react";

interface IRecipesPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * RecipesPageComponent component for displaying the recipes page
 * todo: add filter panel
 * todo: add pagination
 * @returns RecipesPageComponent component
 */
export const RecipesPageComponent = async ({ searchParams }: IRecipesPageProps) => {
    const queryClient = getQueryClient();
    const query = typeof searchParams.search === 'string' ? searchParams.search : "";
    await queryClient.prefetchQuery(recipesQueryOptions({ limit: 10, skip: 0, search: query }));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Recipes</h1>
                <Searchbar placeholder="Search recipes..." />
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<div>Loading recipes...</div>}>
                    <RecipeList initialSearch={query} />
                </Suspense>
            </HydrationBoundary>
        </div>
    )
}

export default RecipesPageComponent;
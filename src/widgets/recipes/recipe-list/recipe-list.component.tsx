"use client";
import { recipesQueryOptions } from "@/entities/api";
import { useQuery } from "@tanstack/react-query";
import { RecipeCard } from "../recipe-card";
import { Skeleton } from "@heroui/skeleton";
import { Alert } from "@heroui/alert";

export const RecipeList = () => {
    const { data, isLoading, error, isFetching } = useQuery({
        ...recipesQueryOptions({ limit: 10, skip: 0 }),
        // Ensure we don't show loading state if data exists in cache
        enabled: true,
    });

    // Only show loading if we don't have data AND we're actually fetching
    // if (isLoading && !data) {
    //     return (
    //         <section className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
    //             <h1 className="text-2xl font-bold mb-4 text-foreground">Recipe Collection</h1>
    //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
    //                 {Array.from({ length: 8 }).map((_, index) => (
    //                     <div key={index} className="h-80">
    //                         <Skeleton className="rounded-lg h-full w-full">
    //                             <div className="aspect-[4/3] w-full bg-default-200 rounded-t-lg"></div>
    //                             <div className="space-y-3 p-4">
    //                                 <Skeleton className="h-5 w-3/4 rounded"></Skeleton>
    //                                 <div className="flex gap-2">
    //                                     <Skeleton className="h-5 w-16 rounded-full"></Skeleton>
    //                                     <Skeleton className="h-5 w-12 rounded-full"></Skeleton>
    //                                 </div>
    //                                 <Skeleton className="h-4 w-24 rounded"></Skeleton>
    //                                 <div className="flex gap-4">
    //                                     <Skeleton className="h-4 w-16 rounded"></Skeleton>
    //                                     <Skeleton className="h-4 w-16 rounded"></Skeleton>
    //                                 </div>
    //                             </div>
    //                         </Skeleton>
    //                     </div>
    //                 ))}
    //             </div>
    //         </section>
    //     );
    // }

    if (error) {
        return (
            <section className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
                <h1 className="text-2xl font-bold mb-4 text-foreground">Recipe Collection</h1>
                <div className="min-h-[40vh] flex items-center justify-center">
                    <Alert
                        color="danger"
                        title="Error Loading Recipes"
                        description={error.message}
                        className="max-w-md w-full"
                    />
                </div>
            </section>
        );
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
            <h1 className="text-2xl font-bold mb-4 text-foreground">Recipe Collection</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {data?.recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </section>
    );
}
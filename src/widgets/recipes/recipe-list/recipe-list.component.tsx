"use client";
import { recipesQueryOptions } from "@/entities/api";
import { useQuery } from "@tanstack/react-query";
import { RecipeCard } from "../recipe-card";
import { Skeleton } from "@heroui/skeleton";
import { Alert } from "@heroui/alert";
import { Spinner } from "@heroui/spinner";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface IRecipeListProps {
    initialSearch?: string;
}

export const RecipeList = ({ initialSearch = "" }: IRecipeListProps) => {
    const searchParams = useSearchParams();
    const query = searchParams.get("search") || initialSearch;
    const [isSearching, setIsSearching] = useState(false);

    const { data, isLoading, error, isFetching } = useQuery({
        ...recipesQueryOptions({ limit: 10, skip: 0, search: query }),
        enabled: true,
        staleTime: 0, // Always consider data stale to show loading on search
    });

    // Track when search query changes to show loading state
    useEffect(() => {
        if (query && isFetching) {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    }, [query, isFetching]);

    // Show loading state for initial load or when searching
    if (isLoading || (isSearching && !data)) {
        return (
            <section className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
                <div className="flex items-center gap-2 mb-4">
                    <h1 className="text-2xl font-bold text-foreground">Recipe Collection</h1>
                    {isSearching && (
                        <div className="flex items-center gap-2 text-sm text-default-500">
                            <Spinner size="sm" />
                            <span>Searching...</span>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="h-80">
                            <Skeleton className="rounded-lg h-full w-full">
                                <div className="aspect-[4/3] w-full bg-default-200 rounded-t-lg"></div>
                                <div className="space-y-3 p-4">
                                    <Skeleton className="h-5 w-3/4 rounded"></Skeleton>
                                    <div className="flex gap-2">
                                        <Skeleton className="h-5 w-16 rounded-full"></Skeleton>
                                        <Skeleton className="h-5 w-12 rounded-full"></Skeleton>
                                    </div>
                                    <Skeleton className="h-4 w-24 rounded"></Skeleton>
                                    <div className="flex gap-4">
                                        <Skeleton className="h-4 w-16 rounded"></Skeleton>
                                        <Skeleton className="h-4 w-16 rounded"></Skeleton>
                                    </div>
                                </div>
                            </Skeleton>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

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
            <div className="flex items-center gap-2 mb-4">
                <h1 className="text-2xl font-bold text-foreground">Recipe Collection</h1>
                {isSearching && data && (
                    <div className="flex items-center gap-2 text-sm text-default-500">
                        <Spinner size="sm" />
                        <span>Searching...</span>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {data?.recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
            {data?.recipes.length === 0 && query && (
                <div className="text-center py-12">
                    <p className="text-default-500 text-lg">No recipes found for &quot;{query}&quot;</p>
                    <p className="text-default-400 text-sm mt-2">Try a different search term</p>
                </div>
            )}
        </section>
    );
}
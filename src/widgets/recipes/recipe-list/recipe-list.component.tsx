"use client";
import { recipesQueryOptions } from "@/entities/api";
import { useQuery } from "@tanstack/react-query";
import { RecipeCard } from "../recipe-card";

export const RecipeList = () => {
    const { data, isLoading, error } = useQuery(recipesQueryOptions({ limit: 10, skip: 0 }));
    return <div>
        <h1>RecipeList</h1>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {data?.recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
    </div>;
}
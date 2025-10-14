import { IRecipe } from "@/shared/interfaces/recipe";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { recipeQueryOptions } from "@/entities/api";
import Link from "next/link";
/**
 * RecipeCard component for displaying a recipe in the list
 * @param recipe - Recipe object
 * @returns RecipeCard component
 */

export const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
    //prefetch the recipe when the mouse enters the card
    return <div
        onMouseEnter={() => {
            getQueryClient().prefetchQuery(recipeQueryOptions(recipe.id.toString()));
        }}

    >

        <Link href={`/recipes/${recipe.id}`}>
            <h3 >{recipe.name}</h3>
            <p>{recipe.cuisine}</p>
            <p>{recipe.ingredients.join(", ")}</p>
            <p>{recipe.instructions.join(", ")}</p>
            <p>{recipe.prepTimeMinutes}</p>
            <p>{recipe.cookTimeMinutes}</p>
            <p>{recipe.servings}</p>
        </Link>
    </div>;
}
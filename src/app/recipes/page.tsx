import { recipesQueryOptions } from "@/entities/api";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { RecipeList } from "@/widgets";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { RecipesPageComponent } from "@/modules/recipes/recipes-page/recipes-page.component";
export default function RecipesPage() {
    return (
        <RecipesPageComponent />
    )
}

import {
  recipesQueryOptions,
  recipesInfiniteQueryOptions,
} from "@/entities/api";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { RecipeListPaginated, RecipeListInfinite } from "@/widgets";
import { Searchbar } from "@/widgets/searchbar";
import { Suspense } from "react";
import { PAGINATION_LIMIT } from "@/features/pagination/pagination.constants";
import { SearchStoreProvider } from "@/features/search";
import { getTranslations } from "next-intl/server";
import { PaginationStoreProvider } from "@/features/pagination";

// TODO: Replace with GrowthBook feature flag
const RECIPE_LIST_VARIANT = process.env.RECIPE_LIST_VARIANT || "infinite";
interface IRecipesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * RecipesPageComponent component for displaying the recipes page
 * @returns RecipesPageComponent component
 */
export const RecipesPageComponent = async ({
  searchParams,
}: IRecipesPageProps) => {
  const t = await getTranslations();
  const queryClient = getQueryClient();
  const query =
    typeof searchParams.search === "string" ? searchParams.search : "";

  // Prefetch based on variant
  if (RECIPE_LIST_VARIANT === "infinite") {
    // Prefetch first page for infinite scroll
    await queryClient.prefetchInfiniteQuery(
      recipesInfiniteQueryOptions({
        limit: PAGINATION_LIMIT,
        search: query,
      }),
    );
  } else {
    // Prefetch first page for paginated variant
    await queryClient.prefetchQuery(
      recipesQueryOptions({ limit: PAGINATION_LIMIT, skip: 0, search: query }),
    );
  }

  const renderRecipeList = () => {
    if (RECIPE_LIST_VARIANT === "infinite") {
      return (
        <Suspense fallback={<div>{t("recipes.loadingRecipes")}</div>}>
          <RecipeListInfinite />
        </Suspense>
      );
    }

    return (
      <PaginationStoreProvider>
        <Suspense fallback={<div>{t("recipes.loadingRecipes")}</div>}>
          <RecipeListPaginated />
        </Suspense>
      </PaginationStoreProvider>
    );
  };

  return (
    <SearchStoreProvider initialQuery={query}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t("recipes.title")}</h1>
          <Searchbar placeholder={t("search.placeholder")} />
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          {renderRecipeList()}
        </HydrationBoundary>
      </div>
    </SearchStoreProvider>
  );
};

export default RecipesPageComponent;

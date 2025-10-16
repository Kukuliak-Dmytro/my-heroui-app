import { recipesQueryOptions } from "@/entities/api";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { RecipeList } from "@/widgets";
import { Searchbar } from "@/widgets/searchbar";
import { Suspense } from "react";
import { PAGINATION_LIMIT } from "@/features/pagination/pagination.constants";
import { SearchStoreProvider } from "@/features/search";
import { getTranslations } from "next-intl/server";
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

  // Simple prefetch with default values - pagination is handled by the client component
  await queryClient.prefetchQuery(
    recipesQueryOptions({ limit: PAGINATION_LIMIT, skip: 0, search: query }),
  );

  return (
    <SearchStoreProvider initialQuery={query}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t("recipes.title")}</h1>
          <Searchbar placeholder={t("search.placeholder")} />
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>{t("recipes.loadingRecipes")}</div>}>
            <RecipeList />
          </Suspense>
        </HydrationBoundary>
      </div>
    </SearchStoreProvider>
  );
};

export default RecipesPageComponent;

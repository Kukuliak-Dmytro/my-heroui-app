import { recipesQueryOptions } from "@/entities/api";
import { getQueryClient } from "@/shared/lib/utils/get-query-client";
import { tryCatchWithSentry } from "@/shared/lib/utils/try-catch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { RecipeListPaginated, RecipeListInfinite } from "@/widgets";
import { Searchbar } from "@/widgets/searchbar";
import { Suspense } from "react";
import { PAGINATION_LIMIT } from "@/features/pagination/pagination.constants";
import { SearchStoreProvider } from "@/features/search";
import { getTranslations } from "next-intl/server";
import { PaginationStoreProvider } from "@/features/pagination";
import {
  configureServerSideGrowthBook,
  getServerGrowthBook,
} from "@/shared/lib/growthbook/";
import { GrowthBookTracking } from "@/shared/lib/growthbook/growthbook-tracking";
import { ErrorBoundary } from "@/shared/ui/error-boundary.component";

interface IRecipesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * Main recipes page component with hybrid data fetching strategies.
 *
 * This component implements two distinct data fetching models:
 *
 * 1. **Pagination Model (Prefetch + Hydrate)**
 *    - Server-side prefetches first page data during SSR
 *    - Data is dehydrated and passed to HydrationBoundary
 *    - Client-side components render with prefetched data
 *    - Subsequent pages fetch via client-side React Query
 *    - Best for: Faster initial load, SEO-optimized content
 *
 * 2. **Infinite Scroll Model (Pure Streaming)**
 *    - No server-side prefetch
 *    - First data fetch happens on client-side mount
 *    - Enabled by Partial Prerendering (PPR) with Suspense
 *    - Static shell renders instantly, dynamic content streams in
 *    - Best for: Progressive loading, reduced server load
 *
 * The active model is determined by GrowthBook feature flags for A/B testing.
 *
 * @param props - Component props
 * @param props.searchParams - URL search parameters
 * @returns The recipes page component
 */
export const RecipesPageComponent = async ({
  searchParams,
}: IRecipesPageProps) => {
  const t = await getTranslations();
  const queryClient = getQueryClient();
  const query =
    typeof searchParams.search === "string" ? searchParams.search : "";

  configureServerSideGrowthBook();

  // Create and initialize a GrowthBook instance
  const [gb] = await tryCatchWithSentry(getServerGrowthBook(), {
    level: "error",
    tags: { feature: "recipes", op: "getServerGrowthBook" },
  });

  // Evaluate feature flag using the correct flag key from GrowthBook dashboard
  const listViewType =
    gb?.getFeatureValue(
      "flag_recipe_list_view_optimization_v2",
      "pagination",
    ) || "pagination"; // Default fallback

  // If the above features ran any experiments, get the tracking call data
  const trackingData = gb?.getDeferredTrackingCalls() || [];

  // Cleanup
  gb?.destroy();

  // DATA FETCHING STRATEGY SELECTION
  // Two models are supported based on the list view type:
  //
  // Pagination Model: Prefetch + Hydrate
  // - Server-side prefetch ensures data is available on initial render
  // - Reduces time-to-interactive by eliminating client-side loading state
  // - Ideal for SEO and first-paint performance
  if (listViewType === "pagination") {
    await tryCatchWithSentry(
      queryClient.prefetchQuery(
        recipesQueryOptions({
          limit: PAGINATION_LIMIT,
          skip: 0,
          search: query,
        }),
      ),
      {
        level: "error",
        tags: { feature: "recipes", op: "prefetchPaginated" },
        extra: { query, limit: PAGINATION_LIMIT, skip: 0 },
      },
    );
  }
  // Infinite Scroll Model: Pure Streaming
  // - Intentionally skips prefetch to utilize pure PPR streaming
  // - Allows static shell to render instantly via Suspense
  // - Data fetches on client-side mount, streaming in as it loads
  // - Ideal for progressive loading and reduced server load

  return (
    <SearchStoreProvider initialQuery={query}>
      <div className="container mx-auto px-4 py-8">
        {/* Static header - prerendered immediately */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t("recipes.title")}</h1>
          <Searchbar placeholder={t("search.placeholder")} />
        </div>

        {/* Dynamic recipe list - renders based on selected data fetching model */}
        <ErrorBoundary>
          {listViewType === "infinite" ? (
            // INFINITE SCROLL: Pure Streaming Model
            // No prefetch → Client-side fetch → Streams via Suspense
            <Suspense fallback={<div>{t("recipes.loadingRecipes")}</div>}>
              <RecipeListInfinite />
            </Suspense>
          ) : listViewType === "pagination" ? (
            // PAGINATION: Prefetch + Hydrate Model
            // HydrationBoundary provides prefetched data to client components
            <HydrationBoundary state={dehydrate(queryClient)}>
              <PaginationStoreProvider>
                <Suspense fallback={<div>{t("recipes.loadingRecipes")}</div>}>
                  <RecipeListPaginated />
                </Suspense>
              </PaginationStoreProvider>
            </HydrationBoundary>
          ) : (
            <div>Invalid list view type</div>
          )}
          <GrowthBookTracking data={trackingData} />
        </ErrorBoundary>
      </div>
    </SearchStoreProvider>
  );
};

export default RecipesPageComponent;

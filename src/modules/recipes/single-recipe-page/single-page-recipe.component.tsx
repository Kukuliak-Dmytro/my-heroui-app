import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { recipeQueryOptions } from "@/entities/api";
import { getQueryClient } from "@/shared/lib/utils/get-query-client";
import { tryCatchWithSentry } from "@/shared/lib/utils/try-catch";
import { DetailedRecipeCard } from "@/widgets";
import { ErrorBoundary } from "@/shared/ui/error-boundary.component";
/**
 * Single recipe page component with server-side data prefetching.
 *
 * This component handles server-side data prefetching for a single recipe
 * and renders the detailed recipe view with error boundary protection.
 *
 * @param props - Component props
 * @param props.id - The unique identifier of the recipe
 * @returns The single recipe page component
 */

export const SingleRecipePageComponent = async ({ id }: { id: string }) => {
  const queryClient = getQueryClient();

  await tryCatchWithSentry(queryClient.prefetchQuery(recipeQueryOptions(id)), {
    level: "error",
    tags: { feature: "recipes", op: "prefetchSingle" },
    extra: { id },
  });

  return (
    <ErrorBoundary>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* recipe card will consume cache and will be client, thus bringing interactivity */}
        <DetailedRecipeCard id={id} />
      </HydrationBoundary>
    </ErrorBoundary>
  );
};

export default SingleRecipePageComponent;

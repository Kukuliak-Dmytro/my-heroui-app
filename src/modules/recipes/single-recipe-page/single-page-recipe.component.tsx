import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { recipeQueryOptions } from "@/entities/api";
import { getQueryClient } from "@/shared/lib/utils/get-query-client";
import { tryCatchWithSentry } from "@/shared/lib/utils/try-catch";
import { DetailedRecipeCard } from "@/widgets";
import { ErrorBoundary } from "@/shared/ui";
/**
 * SingleRecipePageComponent component for displaying the single recipe page
 * Server component that prefetches data
 * id passed as props from the page.tsx
 * @param id - Recipe ID
 * @returns SingleRecipePageComponent component
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

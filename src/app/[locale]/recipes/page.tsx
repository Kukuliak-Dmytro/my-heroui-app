import { RecipesPageComponent } from "@/modules/recipes/recipes-page/recipes-page.component";
import { Suspense } from "react";

/**
 * Recipes page with server-side search parameter handling.
 *
 * This page component handles the recipes route and processes search parameters
 * from the URL. searchParams is runtime data, so we wrap it in Suspense.
 *
 * @param searchParams - Promise containing URL search parameters
 * @returns The recipes page component
 */
export default async function RecipesPage(
  props: PageProps<"/[locale]/recipes">,
) {
  const searchParams = await props.searchParams;
  return (
    <Suspense>
      <RecipesPageComponent searchParams={searchParams} />
    </Suspense>
  );
}

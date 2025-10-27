import { RecipesPageComponent } from "@/modules/recipes/recipes-page/recipes-page.component";

/**
 * Recipes page with server-side search parameter handling.
 *
 * This page component handles the recipes route and processes search parameters
 * from the URL. Static content is prerendered, while dynamic parts stream in.
 *
 * @param props - Page props containing searchParams
 * @returns The recipes page component
 */
export default async function RecipesPage(
  props: PageProps<"/[locale]/recipes">,
) {
  const searchParams = await props.searchParams;
  return <RecipesPageComponent searchParams={searchParams} />;
}

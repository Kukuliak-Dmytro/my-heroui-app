import { RecipesPageComponent } from "@/modules/recipes/recipes-page/recipes-page.component";

interface IRecipesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const revalidate = 30;

/**
 * Recipes page with server-side search parameter handling.
 *
 * This page component handles the recipes route and processes search parameters
 * from the URL. It resolves the search parameters and passes them to the
 * RecipesPageComponent for rendering.
 *
 * @param searchParams - Promise containing URL search parameters
 * @returns The recipes page component
 */
export default async function RecipesPage({ searchParams }: IRecipesPageProps) {
  const resolvedSearchParams = await searchParams;
  return <RecipesPageComponent searchParams={resolvedSearchParams} />;
}

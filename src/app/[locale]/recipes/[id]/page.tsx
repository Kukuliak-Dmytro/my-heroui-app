import { SingleRecipePageComponent } from "@/modules/recipes/single-recipe-page/single-page-recipe.component";

export const revalidate = 30;

/**
 * Single recipe page with dynamic ID parameter handling.
 *
 * This page component handles the dynamic recipe route and extracts
 * the recipe ID from the URL parameters. It passes the ID to the
 * SingleRecipePageComponent for rendering the specific recipe.
 *
 * @param params - Promise containing the dynamic route parameters
 * @returns The single recipe page component
 */
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SingleRecipePageComponent id={id} />;
}

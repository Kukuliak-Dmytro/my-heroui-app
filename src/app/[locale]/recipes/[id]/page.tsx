import { SingleRecipePageComponent } from "@/modules/recipes/single-recipe-page/single-page-recipe.component";
import { Suspense } from "react";

/**
 * Wrapper component that resolves params inside Suspense boundary.
 * This demonstrates proper handling of runtime data (params without generateStaticParams).
 */
async function SingleRecipePageWrapper(props: {
  paramsPromise: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await props.paramsPromise;
  return <SingleRecipePageComponent id={id} />;
}

/**
 * Single recipe page with dynamic ID parameter handling.
 *
 * This page component handles the dynamic recipe route and extracts
 * the recipe ID from the URL parameters. params is runtime data (no generateStaticParams),
 * so we wrap it in Suspense.
 *
 * @param params - Promise containing the dynamic route parameters
 * @returns The single recipe page component
 */
// Nextjs 15.5 props helpers
export default function Page(props: PageProps<"/[locale]/recipes/[id]">) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SingleRecipePageWrapper paramsPromise={props.params} />
    </Suspense>
  );
}

import { SingleRecipePageComponent } from "@/modules/recipes/single-recipe-page/single-page-recipe.component";

export const revalidate = 30;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SingleRecipePageComponent id={id} />;
}

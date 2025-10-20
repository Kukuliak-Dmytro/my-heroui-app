import { http } from "@/shared/lib/utils/fetcher";
import { IRecipeResponse, IRecipe } from "@/shared/interfaces/recipe";
import { tryCatchWithSentry } from "@/shared/lib/utils/try-catch";

export const getRecipes = async (params: {
  limit: number;
  skip: number;
  search: string;
}) => {
  const [data] = await tryCatchWithSentry(
    (async () => {
      const response = await http.get<IRecipeResponse>(
        `search?q=${params.search}&limit=${params.limit}&skip=${params.skip}`,
      );
      return await response.json();
    })(),
    {
      level: "error",
      tags: { feature: "recipes", op: "getRecipes" },
      extra: { params },
    },
  );

  if (!data) {
    throw new Error("Failed to fetch recipes");
  }

  return data;
};

export const getRecipe = async (id: string) => {
  const [data] = await tryCatchWithSentry(
    (async () => {
      const response = await http.get<IRecipe>(`${id}`);
      return await response.json();
    })(),
    {
      level: "error",
      tags: { feature: "recipes", op: "getRecipe" },
      extra: { id },
    },
  );

  if (!data) {
    throw new Error(`Failed to fetch recipe ${id}`);
  }

  return data;
};

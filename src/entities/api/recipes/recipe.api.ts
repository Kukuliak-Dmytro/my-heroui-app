import { http } from "@/shared/lib/http";
import { IRecipeResponse, IRecipe } from "@/shared/interfaces/recipe";
import * as Sentry from "@sentry/nextjs";

export const getRecipes = async (params: {
  limit: number;
  skip: number;
  search: string;
}) => {
  try {
    const response = await http.get<IRecipeResponse>(
      `search?q=${params.search}&limit=${params.limit}&skip=${params.skip}`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    // Additional error context for recipes list
    Sentry.captureException(error, {
      tags: {
        component: "recipes-api",
        operation: "getRecipes",
      },
      extra: {
        params,
      },
    });

    console.error("Failed to fetch recipes:", error);
    throw error;
  }
};

export const getRecipe = async (id: string) => {
  try {
    const response = await http.get<IRecipe>(`${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    // Additional error context for single recipe
    Sentry.captureException(error, {
      tags: {
        component: "recipes-api",
        operation: "getRecipe",
      },
      extra: {
        recipeId: id,
      },
    });

    console.error(`Failed to fetch recipe ${id}:`, error);
    throw error;
  }
};

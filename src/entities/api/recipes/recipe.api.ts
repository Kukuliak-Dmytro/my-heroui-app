import { http } from "@/shared/lib/utils/fetcher";
import { IRecipeResponse, IRecipe } from "@/shared/interfaces/recipe";
import { tryCatchWithSentry } from "@/shared/lib/utils/try-catch";

/**
 * Fetches a paginated list of recipes from the API with search functionality.
 *
 * This function is used by two different data fetching models:
 *
 * 1. **Pagination Model**: Prefetched server-side, then hydrated on client
 * 2. **Infinite Scroll Model**: Fetched client-side, streams in progressively
 *
 * Caching is handled by React Query on the client side for both models.
 * Uses tryCatchWithSentry for automatic error reporting and returns
 * a structured response containing recipes and pagination metadata.
 *
 * @param params - Search and pagination parameters
 * @returns Promise that resolves to recipe response data
 * @throws Throws an error if the API request fails
 */
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

/**
 * Fetches a single recipe by its ID from the API.
 *
 * This function retrieves detailed information about a specific recipe from the
 * DummyJSON API. Used by both pagination and infinite scroll models for
 * individual recipe detail pages. Caching is handled by React Query on the
 * client side.
 *
 * Uses tryCatchWithSentry for automatic error reporting and returns the
 * complete recipe data including ingredients, instructions, and metadata.
 *
 * @param id - The unique identifier of the recipe to fetch
 * @returns Promise that resolves to the recipe data
 * @throws Throws an error if the API request fails or recipe is not found
 */
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

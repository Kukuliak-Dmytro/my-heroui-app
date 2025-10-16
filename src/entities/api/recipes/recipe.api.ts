import { http } from "@/shared/lib/http";
import { IRecipeResponse, IRecipe } from "@/shared/interfaces/recipe";

export const getRecipes = async (params: {
  limit: number;
  skip: number;
  search: string;
}) => {
  const response = await http.get<IRecipeResponse>(
    `search?q=${params.search}&limit=${params.limit}&skip=${params.skip}`,
  );
  const data = await response.json();

  return data;
};

export const getRecipe = async (id: string) => {
  const response = await http.get<IRecipe>(`${id}`);
  const data = await response.json();

  return data;
};

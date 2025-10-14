import { http } from "@/shared/lib/http";
import { IRecipeResponse, IRecipe } from "@/shared/interfaces/recipe";

export const getRecipes = async (params: {
    limit: number;
    skip: number;
}) => {
    const response = await http.get<IRecipeResponse>(`?limit=${params.limit}&skip=${params.skip}`);
    const data = await response.json();
    console.log(data);
    return data;
}

export const getRecipe = async (id: string) => {
    const response = await http.get<IRecipe>(`${id}`);
    const data = await response.json();
    console.log(data);
    return data;
}
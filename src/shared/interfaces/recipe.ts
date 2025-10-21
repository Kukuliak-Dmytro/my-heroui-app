/**
 * Recipe interface defining the structure of recipe data.
 *
 * This interface describes the complete structure of a recipe object,
 * including all metadata, ingredients, instructions, and nutritional
 * information. It's used throughout the application for type safety.
 */
export interface IRecipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export interface IRecipeResponse {
  recipes: IRecipe[];
  total: number;
  skip: number;
  limit: number;
}

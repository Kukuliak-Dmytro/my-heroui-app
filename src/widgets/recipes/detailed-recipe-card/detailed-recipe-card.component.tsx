import { recipeQueryOptions } from "@/entities/api";
import { useQuery } from "@tanstack/react-query";

export const DetailedRecipeCard = ({ id }: { id: string }) => {
    const { data: recipe, isLoading, error } = useQuery(recipeQueryOptions(id));

    if (isLoading) return <div>Loading recipe...</div>;
    if (error) return <div>Error loading recipe: {error.message}</div>;
    if (!recipe) return <div>Recipe not found</div>;

    return (
        <div>
            <div>
                <div>
                    <h1>{recipe.name}</h1>
                    <div>
                        <span>Cuisine: {recipe.cuisine}</span>
                        <span>Difficulty: {recipe.difficulty}</span>
                        <span>Meal Type: {recipe.mealType.join(", ")}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>Rating: {recipe.rating} ({recipe.reviewCount} reviews)</span>
                    </div>
                    <div>
                        <span>Calories: {recipe.caloriesPerServing} per serving</span>
                    </div>
                </div>
            </div>

            <div>
                <img src={recipe.image} alt={recipe.name} />
            </div>

            <div>
                <div>
                    <div>Prep Time: {recipe.prepTimeMinutes} min</div>
                </div>
                <div>
                    <div>Cook Time: {recipe.cookTimeMinutes} min</div>
                </div>
                <div>
                    <div>Servings: {recipe.servings}</div>
                </div>
                <div>
                    <div>Total Time: {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</div>
                </div>
            </div>

            <div>
                <h3>Tags</h3>
                <div>
                    {recipe.tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                    ))}
                </div>
            </div>

            <div>
                <h3>Ingredients ({recipe.ingredients.length})</h3>
                <div>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <span>{ingredient}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3>Instructions ({recipe.instructions.length} steps)</h3>
                <div>
                    {recipe.instructions.map((instruction, index) => (
                        <div key={index}>
                            <span>Step {index + 1}:</span>
                            <span>{instruction}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div>
                    <span>Recipe ID: {recipe.id}</span>
                    <span>Created by User: {recipe.userId}</span>
                </div>
            </div>
        </div>
    );
}
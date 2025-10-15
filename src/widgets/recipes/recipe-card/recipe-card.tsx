"use client";
import { IRecipe } from "@/shared/interfaces/recipe";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { recipeQueryOptions } from "@/entities/api";
import Link from "next/link";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Badge } from "@heroui/badge";
import { Skeleton } from "@heroui/skeleton";
import { Icon } from "@iconify/react";
import { useState } from "react";

/**
 * RecipeCard component for displaying a recipe in the list
 * @param recipe - Recipe object
 * @returns RecipeCard component
 */
export const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    //prefetch the recipe when the mouse enters the card
    return (
        <div
            onMouseEnter={() => {
                getQueryClient().prefetchQuery(recipeQueryOptions(recipe.id.toString()));
            }}
            className="h-full w-full"
        >
            <Link href={`/recipes/${recipe.id}`} className="block h-full w-full">
                <Card
                    className="h-full w-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    isPressable
                >
                    <CardBody className="p-0 relative w-full">
                        {!imageLoaded && (
                            <Skeleton className="w-full aspect-[4/3]" />
                        )}
                        <Image
                            src={recipe.image}
                            alt={recipe.name}
                            className={`w-full aspect-[4/3] object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                                }`}
                            fallbackSrc="https://via.placeholder.com/400x300?text=Recipe+Image"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </CardBody>

                    <CardFooter className="flex flex-col items-start gap-3 p-4">
                        {/* Recipe Name */}
                        <h3 className="text-lg font-semibold text-center mx-auto">
                            {recipe.name}
                        </h3>

                        {/* Cuisine and Difficulty */}
                        <div className="flex flex-wrap items-center justify-between w-full mx-auto">
                            <Chip
                                size="sm"
                                color="primary"
                                variant="flat"
                                className="text-xs"
                            >
                                {recipe.cuisine}
                            </Chip>
                            <Badge
                                color={
                                    recipe.difficulty === "Easy" ? "success" :
                                        recipe.difficulty === "Medium" ? "warning" : "danger"
                                }
                                size="sm"
                            >
                                {recipe.difficulty}
                            </Badge>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            <Icon icon="material-symbols:star" className="w-4 h-4 text-warning-500" />
                            <span className="text-sm text-foreground-600">
                                {recipe.rating.toFixed(1)} ({recipe.reviewCount})
                            </span>
                        </div>

                        {/* Time Information */}
                        <div className="flex items-center justify-between w-full text-sm text-foreground-600">
                            <div className="flex items-center gap-1">
                                <Icon icon="material-symbols:schedule" className="w-4 h-4" />
                                <span>Prep: {recipe.prepTimeMinutes}m</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Icon icon="material-symbols:schedule" className="w-4 h-4" />
                                <span>Cook: {recipe.cookTimeMinutes}m</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    );
}
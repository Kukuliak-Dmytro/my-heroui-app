"use client";
import { Link } from "@/shared/lib/i18n/navigation";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Badge } from "@heroui/badge";
import { Skeleton } from "@heroui/skeleton";
import { Icon } from "@iconify/react";
import { useState } from "react";

import { recipeQueryOptions } from "@/entities/api";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { IRecipe } from "@/shared/interfaces/recipe";
import { useTranslations } from "next-intl";

/**
 * RecipeCard component for displaying a recipe in the list
 * @param recipe - Recipe object
 * @returns RecipeCard component
 */
export const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const t = useTranslations();

  //prefetch the recipe when the mouse enters the card
  return (
    <div
      className="h-full w-full"
      onMouseEnter={() => {
        getQueryClient().prefetchQuery(
          recipeQueryOptions(recipe.id.toString()),
        );
      }}
    >
      <Link className="block h-full w-full" href={`/recipes/${recipe.id}`}>
        <Card
          isPressable
          className="h-full w-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        >
          <CardBody className="p-0 relative w-full">
            {!imageLoaded && <Skeleton className="w-full aspect-[4/3]" />}
            <Image
              alt={recipe.name}
              className={`w-full aspect-[4/3] object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0 absolute top-0 left-0"
              }`}
              fallbackSrc="https://via.placeholder.com/400x300?text=Recipe+Image"
              src={recipe.image}
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
                className="text-xs"
                color="primary"
                size="sm"
                variant="flat"
              >
                {recipe.cuisine}
              </Chip>
              <Badge
                color={
                  recipe.difficulty === "Easy"
                    ? "success"
                    : recipe.difficulty === "Medium"
                      ? "warning"
                      : "danger"
                }
                size="sm"
              >
                {recipe.difficulty}
              </Badge>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Icon
                className="w-4 h-4 text-warning-500"
                icon="material-symbols:star"
              />
              <span className="text-sm text-foreground-600">
                {recipe.rating.toFixed(1)} ({recipe.reviewCount})
              </span>
            </div>

            {/* Time Information */}
            <div className="flex items-center justify-between w-full text-sm text-foreground-600">
              <div className="flex items-center gap-1">
                <Icon className="w-4 h-4" icon="material-symbols:schedule" />
                <span>
                  {t("recipe.prep")}: {recipe.prepTimeMinutes}
                  {t("recipe.min")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Icon className="w-4 h-4" icon="material-symbols:schedule" />
                <span>
                  {t("recipe.cook")}: {recipe.cookTimeMinutes}
                  {t("recipe.min")}
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

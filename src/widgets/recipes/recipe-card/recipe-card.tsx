"use client";
import { Link } from "@/shared/lib/i18n/navigation";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Badge } from "@heroui/badge";
import { Skeleton } from "@heroui/skeleton";
import { Icon } from "@iconify/react";
import { useState } from "react";
import clsx from "clsx";
import { recipeQueryOptions } from "@/entities/api";
import { getQueryClient } from "@/shared/lib/utils/get-query-client";
import { IRecipe } from "@/shared/interfaces/recipe";
import { useTranslations } from "next-intl";

/**
 * RecipeCard component for displaying a recipe in the list
 * @param recipe - Recipe object (optional when loading)
 * @param isLoading - Whether to show loading skeleton
 * @returns RecipeCard component
 */
export const RecipeCard = ({
  recipe,
  isLoading = false,
}: {
  recipe?: IRecipe;
  isLoading?: boolean;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const t = useTranslations();

  // Show skeleton when loading
  if (isLoading) {
    return (
      <div className="h-full w-full">
        <Card className="h-full w-full">
          <CardBody className="p-0 relative w-full">
            <Skeleton className="w-full aspect-4/3" />
          </CardBody>
          <CardFooter className="flex flex-col items-start gap-3 p-4">
            <Skeleton className="h-5 w-3/4 rounded" />
            <div className="flex flex-wrap items-center justify-between w-full">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <Skeleton className="h-4 w-24 rounded" />
            <div className="flex gap-4 w-full">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Early return if no recipe data
  if (!recipe) return null;

  //prefetch the recipe when the mouse enters the card
  return (
    <div
      className="h-full w-full"
      onMouseEnter={() => {
        getQueryClient().prefetchQuery(
          recipeQueryOptions(recipe.id.toString()),
        );
      }}>
      {/* renders the card as a link */}
      {/* fixed the problem with having to focus two times, when was wrapped in a link */}
      <Card
        as={Link}
        href={`/recipes/${recipe.id}`}
        isPressable
        // this utillity is added bc eslint formats and adds a new line after the className, causing hydration errors
        // the utility formats the classnames cleantly on the output
        className={clsx(
          "h-full w-full hover:shadow-lg transition-shadow",
          "duration-300 cursor-pointer",
        )}>
        <CardBody className="p-0 relative w-full">
          {!imageLoaded && <Skeleton className="w-full aspect-4/3" />}
          <Image
            alt={recipe.name}
            // this utillity is added bc eslint formats and adds a new line after the className, causing hydration errors
            // the utility formats the classnames cleantly on the output
            className={clsx(
              "w-full aspect-4/3 object-cover transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0 absolute top-0 left-0",
            )}
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
          <div
            // this utillity is added bc eslint formats and adds a new line after the className, causing hydration errors
            // the utility formats the classnames cleantly on the output
            className={clsx(
              "flex flex-wrap items-center justify-between",
              "w-full mx-auto",
            )}>
            <Chip className="text-xs" color="primary" size="sm" variant="flat">
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
              size="sm">
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
          <div
            // this utillity is added bc eslint formats and adds a new line after the className, causing hydration errors
            // the utility formats the classnames cleantly on the output
            className={clsx(
              "flex items-center justify-between w-full",
              "text-sm text-foreground-600",
            )}>
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
    </div>
  );
};

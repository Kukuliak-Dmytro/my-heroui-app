"use client";
import { useQuery } from "@tanstack/react-query";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Badge } from "@heroui/badge";
import { Divider } from "@heroui/divider";
import { Alert } from "@heroui/alert";
import { Skeleton } from "@heroui/skeleton";
import { Icon } from "@iconify/react";
import { useState } from "react";

import { recipeQueryOptions } from "@/entities/api";

export const DetailedRecipeCard = ({ id }: { id: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { data: recipe, isLoading, error } = useQuery(recipeQueryOptions(id));

  // Only show loading if we don't have data AND we're actually fetching
  if (isLoading && !recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-3/4 rounded-lg" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <div className="flex gap-6">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
            <div className="lg:w-80 lg:flex-shrink-0">
              <Skeleton className="w-full aspect-[4/3] lg:aspect-square rounded-lg" />
            </div>
          </div>

          {/* Divider */}
          <Skeleton className="h-px w-full" />

          {/* Time and Servings Info Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="text-center p-4 bg-default-50 rounded-lg"
              >
                <Skeleton className="w-6 h-6 mx-auto mb-2 rounded" />
                <Skeleton className="h-3 w-16 mx-auto mb-1" />
                <Skeleton className="h-4 w-12 mx-auto" />
              </div>
            ))}
          </div>

          {/* Tags Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-20" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        className="max-w-md mx-auto"
        color="danger"
        description={error.message}
        title="Error Loading Recipe"
      />
    );
  }

  if (!recipe) {
    return (
      <Alert
        className="max-w-md mx-auto"
        color="warning"
        description="The requested recipe could not be found."
        title="Recipe Not Found"
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Tabs
        aria-label="Recipe details"
        className="w-full"
        classNames={{
          tabList: "w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-6 h-12",
          tabContent: "group-data-[selected=true]:text-primary-foreground",
        }}
      >
        <Tab key="overview" title="Overview">
          <Card className="mt-6">
            <CardBody className="p-6">
              {/* Header Section */}
              <div className="flex flex-col lg:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-4">
                    {recipe.name}
                  </h1>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Chip color="primary" variant="flat">
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
                    >
                      {recipe.difficulty}
                    </Badge>
                    {recipe.mealType.map((meal, index) => (
                      <Chip key={index} size="sm" variant="bordered">
                        {meal}
                      </Chip>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-foreground-600">
                    <div className="flex items-center gap-1">
                      <Icon
                        className="w-5 h-5 text-warning-500"
                        icon="material-symbols:star"
                      />
                      <span className="font-medium">
                        {recipe.rating.toFixed(1)} ({recipe.reviewCount}{" "}
                        reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon
                        className="w-5 h-5 text-danger-500"
                        icon="material-symbols:local-fire-department"
                      />
                      <span>{recipe.caloriesPerServing} cal/serving</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-80 lg:flex-shrink-0">
                  {!imageLoaded && (
                    <Skeleton className="w-full aspect-[4/3] lg:aspect-square rounded-lg" />
                  )}
                  <Image
                    alt={recipe.name}
                    className={`w-full aspect-[4/3] lg:aspect-square object-cover rounded-lg transition-opacity duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0 absolute"
                    }`}
                    fallbackSrc="https://via.placeholder.com/400x300?text=Recipe+Image"
                    src={recipe.image}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>

              <Divider className="my-6" />

              {/* Time and Servings Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-default-50 rounded-lg">
                  <Icon
                    className="w-6 h-6 mx-auto mb-2 text-primary"
                    icon="material-symbols:schedule"
                  />
                  <div className="text-sm text-foreground-600">Prep Time</div>
                  <div className="font-semibold">
                    {recipe.prepTimeMinutes} min
                  </div>
                </div>
                <div className="text-center p-4 bg-default-50 rounded-lg">
                  <Icon
                    className="w-6 h-6 mx-auto mb-2 text-primary"
                    icon="material-symbols:schedule"
                  />
                  <div className="text-sm text-foreground-600">Cook Time</div>
                  <div className="font-semibold">
                    {recipe.cookTimeMinutes} min
                  </div>
                </div>
                <div className="text-center p-4 bg-default-50 rounded-lg">
                  <Icon
                    className="w-6 h-6 mx-auto mb-2 text-primary"
                    icon="material-symbols:group"
                  />
                  <div className="text-sm text-foreground-600">Servings</div>
                  <div className="font-semibold">{recipe.servings}</div>
                </div>
                <div className="text-center p-4 bg-default-50 rounded-lg">
                  <Icon
                    className="w-6 h-6 mx-auto mb-2 text-primary"
                    icon="material-symbols:schedule"
                  />
                  <div className="text-sm text-foreground-600">Total Time</div>
                  <div className="font-semibold">
                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                  </div>
                </div>
              </div>

              {/* Tags */}
              {recipe.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, index) => (
                      <Chip key={index} size="sm" variant="bordered">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="ingredients"
          title={`Ingredients (${recipe.ingredients.length})`}
        >
          <Card className="mt-6">
            <CardBody className="p-6">
              <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-default-50 rounded-lg"
                  >
                    <Icon
                      className="w-5 h-5 text-success-500 flex-shrink-0"
                      icon="material-symbols:check-circle"
                    />
                    <span className="text-foreground">{ingredient}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="instructions"
          title={`Instructions (${recipe.instructions.length} steps)`}
        >
          <Card className="mt-6">
            <CardBody className="p-6">
              <h3 className="text-xl font-semibold mb-4">Instructions</h3>
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-foreground leading-relaxed">
                        {instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

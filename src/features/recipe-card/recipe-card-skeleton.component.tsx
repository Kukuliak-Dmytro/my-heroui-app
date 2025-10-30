"use client";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export const RecipeCardSkeleton = () => {
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
};

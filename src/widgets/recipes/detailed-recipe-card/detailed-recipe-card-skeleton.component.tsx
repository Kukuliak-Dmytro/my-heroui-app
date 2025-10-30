"use client";
import { Skeleton } from "@heroui/skeleton";

export const DetailedRecipeCardSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="space-y-6">
        <div>
          <div
            className="w-full relative rounded-none p-0 border-b border-divider
              mb-6 flex gap-3">
            <Skeleton className="h-12 w-28 rounded-md" />
            <Skeleton className="h-12 w-40 rounded-md" />
            <Skeleton className="h-12 w-44 rounded-md" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 p-4">
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
            <Skeleton
              className="w-full aspect-[4/3] lg:aspect-square rounded-lg"
            />
          </div>
        </div>

        <Skeleton className="h-px w-full" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="text-center p-4 bg-default-50 rounded-lg">
              <Skeleton className="w-6 h-6 mx-auto mb-2 rounded" />
              <Skeleton className="h-3 w-16 mx-auto mb-1" />
              <Skeleton className="h-4 w-12 mx-auto" />
            </div>
          ))}
        </div>

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
};

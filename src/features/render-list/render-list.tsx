import { Alert } from "@heroui/alert";
import { Spinner } from "@heroui/spinner";

interface RenderListProps<T> {
  items: T[];
  isLoading: boolean;
  error: Error | null;
  isSearching?: boolean;
  title: string;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderSkeleton?: (index: number) => React.ReactNode;
  emptyMessage?: string;
}

/**
 * A generic list rendering component that handles loading, error, and empty states
 * @template T - The type of items in the list
 * @param props - The component props
 * @returns JSX element representing the list with appropriate state handling
 */
//Comma here is a syntax requirement - TS compiler can interpret <T> as a component
//Adding the comma tells the compiler that T is a generic type, not a component.
export const renderList = <T,>({
  items,
  isLoading,
  error,
  isSearching,
  title,
  renderItem,
  renderSkeleton,
  emptyMessage,
}: RenderListProps<T>) => {
  // Render loading state with skeleton items
  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {isSearching && (
            <div className="flex items-center gap-2 text-sm">
              <Spinner size="sm" />
              <span>Searching...</span>
            </div>
          )}
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-full w-full">
              {renderSkeleton ? renderSkeleton(index) : null}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Render error state with alert component
  if (error) {
    return (
      <section className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
        <h1 className="text-2xl font-bold mb-4 text-foreground">{title}</h1>
        <div className="min-h-[40vh] flex items-center justify-center">
          <Alert
            color="danger"
            title="Error Loading Recipes"
            description={error.message}
            className="max-w-md w-full"
          />
        </div>
      </section>
    );
  }

  // Render success state with items and optional empty message
  return (
    <section className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {isSearching && (
          <div className="flex items-center gap-2 text-sm">
            <Spinner size="sm" />
            <span>Searching...</span>
          </div>
        )}
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
          gap-3 sm:gap-4">
        {items.map((item, index) => renderItem(item, index))}
      </div>
      {items.length === 0 && emptyMessage && (
        <div className="text-center py-12">
          <p className="text-lg">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
};

"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSearchFormSchema, SearchFormData } from "./searchbar.validation";
import { useSearchStore, SearchStoreContext } from "@/features/search";
import { useRouter } from "@/shared/lib/i18n/navigation";
import { tryCatchWithSentry } from "@/shared/lib/utils/try-catch";
import { useState, useEffect, useContext } from "react";
import { useTranslations } from "next-intl";

interface ISearchbarProps {
  placeholder?: string;
  className?: string;
}

/**
 * Searchbar component that uses the search store for state management.
 *
 * This component provides a search input with form validation and automatic
 * query synchronization with the URL. It includes loading states and error handling.
 *
 * @param {ISearchbarProps} props - Component props
 * @param {string} [props.placeholder] - Placeholder text for the input
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The searchbar component
 */
const SearchbarWithStore = ({ placeholder, className }: ISearchbarProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);
  const clearQuery = useSearchStore((state) => state.clearQuery);

  const searchFormSchema = createSearchFormSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    mode: "onChange",
    defaultValues: {
      query: query,
    },
  });

  // Update form when search store query changes
  useEffect(() => {
    setValue("query", query);
  }, [query, setValue]);

  const queryValue = watch("query");

  const onSubmit = async (data: SearchFormData) => {
    setIsLoading(true);
    await tryCatchWithSentry(Promise.resolve(setQuery(data.query.trim())));
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex items-top gap-2 ${className}`}>
      <Input
        {...register("query")}
        placeholder={placeholder || t("search.placeholder")}
        isInvalid={!!errors.query}
        errorMessage={errors.query?.message}
        disabled={isLoading}
        className="flex-1"
        startContent={<Icon icon="mdi:magnify" />}
        type="search"
        isClearable
        onClear={() => {
          setValue("query", "");
          clearQuery();
        }}
      />
      <Button
        type="submit"
        color="primary"
        isLoading={isLoading}
        disabled={!isValid || isLoading || queryValue.length < 2}
        endContent={!isLoading && <Icon icon="mdi:search" />}>
        {isLoading ? t("search.searching") : t("search.button")}
      </Button>
    </form>
  );
};

/**
 * Searchbar component that uses local state for form management.
 *
 * This component provides search functionality without store integration,
 * using local state and direct navigation for form handling.
 *
 * @param {ISearchbarProps} props - Component props
 * @param {string} [props.placeholder] - Placeholder text for the input
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The local state searchbar component
 */
const SearchbarWithLocalState = ({
  placeholder,
  className,
}: ISearchbarProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localQuery, setLocalQuery] = useState("");
  const t = useTranslations();
  const router = useRouter();

  const searchFormSchema = createSearchFormSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    mode: "onChange",
    defaultValues: {
      query: localQuery,
    },
  });

  // Update form when local query changes
  useEffect(() => {
    setValue("query", localQuery);
  }, [localQuery, setValue]);

  const queryValue = watch("query");

  const onSubmit = async (data: SearchFormData) => {
    setIsLoading(true);
    await tryCatchWithSentry(
      (async () => {
        setLocalQuery(data.query.trim());
        // Redirect to recipes page with search query
        const searchParams = new URLSearchParams({
          search: data.query.trim(),
        });
        router.push(`/recipes?${searchParams.toString()}`);
      })(),
    );
    setIsLoading(false);
  };

  const handleClear = () => {
    setValue("query", "");
    setLocalQuery("");
    router.push("/recipes");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex items-top gap-2 ${className}`}>
      <Input
        {...register("query")}
        placeholder={placeholder || t("search.placeholder")}
        isInvalid={!!errors.query}
        errorMessage={errors.query?.message}
        disabled={isLoading}
        className="flex-1"
        startContent={<Icon icon="mdi:magnify" />}
        type="search"
        isClearable
        onClear={handleClear}
      />
      <Button
        type="submit"
        color="primary"
        isLoading={isLoading}
        disabled={!isValid || isLoading || queryValue.length < 2}
        endContent={!isLoading && <Icon icon="mdi:search" />}>
        {isLoading ? t("search.searching") : t("search.button")}
      </Button>
    </form>
  );
};

/**
 * Main searchbar component that chooses the appropriate implementation.
 *
 * This component automatically detects if a search store provider is available
 * and renders the appropriate searchbar implementation accordingly.
 *
 * @param {ISearchbarProps} props - Component props
 * @returns {JSX.Element} The appropriate searchbar implementation
 */
export const Searchbar = (props: ISearchbarProps) => {
  const searchStoreContext = useContext(SearchStoreContext);

  if (searchStoreContext) {
    return <SearchbarWithStore {...props} />;
  }

  return <SearchbarWithLocalState {...props} />;
};

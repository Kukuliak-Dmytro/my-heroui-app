"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema, SearchFormData } from "./searchbar.validation";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface ISearchbarProps {
    placeholder?: string;
    className?: string;
}

export const Searchbar = ({
    placeholder = "Search recipes...",
    className = ""
}: ISearchbarProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get("search") || "";

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        watch
    } = useForm<SearchFormData>({
        resolver: zodResolver(searchFormSchema),
        mode: "onChange",
        defaultValues: {
            query: currentQuery
        }
    });

    // Update form when URL search param changes
    useEffect(() => {
        setValue("query", currentQuery);
    }, [currentQuery, setValue]);

    const queryValue = watch("query");

    const onSubmit = async (data: SearchFormData) => {
        setIsLoading(true);
        try {
            // Navigate to recipes page with search query
            const searchParams = new URLSearchParams({
                search: data.query.trim()
            });
            router.push(`/recipes?${searchParams.toString()}`);
            // Don't reset the form - keep the search term visible
        } catch {
            // Handle search error silently
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`flex items-top gap-2 ${className}`}>
            <Input
                {...register("query")}
                placeholder={placeholder}
                isInvalid={!!errors.query}
                errorMessage={errors.query?.message}
                disabled={isLoading}
                className="flex-1"
                startContent={<Icon icon="mdi:magnify" className="text-default-400" />}
                type="search"
                isClearable
                onClear={() => {
                    setValue("query", "");
                    router.push('/recipes');
                }}
            />
            <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
                disabled={!isValid || isLoading || queryValue.length < 2}
                endContent={!isLoading && <Icon icon="mdi:search" />}
            >
                {isLoading ? "Searching..." : "Search"}
            </Button>
        </form>
    );
};
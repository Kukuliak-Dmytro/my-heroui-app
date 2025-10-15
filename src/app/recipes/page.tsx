import { RecipesPageComponent } from "@/modules/recipes/recipes-page/recipes-page.component";

interface IRecipesPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RecipesPage({ searchParams }: IRecipesPageProps) {
    const resolvedSearchParams = await searchParams;
    return (
        <RecipesPageComponent searchParams={resolvedSearchParams} />
    )
}

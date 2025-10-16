import { Link } from "@heroui/link";
import { Searchbar } from "@/widgets/searchbar";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-4xl text-center justify-center">
        <h1 className="text-4xl font-bold">{t("home.title")}</h1>
        <p className="mt-4">{t("home.description")}</p>
        <Link href="/recipes">{t("home.viewAllRecipes")}</Link>
        <p className="mt-4">{t("home.searchPrompt")}</p>
        <div className="flex justify-center gap-4 items-center my-4">
          <Suspense fallback={<div>{t("home.loadingSearch")}</div>}>
            <Searchbar />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

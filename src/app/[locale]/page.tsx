import { Link } from "@heroui/link";
import { Searchbar } from "@/widgets/searchbar";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

/**
 * Home content component that uses translations (dynamic data via headers()).
 * Wrapped in Suspense to enable PPR - this will stream in while the shell loads.
 */
async function HomeContent() {
  const t = await getTranslations();

  return (
    <>
      <h1 className="text-4xl font-bold">{t("home.title")}</h1>
      <p className="mt-4">{t("home.description")}</p>
      <Link href="/recipes">{t("home.viewAllRecipes")}</Link>
      <p className="mt-4">{t("home.searchPrompt")}</p>
      <div className="flex justify-center gap-4 items-center my-4">
        <Suspense fallback={<div>{t("home.loadingSearch")}</div>}>
          <Searchbar />
        </Suspense>
      </div>
    </>
  );
}

/**
 * Home page component with search functionality.
 *
 * This demonstrates PPR (Partial Pre-Rendering):
 * - The page structure is pre-rendered as a static shell
 * - Dynamic content (translations via headers()) streams in via Suspense
 *
 * @returns The home page component
 */
export default function Home() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-4xl text-center justify-center">
        <HomeContent />
      </div>
    </section>
  );
}

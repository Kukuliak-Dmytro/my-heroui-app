import { Link } from "@heroui/link";
import { Searchbar } from "@/widgets/searchbar";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-4xl text-center justify-center">
        <h1 className="text-4xl font-bold">
          Welcome to the Recipe Collection!
        </h1>
        <p className="mt-4">
          Discover and explore delicious recipes from around the world.
        </p>
        <Link href="/recipes">View All Recipes</Link>
        <p className="mt-4">
          Search for recipes by name, ingredients, or cuisine.
        </p>
        <div className="flex justify-center gap-4 items-center my-4">
          <Suspense fallback={<div>Loading search...</div>}>
            <Searchbar />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

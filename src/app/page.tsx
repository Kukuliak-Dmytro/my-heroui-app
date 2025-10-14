
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-4xl text-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to the Recipe Collection!</h1>
        <p className="mt-4">
          Discover and explore delicious recipes from around the world.
        </p>
        <p className="mt-4">Search for recipes by name, ingredients, or cuisine.</p>
        <div className="flex justify-center gap-4 items-center my-4">
          <div>*Search bar here*</div>
          <Button>Search</Button>
          <Link href="/recipes">View All Recipes</Link>
        </div>


      </div>
    </section>
  );
}

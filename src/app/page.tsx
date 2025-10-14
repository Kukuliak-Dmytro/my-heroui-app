import { ThemeSwitch } from "../features/theme-switch";
import { Button } from "@heroui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className="text-4xl font-bold">Hello, world!</h1>
        <p className="mt-4">
          This is a simple page to test the theme switcher and a button.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <ThemeSwitch />
          <Button color="primary">
            Primary Button
          </Button>
          <Button color="secondary">
            Secondary Button
          </Button>
          <Button>
            Default Button
          </Button>
        </div>
      </div>
    </section>
  );
}

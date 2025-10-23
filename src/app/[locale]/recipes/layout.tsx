import { ThemeSwitch } from "@/features/theme-switch/theme-switch.component";
import { LocaleSwitcher } from "@/features/locale-switcher/locale-switcher.component";

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
      <header className="sticky top-0 z-50 w-full">
        <nav
          className="flex items-center justify-between px-4 sm:px-6 lg:px-8
            h-16">
          <div className="flex items-center gap-4">
            <ThemeSwitch />
            <LocaleSwitcher />
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
}

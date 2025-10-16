export type SiteConfig = typeof SITE_CONFIG;

export const SITE_CONFIG = {
  name: "Recipe Collection",
  description: "Discover and explore delicious recipes from around the world.",
  navItems: [
    {
      labelKey: "nav.home",
      href: "/",
    },
    {
      labelKey: "nav.recipes",
      href: "/recipes",
    },
  ],
  navMenuItems: [
    {
      labelKey: "nav.allRecipes",
      href: "/recipes",
    },
    {
      labelKey: "nav.home",
      href: "/",
    },
  ],
};

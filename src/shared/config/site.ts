export type SiteConfig = typeof SITE_CONFIG;

export const SITE_CONFIG = {
  name: "Recipe Collection",
  description: "Discover and explore delicious recipes from around the world.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Recipes",
      href: "/recipes",
    },
  ],
  navMenuItems: [
    {
      label: "All Recipes",
      href: "/recipes",
    },
    {
      label: "Home",
      href: "/",
    },
  ],
};

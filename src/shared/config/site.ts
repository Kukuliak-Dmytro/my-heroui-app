export type SiteConfig = typeof siteConfig;

export const siteConfig = {
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
  ]
};

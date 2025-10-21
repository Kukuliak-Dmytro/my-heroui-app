export type SiteConfig = typeof SITE_CONFIG;

/**
 * Site configuration object containing application metadata.
 *
 * This configuration defines the site name, description, navigation items,
 * and menu items for the application. It provides a centralized place for
 * managing site-wide settings and navigation structure.
 */
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

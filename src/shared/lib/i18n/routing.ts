import { defineRouting } from "next-intl/routing";

/**
 * Internationalization routing configuration.
 *
 * This configuration defines the supported locales, default locale,
 * and routing behavior for the application. It supports English and
 * Ukrainian locales with automatic locale prefix handling.
 */
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ua"],
  // Used when no locale matches
  defaultLocale: "en",
  //hides the default locale from the url
  localePrefix: "always",
});

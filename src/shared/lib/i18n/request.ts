import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * Request configuration for internationalization.
 *
 * This function handles locale detection and message loading for each request.
 * It determines the appropriate locale and loads the corresponding message files.
 *
 * @param requestLocale - The requested locale from the URL
 * @returns Configuration object with locale and messages
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;

  // Validate and fallback to default locale if invalid
  let locale = routing.defaultLocale;

  if (requested && hasLocale(routing.locales, requested)) {
    locale = requested;
  }

  return {
    locale,
    messages: (await import(`../../../../messages/${locale}.json`)).default,
  };
});

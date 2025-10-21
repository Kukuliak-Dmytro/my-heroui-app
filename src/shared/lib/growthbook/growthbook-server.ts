import { setPolyfills, configureCache } from "@growthbook/growthbook";

/**
 * Configures GrowthBook for server-side feature flag evaluation.
 *
 * This function sets up polyfills and caching configuration for GrowthBook
 * to work properly in server-side environments with Next.js caching.
 *
 * @returns
 */
export function configureServerSideGrowthBook() {
  // Tag fetch requests so they can be revalidated on demand
  setPolyfills({
    fetch: (
      url: Parameters<typeof fetch>[0],
      opts: Parameters<typeof fetch>[1],
    ) =>
      fetch(url, {
        ...opts,
        next: {
          // Cache feature definitions for 30 seconds
          // Implement SDK webhooks to revalidate on demand (see gb-revalidate route handler)
          revalidate: 30,
          tags: ["growthbook"],
        },
      }),
  });

  // Disable the built-in cache since we're using Next.js's fetch cache instead
  configureCache({
    disableCache: true,
  });
}

import mixpanel from "mixpanel-browser";
import { tryCatchWithSentry } from "../utils/try-catch";
import type { Metric } from "web-vitals";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// Track initialization state
let isInitialized = false;

/**
 * Initializes the Mixpanel analytics client.
 *
 * This function sets up Mixpanel with the token from environment variables.
 * It configures the client with EU API host and disables autocapture for better control.
 * The function is synchronous and uses traditional try-catch for error handling.
 *
 * @returns True if initialization was successful, false otherwise
 */
export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn("⚠️ Mixpanel token is missing! Analytics disabled.");
    console.warn(
      "Add NEXT_PUBLIC_MIXPANEL_TOKEN=your_token_here to your .env.local file",
    );
    return false;
  }

  try {
    mixpanel.init(MIXPANEL_TOKEN, {
      autocapture: false, // Disable autocapture for better control
      debug: false, // Disable debug logging
      // this shit's required
      //you'd think if no api is provided, it will default to the cloud,
      //but no, if you don't specify the host here, it will not display anything
      api_host: "https://api-eu.mixpanel.com",
    });

    isInitialized = true;

    return true;
  } catch (error) {
    console.error("❌ Failed to initialize Mixpanel:", error);
    return false;
  }
};

/**
 * Tracks a recipe view event in Mixpanel analytics.
 *
 * This function sends a "Recipe View" event to Mixpanel with recipe details
 * including ID, name, timestamp, and current URL. The function uses tryCatchWithSentry
 * for automatic error reporting to Sentry.
 *
 * @param recipeId - The unique identifier of the recipe
 * @param recipeName - The display name of the recipe
 * @returns A promise that resolves when tracking is complete
 */
export const trackRecipeView = async (recipeId: string, recipeName: string) => {
  if (!isInitialized) {
    console.warn(
      "⚠️ Mixpanel not initialized. Recipe view not tracked:",
      recipeName,
    );
    return;
  }

  await tryCatchWithSentry(
    Promise.resolve(
      mixpanel.track("Recipe View", {
        recipe_id: recipeId,
        recipe_name: recipeName,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      }),
    ),
    { tags: { component: "mixpanel", operation: "trackRecipeView" } },
  );
};

/**
 * Tracks a page view event in Mixpanel analytics.
 *
 * This function sends a "Page View" event to Mixpanel with page details
 * including page name, path, locale, timestamp, current URL, and referrer.
 * The function uses tryCatchWithSentry for automatic error reporting to Sentry.
 *
 * @param page - The name or identifier of the page
 * @param path - The URL path of the page
 * @param locale - Optional locale information
 * @returns A promise that resolves when tracking is complete
 */
export const trackPageView = async (
  page: string,
  path: string,
  locale?: string,
) => {
  if (!isInitialized) {
    console.warn("⚠️ Mixpanel not initialized. Page view not tracked:", page);
    return;
  }

  await tryCatchWithSentry(
    Promise.resolve(
      mixpanel.track("Page View", {
        page,
        path,
        locale,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer,
      }),
    ),
    { tags: { component: "mixpanel", operation: "trackPageView" } },
  );
};

/**
 * Tracks an experiment view event in Mixpanel analytics.
 *
 * This function sends an "Experiment Viewed" event to Mixpanel with experiment
 * details including experiment ID, variation ID, current path, timestamp, and
 * any additional custom properties. The function uses tryCatchWithSentry for
 * automatic error reporting to Sentry.
 *
 * @param experimentId - The unique identifier of the experiment
 * @param variationId - The identifier of the variation being viewed
 * @param extra - Optional additional properties to track
 * @returns A promise that resolves when tracking is complete
 */
export const trackExperimentView = async (
  experimentId: string,
  variationId: string,
  extra?: Record<string, unknown>,
) => {
  if (!isInitialized) {
    console.warn(
      "⚠️ Mixpanel not initialized. Experiment exposure not tracked:",
      experimentId,
    );
    return;
  }

  await tryCatchWithSentry(
    Promise.resolve(
      mixpanel.track("Experiment Viewed", {
        experiment_id: experimentId,
        variation_id: variationId,
        path:
          typeof window !== "undefined" ? window.location.pathname : undefined,
        timestamp: new Date().toISOString(),
        ...extra,
      }),
    ),
    { tags: { component: "mixpanel", operation: "trackExperimentView" } },
  );
};

/**
 * Tracks web vitals metrics in Mixpanel analytics.
 *
 * This function sends a "Web Vitals" event to Mixpanel with performance metrics
 * including Core Web Vitals and other performance measurements. The function uses
 * tryCatchWithSentry for automatic error reporting to Sentry.
 *
 * @param metrics - Object containing web vitals metrics
 * @returns A promise that resolves when tracking is complete
 */
export const trackWebVitals = async (metrics: Record<string, Metric>) => {
  if (!isInitialized) {
    console.warn("⚠️ Mixpanel not initialized. Web vitals not tracked");
    return;
  }

  await tryCatchWithSentry(
    Promise.resolve(
      mixpanel.track("Web Vitals", {
        metrics,
        timestamp: new Date().toISOString(),
      }),
    ),
    { tags: { component: "mixpanel", operation: "trackWebVitals" } },
  );
};

/**
 * Checks if Mixpanel is initialized and ready for tracking.
 *
 * This utility function returns the current initialization state of the Mixpanel client.
 * It can be used to conditionally execute tracking code or show appropriate UI states.
 *
 * @returns True if Mixpanel is initialized and ready, false otherwise
 */
export const isMixpanelReady = () => isInitialized;

import mixpanel from "mixpanel-browser";
import { tryCatchWithSentry } from "../utils/try-catch";
import type { Metric } from "web-vitals";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// Track initialization state
let isInitialized = false;

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
      api_host: "https://api-eu.mixpanel.com",
    });

    isInitialized = true;
    console.log("✅ Mixpanel initialized successfully");

    // Test event to verify setup
    mixpanel.track("Mixpanel Initialized", {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });

    return true;
  } catch (error) {
    console.error("❌ Failed to initialize Mixpanel:", error);
    return false;
  }
};

export const trackRecipeView = (recipeId: string, recipeName: string) => {
  if (!isInitialized) {
    console.warn(
      "⚠️ Mixpanel not initialized. Recipe view not tracked:",
      recipeName,
    );
    return;
  }

  try {
    mixpanel.track("Recipe View", {
      recipe_id: recipeId,
      recipe_name: recipeName,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    });
    console.log("📊 Recipe view tracked:", recipeName);
  } catch (error) {
    console.error("❌ Failed to track recipe view:", error);
  }
};

export const trackPageView = (page: string, path: string, locale?: string) => {
  if (!isInitialized) {
    console.warn("⚠️ Mixpanel not initialized. Page view not tracked:", page);
    return;
  }

  try {
    mixpanel.track("Page View", {
      page,
      path,
      locale,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer,
    });
    console.log("📄 Page view tracked:", page);
  } catch (error) {
    console.error("❌ Failed to track page view:", error);
  }
};

export const trackExperimentView = (
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

  try {
    mixpanel.track("Experiment Viewed", {
      experiment_id: experimentId,
      variation_id: variationId,
      path:
        typeof window !== "undefined" ? window.location.pathname : undefined,
      timestamp: new Date().toISOString(),
      ...extra,
    });
    console.log("🧪 Experiment exposure tracked:", experimentId, variationId);
  } catch (error) {
    console.error("❌ Failed to track experiment exposure:", error);
  }
};

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

// Check if Mixpanel is ready
export const isMixpanelReady = () => isInitialized;

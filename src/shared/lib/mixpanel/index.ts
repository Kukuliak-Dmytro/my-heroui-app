/**
 * Mixpanel library re-exports.
 *
 * This file re-exports all Mixpanel-related utilities and tracking functions
 * for convenient importing throughout the application.
 */
export {
  initMixpanel,
  trackRecipeView,
  trackPageView,
  isMixpanelReady,
} from "./mixpanel-client";

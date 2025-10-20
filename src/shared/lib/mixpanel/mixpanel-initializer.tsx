"use client";

import { useEffect } from "react";
import {
  initMixpanel,
  trackPageView,
} from "@/shared/lib/mixpanel/mixpanel-client";

/**
 * Mixpanel initializer component for client-side analytics setup.
 *
 * This component initializes Mixpanel analytics on the client side and
 * tracks the initial page view. It runs once when the component mounts
 * and doesn't render any UI.
 *
 * @returns {null} This component renders nothing
 */
export function MixpanelInitializer() {
  useEffect(() => {
    const success = initMixpanel(); // Initialize Mixpanel
    if (success) {
      // Track app initialization
      trackPageView("App Initialized", window.location.pathname, "en");
    }
  }, []);

  return null; // This component doesn't render anything
}

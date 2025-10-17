"use client";

import { useEffect } from "react";
import {
  initMixpanel,
  trackPageView,
} from "@/shared/lib/mixpanel/mixpanel-client";

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

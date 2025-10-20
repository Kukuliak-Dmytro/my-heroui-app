"use client";
import { TrackingCallback, TrackingData } from "@growthbook/growthbook";
import { useEffect } from "react";
import { trackExperimentView } from "@/shared/lib/mixpanel/mixpanel-client";

export const onExperimentView: TrackingCallback = (experiment, result) => {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const key = `${experiment.key}:${result.key}:${path}`;
  // simple per-route de-dupe
  if (typeof window !== "undefined") {
    const seen = sessionStorage.getItem(key);
    if (seen) return;
    sessionStorage.setItem(key, "1");
  }

  trackExperimentView(experiment.key, result.key, { path });
};

// Helper component to track experiment views from server components
export function GrowthBookTracking({ data }: { data: TrackingData[] }) {
  useEffect(() => {
    data.forEach(({ experiment, result }) => {
      onExperimentView(experiment, result);
    });
  }, [data]);

  return null;
}

"use client";
import { TrackingCallback, TrackingData } from "@growthbook/growthbook";
import { useEffect } from "react";
import { trackExperimentView } from "@/shared/lib/mixpanel/mixpanel-client";

/**
 * Callback function for tracking experiment views in GrowthBook.
 *
 * This function handles experiment exposure tracking with deduplication to prevent
 * multiple tracking events for the same experiment on the same route. It uses
 * sessionStorage to track which experiments have been viewed and automatically
 * sends tracking data to Mixpanel.
 *
 * @param {Experiment} experiment - The experiment object from GrowthBook
 * @param {ExperimentResult} result - The result of the experiment evaluation
 */
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

/**
 * Helper component to track experiment views from server components.
 *
 * This component receives tracking data from server-side GrowthBook evaluations
 * and processes them on the client side to trigger experiment view tracking.
 * It handles the tracking asynchronously without rendering any UI.
 *
 * @param {Object} props - Component props
 * @param {TrackingData[]} props.data - Array of experiment tracking data from server
 * @returns {null} This component renders nothing
 */
export function GrowthBookTracking({ data }: { data: TrackingData[] }) {
  useEffect(() => {
    data.forEach(({ experiment, result }) => {
      onExperimentView(experiment, result);
    });
  }, [data]);

  return null;
}

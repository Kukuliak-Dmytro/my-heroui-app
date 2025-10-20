import { onCLS, onFCP, onLCP, onTTFB, onINP } from "web-vitals";
import type { Metric } from "web-vitals";
import { trackWebVitals } from "../mixpanel/mixpanel-client";

const metrics: Record<string, Metric> = {};
const expectedMetrics = ["CLS", "FCP", "LCP", "TTFB", "INP"];

/**
 * Initializes web vitals tracking for performance monitoring.
 *
 * This function sets up listeners for Core Web Vitals metrics including
 * CLS, FCP, LCP, TTFB, and INP. It collects metrics and sends them to
 * analytics when all expected metrics are gathered.
 */
export function initWebVitals() {
  // Track Core Web Vitals
  onCLS(collectMetric);
  onFCP(collectMetric);
  onLCP(collectMetric);
  onTTFB(collectMetric);
  onINP(collectMetric);
}

/**
 * Collects individual web vital metrics and tracks them when complete.
 *
 * This function stores individual metrics and checks if all expected
 * metrics have been collected. When complete, it sends the metrics
 * to analytics for tracking.
 *
 * @param {Metric} metric - The web vital metric to collect
 */
async function collectMetric(metric: Metric) {
  metrics[metric.name] = metric;

  // Check if we have all expected metrics
  const hasAllMetrics = expectedMetrics.every((name) => metrics[name]);

  if (hasAllMetrics) {
    await trackWebVitals(metrics);
  }
}

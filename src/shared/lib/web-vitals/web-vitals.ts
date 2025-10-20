import { onCLS, onFCP, onLCP, onTTFB, onINP } from "web-vitals";
import type { Metric } from "web-vitals";
import { trackWebVitals } from "../mixpanel/mixpanel-client";

const metrics: Record<string, Metric> = {};
const expectedMetrics = ["CLS", "FCP", "LCP", "TTFB", "INP"];

export function initWebVitals() {
  // Track Core Web Vitals
  onCLS(collectMetric);
  onFCP(collectMetric);
  onLCP(collectMetric);
  onTTFB(collectMetric);
  onINP(collectMetric);
}

async function collectMetric(metric: Metric) {
  metrics[metric.name] = metric;

  // Check if we have all expected metrics
  const hasAllMetrics = expectedMetrics.every((name) => metrics[name]);

  if (hasAllMetrics) {
    await trackWebVitals(metrics);
  }
}

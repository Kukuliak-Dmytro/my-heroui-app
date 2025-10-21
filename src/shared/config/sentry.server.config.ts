// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

/**
 * Sentry server-side configuration.
 *
 * This configuration initializes Sentry for server-side error tracking
 * and performance monitoring. It sets up DSN, sampling rates, and other
 * server-specific Sentry options.
 */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: false,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Release and environment configuration for better debugging
  release:
    process.env.SENTRY_RELEASE ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    "development",
  environment: process.env.NODE_ENV || "development",

  // Enable source maps for better stack traces
  attachStacktrace: true,
});

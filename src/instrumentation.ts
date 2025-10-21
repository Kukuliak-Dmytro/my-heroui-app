import * as Sentry from "@sentry/nextjs";

/**
 * Registers Sentry instrumentation based on the runtime environment.
 *
 * This function initializes Sentry with the appropriate configuration
 * depending on whether the code is running in Node.js or Edge runtime.
 *
 * @returns A promise that resolves when registration is complete
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./shared/config/sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./shared/config/sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;

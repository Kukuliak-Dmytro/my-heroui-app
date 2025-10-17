import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';
const withNextIntl = createNextIntlPlugin('./src/shared/lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withNextIntlConfig = withNextIntl(nextConfig);


// Injected content via Sentry wizard below



export default withSentryConfig(
  withNextIntlConfig,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: process.env.SENTRY_ORG || "dmytro-uz",
    project: process.env.SENTRY_PROJECT || "4510204235939920",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
    authToken: process.env.SENTRY_AUTH_TOKEN,

    // Source map configuration
    sourcemaps: {
      disable: false, // Source maps are enabled by default
      assets: ["**/*.js", "**/*.js.map"], // Specify which files to upload
      ignore: ["**/node_modules/**", "**/.next/**", "**/out/**"], // Files to exclude
      deleteSourcemapsAfterUpload: true, // Security: delete after upload
    },

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);

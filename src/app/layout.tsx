import "@/shared/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Suspense } from "react";

import { SITE_CONFIG } from "@/shared/config/site";
import { FONT_COMFORTAA, FONT_QUICKSAND } from "@/shared/config/fonts";

/**
 * Root layout - handles HTML structure and Suspense boundary.
 *
 * This is the top-level layout that provides:
 * - Basic HTML structure (html/head/body)
 * - Global styles and fonts
 * - Suspense boundary for locale-specific content (PPR)
 *
 * With the update of Nextjs to v.16, suspense boundaries are required for the new cached components strategy.
 * In the locale layout, we have params - the locale itself, which is dynamic and needs to be wrapped in Suspense.
 * This is exactly what we need here - to allow PPR
 */

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s - ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
// Nextjs 15.5 props helpers for type safety
export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          `min-h-screen text-foreground bg-background font-comfortaa
          font-semibold antialiased`,
          FONT_COMFORTAA.variable,
          FONT_QUICKSAND.variable,
        )}>
        {/* Suspense boundary for PPR - locale-specific content streams in */}
        <Suspense>{props.children}</Suspense>
      </body>
    </html>
  );
}

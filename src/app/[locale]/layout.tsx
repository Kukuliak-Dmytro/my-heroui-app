import "@/shared/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getMessages } from "next-intl/server";

import { Providers } from "./providers";

import { SITE_CONFIG } from "@/shared/config/site";
import { FONT_COMFORTAA, FONT_QUICKSAND } from "@/shared/config/fonts";
import { routing } from "@/shared/lib/i18n/routing";
/**
 * Root layout metadata configuration for the application.
 *
 * This metadata object defines the default title, description, icons,
 * and other SEO-related information for the application.
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          `min-h-screen text-foreground bg-background font-comfortaa
          font-semibold antialiased`,
          FONT_COMFORTAA.variable,
          FONT_QUICKSAND.variable,
        )}>
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "dark",
            enableSystem: true,
          }}
          locale={locale}
          messages={messages}>
          <div className="relative flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </Providers>
      </body>
    </html>
  );
}

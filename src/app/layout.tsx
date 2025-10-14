import "@/shared/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";

import { siteConfig } from "@/shared/config/site";
import { fontComfortaa, fontQuicksand } from "@/shared/config/fonts";
import { ThemeSwitch } from "@/features/theme-switch";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-comfortaa font-semibold antialiased",
          fontComfortaa.variable,
          fontQuicksand.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark", enableSystem: true }}>
          <div className="relative flex flex-col h-screen">
            <header className="sticky top-0 z-50 w-full">
              <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                <div>{/* Logo can go here */}</div>
                <div>
                  <ThemeSwitch />
                </div>
              </nav>
            </header>
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

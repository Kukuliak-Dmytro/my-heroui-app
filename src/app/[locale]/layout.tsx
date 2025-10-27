import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Providers } from "./providers";
import { routing } from "@/shared/lib/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
/**
 * Locale-specific layout - handles i18n and providers.
 *
 * This layout is wrapped in Suspense by the root layout (src/app/layout.tsx),
 * which allows it to use runtime APIs like getMessages() (which uses headers())
 * without blocking the initial HTML shell.
 *
 * Architecture:
 * - NextIntlClientProvider establishes i18n context (must be above Providers)
 * - Providers can then safely use next-intl's useRouter() since context exists
 * - Clean separation: Root layout = HTML structure, Locale layout = i18n + providers
 *
 * Note: Locale validation is handled in src/shared/lib/i18n/request.ts via getRequestConfig,
 * which validates and falls back to defaultLocale if invalid.
 */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // getMessages() uses headers() internally - this is fine because
  // the entire locale layout is wrapped in Suspense by the root layout
  const messages = await getMessages();

  const timeZone = "Europe/Kyiv"; // Can be made dynamic if needed
  // The next-intl provider is placed here because we pass the locale-aware router to the Providers component
  // so we can safely use next-intl's useRouter() since the context already exists.
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}>
      <Providers
        themeProps={{
          attribute: "class",
          defaultTheme: "dark",
          enableSystem: true,
        }}>
        <div className="relative flex flex-col min-h-screen">
          <main className="flex-1">{props.children}</main>
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}

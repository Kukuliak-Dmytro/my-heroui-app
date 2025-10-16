"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { notFound, useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/shared/lib/i18n/routing";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  locale: string;
  messages: Record<string, unknown>;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({
  children,
  themeProps,
  locale,
  messages,
}: ProvidersProps) {
  const router = useRouter();
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <QueryClientProvider client={getQueryClient()}>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone={timeZone}
          >
            {children}
          </NextIntlClientProvider>
        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

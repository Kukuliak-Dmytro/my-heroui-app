"use client";

import type { ThemeProviderProps } from "next-themes";

import React from "react";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "@/shared/lib/i18n/navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/utils/get-query-client";
import { MixpanelInitializer } from "@/shared/lib/mixpanel/mixpanel-initializer";
import { initWebVitals } from "@/shared/lib/web-vitals/web-vitals";

/**
 * WebVitals initializer component for performance monitoring.
 *
 * This component initializes web vitals tracking on the client side
 * to monitor Core Web Vitals metrics for performance analysis.
 *
 * @returns This component renders nothing
 */
function WebVitalsInitializer() {
  React.useEffect(() => {
    initWebVitals();
  }, []);

  return null;
}

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

/**
 * Main providers component that wraps the application with necessary context providers.
 *
 * This component provides theme, query client, and analytics initialization.
 *
 * Note: NextIntlClientProvider is now in the locale layout ABOVE this component,
 * so we can safely use next-intl's useRouter here since the context already exists.
 *
 * @param props - Component props
 * @param props.children - Child components to wrap
 * @param props.themeProps - Theme provider configuration
 * @returns The providers wrapper component
 */
export function Providers({ children, themeProps }: ProvidersProps) {
  // Now we can safely use next-intl's router because NextIntlClientProvider
  // is established in the locale layout above this component
  const router = useRouter();

  // No client-side GrowthBook Provider; using server-only evaluation

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <QueryClientProvider client={getQueryClient()}>
          <MixpanelInitializer />
          <WebVitalsInitializer />
          {children}
        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

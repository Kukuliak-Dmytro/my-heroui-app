"use client";

import { Spinner } from "@heroui/spinner";
import { useTranslations } from "next-intl";

/**
 * Loading component for the single recipe page.
 *
 * This component displays a loading spinner with accessibility features
 * while the single recipe page is loading. It includes screen reader support
 * and proper ARIA attributes.
 *
 * @returns The loading component
 */
export default function Loading() {
  const t = useTranslations();

  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="min-h-[40vh] flex items-center justify-center p-6">
      <Spinner size="lg" />
      <span className="sr-only">{t("common.loading")}</span>
    </div>
  );
}

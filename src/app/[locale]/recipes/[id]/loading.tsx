"use client";

import { Spinner } from "@heroui/spinner";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations();

  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="min-h-[40vh] flex items-center justify-center p-6"
    >
      <Spinner size="lg" />
      <span className="sr-only">{t("common.loading")}</span>
    </div>
  );
}

"use client";

import { Alert } from "@heroui/alert";
import { useTranslations } from "next-intl";

/**
 * Error component for the recipes page.
 *
 * This component displays a user-friendly error message when an error
 * occurs on the recipes page. It uses internationalization for the
 * error message display.
 *
 * @returns The error component
 */
export default function Error() {
  const t = useTranslations();
  return <Alert color="danger">{t("common.somethingWentWrong")}</Alert>;
}

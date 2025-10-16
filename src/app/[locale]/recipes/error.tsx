"use client";

import { Alert } from "@heroui/alert";
import { useTranslations } from "next-intl";

export default function Error() {
  const t = useTranslations();
  return <Alert color="danger">{t("common.somethingWentWrong")}</Alert>;
}

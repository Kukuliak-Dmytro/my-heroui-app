"use client";

import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

/**
 * Error component for the recipes page.
 *
 * This component displays a user-friendly error message when an error
 * occurs on the recipes page. It uses internationalization for the
 * error message display and provides retry functionality.
 *
 * @returns The error component
 */
export default function Error() {
  const t = useTranslations("common");

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <Alert color="danger" className="mb-4 max-w-md">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">{t("errorTitle")}</h3>
          <p className="mb-4">{t("errorDescription")}</p>
          <Button
            color="primary"
            variant="solid"
            onPress={handleRetry}
            className="w-full">
            {t("refreshPage")}
          </Button>
        </div>
      </Alert>
    </div>
  );
}

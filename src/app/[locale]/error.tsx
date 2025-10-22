"use client";

import { useEffect } from "react";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

/**
 * Error boundary component for handling runtime errors.
 *
 * This component displays a user-friendly error message when a runtime
 * error occurs. It includes error logging and a retry mechanism.
 *
 * @param error - The error object that caused the component to render
 * @param reset - Function to reset the error state and retry
 * @returns The error display component
 */
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations("common");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <Alert color="danger" className="mb-4 max-w-md">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{t("errorTitle")}</h2>
          <p className="mb-4">{t("errorDescription")}</p>
          <div className="flex gap-3 justify-center">
            <Button
              color="primary"
              variant="solid"
              onPress={reset}
              className="flex-1">
              {t("retry")}
            </Button>
            <Button
              color="danger"
              variant="solid"
              onPress={handleRefresh}
              className="flex-1">
              {t("refreshPage")}
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  );
}

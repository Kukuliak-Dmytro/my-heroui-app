"use client";

import { useEffect } from "react";
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
  const t = useTranslations();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{t("common.somethingWentWrong")}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        {t("common.tryAgain")}
      </button>
    </div>
  );
}

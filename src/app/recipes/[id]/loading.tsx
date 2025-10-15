"use client";

import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="min-h-[40vh] flex items-center justify-center p-6"
    >
      <Spinner size="lg" />
    </div>
  );
}

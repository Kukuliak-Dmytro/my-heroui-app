"use client";

import { Spinner } from "@heroui/spinner";

export default function Loading() {
    return (
        <div className="min-h-[40vh] flex items-center justify-center p-6" aria-busy="true" aria-live="polite">
            <Spinner size="lg" />
        </div>
    );
}

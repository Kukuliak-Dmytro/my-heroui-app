"use client";

import { useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { PAGINATION_LIMIT } from "./pagination.constants";
interface PaginationComponentProps {
  total: number;
  page: number;
  limit?: number;
  onPageChange?: (page: number) => void;
}

/**
 * Pagination component for navigating through paginated content.
 *
 * This component provides pagination controls with page numbers, navigation buttons,
 * and handles page changes. It calculates total pages and manages pagination state.
 *
 * @param props - Component props
 * @param props.total - Total number of items
 * @param props.page - Current page number
 * @param props.limit - Number of items per page
 * @param props.onPageChange - Callback function for page changes
 * @returns The pagination component
 */
export const PaginationComponent = ({
  total,
  page,
  limit = PAGINATION_LIMIT,
  onPageChange,
}: PaginationComponentProps) => {
  const t = useTranslations();
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        onPageChange?.(newPage);
      }
    },
    [totalPages, onPageChange],
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-2 rounded-md border border-gray-300
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
        {t("pagination.previous")}
      </button>

      <span className="px-3 py-2">
        {t("pagination.page")} {page} {t("pagination.of")} {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-2 rounded-md border border-gray-300
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
        {t("pagination.next")}
      </button>
    </div>
  );
};

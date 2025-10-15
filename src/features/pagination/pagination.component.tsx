'use client'

import { useMemo, useCallback } from 'react'
import { PAGINATION_LIMIT } from './pagination.constants'
interface PaginationComponentProps {
    total: number;
    page: number;
    limit?: number;
    onPageChange?: (page: number) => void;
}

export const PaginationComponent = ({
    total,
    page,
    limit = PAGINATION_LIMIT,
    onPageChange
}: PaginationComponentProps) => {
    const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit])

    const handlePageChange = useCallback((newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange?.(newPage)
        }
    }, [totalPages, onPageChange])

    if (totalPages <= 1) {
        return null
    }

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="px-3 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
                Previous
            </button>

            <span className="px-3 py-2">
                Page {page} of {totalPages}
            </span>

            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
                Next
            </button>
        </div>
    )
}

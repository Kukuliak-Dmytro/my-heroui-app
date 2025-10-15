'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type PaginationStore, createPaginationStore, initPaginationStore } from './pagination.store'

export type PaginationStoreApi = ReturnType<typeof createPaginationStore>

export const PaginationStoreContext = createContext<PaginationStoreApi | undefined>(
    undefined,
)

export interface PaginationStoreProviderProps {
    children: ReactNode
}

export const PaginationStoreProvider = ({
    children,
}: PaginationStoreProviderProps) => {
    const storeRef = useRef<PaginationStoreApi | null>(null)
    if (storeRef.current === null) {
        storeRef.current = createPaginationStore(initPaginationStore())
    }

    return (
        <PaginationStoreContext.Provider value={storeRef.current}>
            {children}
        </PaginationStoreContext.Provider>
    )
}

export const usePaginationStore = <T,>(
    selector: (store: PaginationStore) => T,
): T => {
    const paginationStoreContext = useContext(PaginationStoreContext)

    if (!paginationStoreContext) {
        throw new Error(`usePaginationStore must be used within PaginationStoreProvider`)
    }

    return useStore(paginationStoreContext, selector)
}

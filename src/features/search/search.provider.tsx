'use client'

import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react'
import { useStore } from 'zustand'

import { type SearchStore, createSearchStore, initSearchStore } from './search.store'
import { SEARCH_QUERY_PARAM } from './search.constants'

export type SearchStoreApi = ReturnType<typeof createSearchStore>

export const SearchStoreContext = createContext<SearchStoreApi | undefined>(
    undefined,
)

export interface SearchStoreProviderProps {
    children: ReactNode
    initialQuery?: string
}

export const SearchStoreProvider = ({
    children,
    initialQuery = '',
}: SearchStoreProviderProps) => {
    const storeRef = useRef<SearchStoreApi | null>(null)
    if (storeRef.current === null) {
        storeRef.current = createSearchStore({
            ...initSearchStore(),
            query: initialQuery,
        })
    }

    // Sync with URL on mount and when URL changes
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const updateFromURL = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const urlQuery = searchParams.get(SEARCH_QUERY_PARAM) || '';

            if (urlQuery !== storeRef.current?.getState().query) {
                storeRef.current?.getState().setQuery(urlQuery);
            }
        };

        // Initial sync
        updateFromURL();

        // Listen for browser back/forward navigation
        window.addEventListener('popstate', updateFromURL);

        return () => {
            window.removeEventListener('popstate', updateFromURL);
        };
    }, []);

    return (
        <SearchStoreContext.Provider value={storeRef.current}>
            {children}
        </SearchStoreContext.Provider>
    )
}

export const useSearchStore = <T,>(
    selector: (store: SearchStore) => T,
): T => {
    const searchStoreContext = useContext(SearchStoreContext)

    if (!searchStoreContext) {
        throw new Error(`useSearchStore must be used within SearchStoreProvider`)
    }

    return useStore(searchStoreContext, selector)
}

import { createStore } from 'zustand/vanilla'
import { SearchState, SearchActions } from './search.interface'
import { SEARCH_DEFAULT_QUERY, SEARCH_QUERY_PARAM } from './search.constants'

export type SearchStore = SearchState & SearchActions

export const defaultInitState: SearchState = {
    query: SEARCH_DEFAULT_QUERY,
}

export const initSearchStore = (): SearchState => {
    return {
        query: SEARCH_DEFAULT_QUERY,
    }
}

// Custom storage for URL query parameter synchronization
const createQueryParamStorage = () => {
    return {
        getItem: (key: string): string | null => {
            if (typeof window === 'undefined') return null;

            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get(key);
        },
        setItem: (key: string, value: string): void => {
            if (typeof window === 'undefined') return;

            const searchParams = new URLSearchParams(window.location.search);
            if (value && value !== SEARCH_DEFAULT_QUERY) {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }

            const newUrl = `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
            window.history.pushState({}, '', newUrl);
        },
        removeItem: (key: string): void => {
            if (typeof window === 'undefined') return;

            const searchParams = new URLSearchParams(window.location.search);
            searchParams.delete(key);

            const newUrl = `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
            window.history.pushState({}, '', newUrl);
        },
    };
};

export const createSearchStore = (
    initState: SearchState = defaultInitState,
) => {
    return createStore<SearchStore>()((set, get) => ({
        ...initState,
        setQuery: (query: string) => {
            const trimmedQuery = query.trim();
            set({ query: trimmedQuery });

            // Sync to URL
            const storage = createQueryParamStorage();
            storage.setItem(SEARCH_QUERY_PARAM, trimmedQuery);
        },
        clearQuery: () => {
            set({ query: SEARCH_DEFAULT_QUERY });

            // Remove from URL
            const storage = createQueryParamStorage();
            storage.removeItem(SEARCH_QUERY_PARAM);
        },
    }))
}

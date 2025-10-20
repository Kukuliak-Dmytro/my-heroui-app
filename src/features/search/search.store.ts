import { createStore } from "zustand/vanilla";
import { SearchState, SearchActions } from "./search.interface";
import { SEARCH_DEFAULT_QUERY, SEARCH_QUERY_PARAM } from "./search.constants";

export type SearchStore = SearchState & SearchActions;

export const defaultInitState: SearchState = {
  query: SEARCH_DEFAULT_QUERY,
};

/**
 * Initializes the search store with default state values.
 *
 * This function creates the initial state for the search store with default
 * query values. It's used when setting up the store for the first time.
 *
 * @returns {SearchState} The initial search state
 */
export const initSearchStore = (): SearchState => {
  return {
    query: SEARCH_DEFAULT_QUERY,
  };
};

/**
 * Creates a custom storage implementation for URL query parameter synchronization.
 *
 * This function returns a storage-like object that reads from and writes to
 * URL search parameters instead of localStorage. It handles browser environment
 * checks and provides methods for getting, setting, and removing query parameters.
 *
 * @returns {Object} Storage-like object with getItem, setItem, and removeItem methods
 */
const createQueryParamStorage = () => {
  return {
    getItem: (key: string): string | null => {
      if (typeof window === "undefined") return null;

      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get(key);
    },
    setItem: (key: string, value: string): void => {
      if (typeof window === "undefined") return;

      const searchParams = new URLSearchParams(window.location.search);
      if (value && value !== SEARCH_DEFAULT_QUERY) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }

      const newUrl = `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      window.history.pushState({}, "", newUrl);
    },
    removeItem: (key: string): void => {
      if (typeof window === "undefined") return;

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete(key);

      const newUrl = `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      window.history.pushState({}, "", newUrl);
    },
  };
};

/**
 * Creates a Zustand store for managing search state and actions.
 *
 * This function creates a complete search store with state management and actions
 * for updating the search query. The store automatically synchronizes with URL
 * query parameters and provides methods for setting and clearing the search query.
 *
 * @param {SearchState} [initState=defaultInitState] - Initial state for the store
 * @returns {StoreApi<SearchStore>} A Zustand store instance
 */
export const createSearchStore = (
  initState: SearchState = defaultInitState,
) => {
  return createStore<SearchStore>()((set) => ({
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
  }));
};

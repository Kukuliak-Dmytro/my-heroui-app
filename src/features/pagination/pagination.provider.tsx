"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
} from "react";
import { PAGINATION_PAGE_PARAM } from "./pagination.constants";
import { useStore } from "zustand";

import {
  type PaginationStore,
  createPaginationStore,
  initPaginationStore,
} from "./pagination.store";

export type PaginationStoreApi = ReturnType<typeof createPaginationStore>;

export const PaginationStoreContext = createContext<
  PaginationStoreApi | undefined
>(undefined);

export interface PaginationStoreProviderProps {
  children: ReactNode;
}

/**
 * Provider component for pagination store context.
 *
 * This component provides the pagination store context to its children,
 * initializing the store with default values and managing the store lifecycle.
 *
 * @param props - Component props
 * @param props.children - Child components
 * @returns The pagination store provider
 */
export const PaginationStoreProvider = ({
  children,
}: PaginationStoreProviderProps) => {
  const storeRef = useRef<PaginationStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createPaginationStore(initPaginationStore());
  }

  // Hydrate initial page from URL once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const urlPage = searchParams.get(PAGINATION_PAGE_PARAM);
    const nextPage = urlPage ? Math.max(1, parseInt(urlPage, 10) || 1) : 1;
    const state = storeRef.current?.getState();
    if (!state) return;
    if (nextPage !== state.page) {
      state.setPage(nextPage);
    }
  }, []);

  return (
    <PaginationStoreContext.Provider value={storeRef.current}>
      {children}
    </PaginationStoreContext.Provider>
  );
};

/**
 * Hook for accessing the pagination store context.
 *
 * This hook provides access to the pagination store state and actions
 * within components that are wrapped by the PaginationStoreProvider.
 *
 * @template T - The type of the selected value
 * @param selector - Function to select specific state from the store
 * @returns The selected value from the store
 * @throws Throws an error if used outside of PaginationStoreProvider
 */
export const usePaginationStore = <T,>(
  selector: (store: PaginationStore) => T,
): T => {
  const paginationStoreContext = useContext(PaginationStoreContext);

  if (!paginationStoreContext) {
    throw new Error(
      `usePaginationStore must be used within PaginationStoreProvider`,
    );
  }

  return useStore(paginationStoreContext, selector);
};

"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
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
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @returns {JSX.Element} The pagination store provider
 */
export const PaginationStoreProvider = ({
  children,
}: PaginationStoreProviderProps) => {
  const storeRef = useRef<PaginationStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createPaginationStore(initPaginationStore());
  }

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
 * @param {function} selector - Function to select specific state from the store
 * @returns {T} The selected value from the store
 * @throws {Error} Throws an error if used outside of PaginationStoreProvider
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

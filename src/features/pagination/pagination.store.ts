import { createStore } from "zustand/vanilla";
import { PaginationState, PaginationActions } from "./pagination.interface";
import { PAGINATION_LIMIT } from "./pagination.constants";

export type PaginationStore = PaginationState & PaginationActions;

export const defaultInitState: PaginationState = {
  page: 1,
  limit: PAGINATION_LIMIT,
  skip: 0,
  total: 0,
};

/**
 * Initializes the pagination store with default state values.
 *
 * This function creates the initial state for the pagination store with default
 * values for page, limit, skip, and total count.
 *
 * @returns {PaginationState} The initial pagination state
 */
export const initPaginationStore = (): PaginationState => {
  return {
    page: 1,
    limit: PAGINATION_LIMIT,
    skip: 0,
    total: 0,
  };
};

/**
 * Creates a Zustand store for managing pagination state and actions.
 *
 * This function creates a complete pagination store with state management and actions
 * for updating page, limit, skip, and total values. It provides methods for
 * pagination navigation and state updates.
 *
 * @param {PaginationState} [initState=defaultInitState] - Initial state for the store
 * @returns {StoreApi<PaginationStore>} A Zustand store instance
 */
export const createPaginationStore = (
  initState: PaginationState = defaultInitState,
) => {
  return createStore<PaginationStore>()((set) => ({
    ...initState,
    setPage: (page) =>
      set((state) => ({
        page,
        skip: (page - 1) * state.limit,
      })),
    setLimit: (limit) =>
      set((state) => ({
        limit,
        skip: (state.page - 1) * limit,
      })),
    setSkip: (skip) => set({ skip }),
    setTotal: (total) => set({ total }),
    resetPagination: () =>
      set({
        page: 1,
        skip: 0,
        total: 0,
      }),
  }));
};

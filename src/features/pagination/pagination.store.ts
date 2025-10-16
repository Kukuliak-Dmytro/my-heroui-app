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

export const initPaginationStore = (): PaginationState => {
  return {
    page: 1,
    limit: PAGINATION_LIMIT,
    skip: 0,
    total: 0,
  };
};

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

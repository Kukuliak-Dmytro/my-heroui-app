export interface PaginationState {
    page: number;
    limit: number;
    skip: number;
    total: number;
}

export interface PaginationActions {
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setSkip: (skip: number) => void;
    setTotal: (total: number) => void;
    resetPagination: () => void;
}
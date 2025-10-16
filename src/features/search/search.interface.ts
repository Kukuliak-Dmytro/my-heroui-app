export interface SearchState {
  query: string;
}

export interface SearchActions {
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

export type SearchStore = SearchState & SearchActions;

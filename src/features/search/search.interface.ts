/**
 * Search state interface defining the search store state.
 *
 * This interface describes the state structure for the search functionality,
 * including the current search query.
 */
export interface SearchState {
  query: string;
}

/**
 * Search actions interface defining the search store actions.
 *
 * This interface describes the available actions for managing search state,
 * including setting and clearing the search query.
 */
export interface SearchActions {
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

/**
 * Search store type combining state and actions.
 *
 * This type combines the search state and actions into a single store interface
 * that can be used with Zustand for state management.
 */
export type SearchStore = SearchState & SearchActions;

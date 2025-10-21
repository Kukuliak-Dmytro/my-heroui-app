/**
 * Searchbar widget re-exports.
 *
 * This file re-exports the searchbar component and validation utilities
 * for convenient importing throughout the application.
 */
import { Searchbar } from "./searchbar.component";

export { Searchbar };
export {
  createSearchFormSchema,
  type SearchFormData,
} from "./searchbar.validation";

import { growthbookAdapter } from "@flags-sdk/growthbook";
import { flag } from "flags/next";
import { identify } from "./identify";

export const recipeListVariant = flag({
  key: "flag_recipe_list_view_optimization_v2",
  adapter: growthbookAdapter.feature<string>(),
  defaultValue: "pagianted",
  identify,
});

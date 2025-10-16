import { z } from "zod";

export const createSearchFormSchema = (t: (key: string) => string) =>
  z.object({
    query: z
      .string()
      .max(100, t("search.validation.maxLength"))
      .regex(
        /^[a-zA-Z0-9\s\-_.,!?]+$/,
        t("search.validation.invalidCharacters"),
      ),
  });

export type SearchFormData = z.infer<ReturnType<typeof createSearchFormSchema>>;

import { z } from 'zod';

export const searchFormSchema = z.object({
    query: z
        .string()
        .max(100, 'Search query must be less than 100 characters')
        .regex(/^[a-zA-Z0-9\s\-_.,!?]+$/, 'Search query contains invalid characters')
});

export type SearchFormData = z.infer<typeof searchFormSchema>;

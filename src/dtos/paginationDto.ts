import { z } from "zod";

export const paginationSchema = z.object({});

export const getArticleQueryParams = z.object({
  sort: z.union([z.literal("asc"), z.literal("desc")]).default("asc"),
});

export type GetArticleQueryParams = z.infer<typeof getArticleQueryParams>;

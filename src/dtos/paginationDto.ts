import { z } from "zod";
import { Types } from "mongoose";

export const paginationSchema = z.object({});

export const getArticleQueryParams = z.object({
  sort: z.union([z.literal("asc"), z.literal("desc")]).default("asc"),
  allArticles: z.preprocess((val: string) => {
    if (val == undefined || val == null) return false;
    if (typeof JSON.parse(val) === "boolean") return JSON.parse(val);
  }, z.boolean().default(false)),
  tags: z
    .preprocess((val: string) => {
      if (Array.isArray(val)) return val;
      if (val == null) return undefined;
      return val.split(",");
    }, z.array(z.custom<Types.ObjectId>()))
    .optional(),
});

export type GetArticleQueryParams = z.infer<typeof getArticleQueryParams>;

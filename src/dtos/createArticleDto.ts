import { Types } from "mongoose";
import { z } from "zod";

export const CreateAndUpdateArticleDtoSchema = z.object({
  title: z.string().min(3, "Title must have at least 3 characters"),
  briefDescription: z
    .string()
    .min(3, "Brief Description mus have at least 3 characters"),
  content: z.string().min(10, "Content must have at least 10 characters"),
  slug: z.string().min(3, "Slug must have at least 3 characters").toLowerCase(),
  tags: z
    .array(z.custom<Types.ObjectId>())
    .min(1, "Tags list must have at least 1 tag written"),
  isPublished: z.boolean().default(false).optional(),
});

export type CreateAndUpdateArticleDto = z.infer<
  typeof CreateAndUpdateArticleDtoSchema
>;

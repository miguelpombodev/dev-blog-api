import { z } from "zod";

export const CreateAndUpdateTagDtoSchema = z.object({
  title: z.string().min(3, "Title must have at least 3 characters"),
  color: z
    .string()
    .startsWith("#", "Color must be a hexadecimal color")
    .min(4, "Color must have at least 4 characters"),
});

export type CreateAndUpdateTagDto = z.infer<typeof CreateAndUpdateTagDtoSchema>;

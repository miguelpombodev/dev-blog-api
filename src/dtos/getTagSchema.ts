import { z } from "zod";

export const GetByTagTitleSchema = z
  .string()
  .min(3, "Title must have at least 3 characters");

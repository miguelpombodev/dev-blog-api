import { z } from "zod";

export const GetBySlugSchema = z
  .string()
  .min(3, "Slug must have at least 3 characters");

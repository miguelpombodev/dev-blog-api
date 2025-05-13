import { Types } from "mongoose";
import { z } from "zod";

export const GetBySlugSchema = z
  .string()
  .min(3, "Slug must have at least 3 characters");

export const GetByIdSchema = z
  .string()
  .min(24, "Id must have 24 characters")
  .refine((id) => Types.ObjectId.isValid(id), {
    message: "Invalid ObjectId format",
  })
  .transform((id) => new Types.ObjectId(id));

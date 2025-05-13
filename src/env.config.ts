import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development, production"]),
  APP_PORT: z.coerce.number().default(3000),
  APP_ATLAS_MONGODB_URL: z.string().url(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "[ERROR] Error to validate environment variables: ",
    _env.error.format(),
  );
  process.exit(1);
}

export const env = _env.data;

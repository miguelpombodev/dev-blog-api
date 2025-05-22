import { LogLevel } from "@nestjs/common";
import { z } from "zod";

const logLevels: LogLevel[] = ["debug", "error", "log", "warn"];

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  APP_PORT: z.coerce.number().default(3000),
  APP_ATLAS_MONGODB_URL: z.string().url(),
  APP_LOG_LEVEL: z
    .string()
    .default("log")
    .transform((val) => val.split(",").map((val) => val.trim() as LogLevel))
    .pipe(z.array(z.enum(logLevels as [LogLevel, ...LogLevel[]]))),
  APP_URL: z.string().url(),
  APP_CORS_ORIGIN: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_CALLBACK_URL: z.string(),
  AUTH_SECRET: z.string(),
  GITHUB_EMAIL: z.string().email(),
  APP_MY_DOMAIN: z.string().default("localhost"),
  APP_SITE_URL: z.string().default("http://localhost:3000"),
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

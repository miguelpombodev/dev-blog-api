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

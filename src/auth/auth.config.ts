import { JwtSignOptions } from "@nestjs/jwt";
import { env } from "src/env.config";

export const authConfig: JwtSignOptions = {
  secret: env.AUTH_SECRET,
};

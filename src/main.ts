import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { env } from "./env.config";
import { ConsoleLogger } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: env.NODE_ENV === "development" ? false : true,
      colors: true,
      logLevels: [...env.APP_LOG_LEVEL],
      timestamp: true,
    }),
  });
  app.enableCors({
    origin: env.APP_CORS_ORIGIN,
  });
  app.use(cookieParser());
  await app.listen(env.APP_PORT ?? 3000);
}
bootstrap();

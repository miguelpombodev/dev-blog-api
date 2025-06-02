import { Module } from "@nestjs/common";
import { ServicesModule } from "@services/services.module";
import { ArticleController } from "./article.controller";
import { AuthController } from "./auth.controller";
import { HealthController } from "./health.controller";
import { TerminusModule } from "@nestjs/terminus";
import { HttpModule } from "@nestjs/axios";
import { JwtModule } from "@nestjs/jwt";
import { env } from "src/env.config";
import { GithubStrategy } from "src/auth/github.strategy";
import { PassportModule } from "@nestjs/passport";
import { AdminController } from "./admin.controller";
import { TagController } from "./tag.controller";

@Module({
  imports: [
    PassportModule,
    ServicesModule,
    TerminusModule,
    HttpModule,
    JwtModule.register({
      secret: env.AUTH_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [
    AuthController,
    ArticleController,
    AdminController,
    HealthController,
    TagController,
  ],
  providers: [GithubStrategy],
})
export class ControllersModule {}

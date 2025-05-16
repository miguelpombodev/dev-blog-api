import { Module } from "@nestjs/common";
import { ServicesModule } from "@services/services.module";
import { ArticleController } from "./articles.controller";
import { AuthController } from "./auth.controller";
import { HealthController } from "./health.controller";
import { TerminusModule } from "@nestjs/terminus";
import { HttpModule } from "@nestjs/axios";
import { JwtModule } from "@nestjs/jwt";
import { env } from "src/env.config";
import { GithubStrategy } from "src/auth/github.strategy";
import { PassportModule } from "@nestjs/passport";

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
  controllers: [AuthController, ArticleController, HealthController],
  providers: [GithubStrategy],
})
export class ControllersModule {}

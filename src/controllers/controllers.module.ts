import { Module } from "@nestjs/common";
import { ServicesModule } from "@services/services.module";
import { ArticleController } from "./articles.controller";
import { AuthController } from "./auth.controller";
import { HealthController } from "./health.controller";
import { TerminusModule } from "@nestjs/terminus";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [ServicesModule, TerminusModule, HttpModule],
  controllers: [AuthController, ArticleController, HealthController],
})
export class ControllersModule {}

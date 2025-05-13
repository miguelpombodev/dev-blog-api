import { Module } from "@nestjs/common";
import { ServicesModule } from "@services/services.module";
import { ArticleController } from "./articles.controller";
import { AuthController } from "./auth.controller";

@Module({
  imports: [ServicesModule],
  controllers: [AuthController, ArticleController],
})
export class ControllersModule {}

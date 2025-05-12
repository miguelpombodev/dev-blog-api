import { Module } from "@nestjs/common";
import { ServicesModule } from "src/services/services.module";
import { ArticleController } from "./articles.controller";

@Module({
  imports: [ServicesModule],
  controllers: [ArticleController],
})
export class ControllersModule {}

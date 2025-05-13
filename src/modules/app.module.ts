import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleController } from "src/controllers/articles.controller";
import { ControllersModule } from "src/controllers/controllers.module";
import { env } from "src/env.config";
import { ErrorMiddleware } from "src/middlewares/error.middleware";

@Module({
  imports: [
    MongooseModule.forRoot(env.APP_ATLAS_MONGODB_URL),
    ControllersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorMiddleware).forRoutes(ArticleController);
  }
}

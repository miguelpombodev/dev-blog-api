import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule } from "@nestjs/throttler";
import { ArticleController } from "@controllers/articles.controller";
import { ControllersModule } from "@controllers/controllers.module";
import { env } from "src/env.config";
import { ErrorMiddleware } from "@middlewares/error.middleware";
import { TerminusModule } from "@nestjs/terminus";

@Module({
  imports: [
    MongooseModule.forRoot(env.APP_ATLAS_MONGODB_URL),
    ControllersModule,
    TerminusModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorMiddleware).forRoutes(ArticleController);
  }
}

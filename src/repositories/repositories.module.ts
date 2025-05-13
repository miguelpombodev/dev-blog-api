import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import ArticlesRepository from "./articles.repositories";
import { Article, ArticleSchema } from "src/schemas/article.schema";
import { env } from "src/env.config";
import { AuthRepository } from "./auth.repository";

@Module({
  imports: [
    MongooseModule.forRoot(env.APP_ATLAS_MONGODB_URL),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [ArticlesRepository, AuthRepository],
  exports: [ArticlesRepository, AuthRepository],
})
export class RepositoriesModule {}

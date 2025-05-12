import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import ArticlesRepository from "./articles.repositories";
import { Article, ArticleSchema } from "src/schemas/article.schema";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.APP_ATLAS_MONGODB_URL!),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [ArticlesRepository],
  exports: [ArticlesRepository],
})
export class RepositoriesModule {}

import { Module } from "@nestjs/common";
import { RepositoriesModule } from "@repositories/repositories.module";
import { ArticleService } from "./articles.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "@schemas/article.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    RepositoriesModule,
  ],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ServicesModule {}

import { Module } from "@nestjs/common";
import { RepositoriesModule } from "@repositories/repositories.module";
import { ArticleService } from "./articles.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "@schemas/article.schema";
import { AuthService } from "./auth.services";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    RepositoriesModule,
  ],
  providers: [ArticleService, AuthService],
  exports: [ArticleService, AuthService],
})
export class ServicesModule {}

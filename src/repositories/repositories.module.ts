import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import ArticlesRepository from "./articles.repositories";
import { Article, ArticleSchema } from "src/schemas/article.schema";
import { env } from "src/env.config";
import { AuthRepository } from "./auth.repository";
import { Auth, AuthSchema } from "@schemas/auth.schema";
import TagsRepository from "./tag.repository";
import { Tag, TagSchema } from "@schemas/tag.schema";

@Module({
  imports: [
    MongooseModule.forRoot(env.APP_ATLAS_MONGODB_URL),
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Auth.name, schema: AuthSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
  providers: [ArticlesRepository, AuthRepository, TagsRepository],
  exports: [ArticlesRepository, AuthRepository, TagsRepository],
})
export class RepositoriesModule {}

import { Module } from "@nestjs/common";
import { RepositoriesModule } from "@repositories/repositories.module";
import { ArticleService } from "./articles.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "@schemas/article.schema";
import { AuthService } from "./auth.services";
import { AdminService } from "./admin.service";
import { TagsService } from "./tags.service";
import { Tag, TagSchema } from "@schemas/tag.schema";
import FileProvider from "src/providers/file.provider";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
    RepositoriesModule,
  ],
  providers: [
    ArticleService,
    AuthService,
    AdminService,
    TagsService,
    FileProvider,
  ],
  exports: [ArticleService, AuthService, AdminService, TagsService],
})
export class ServicesModule {}

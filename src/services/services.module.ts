import { Module } from "@nestjs/common";
import { RepositoriesModule } from "src/repositories/repositories.module";
import { ArticleService } from "./articles.service";

@Module({
  imports: [RepositoriesModule],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ServicesModule {}

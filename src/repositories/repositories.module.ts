import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import ArticlesRepository from "./articles.repositories";

@Module({
  imports: [MongooseModule.forRoot(process.env.APP_ATLAS_MONGODB_URL!)],
  providers: [ArticlesRepository],
  exports: [ArticlesRepository],
})
export class RepositoriesModule {}

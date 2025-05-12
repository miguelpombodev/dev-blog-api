import { Injectable } from "@nestjs/common";
import { Document, HydratedDocument } from "mongoose";
import { Article } from "src/schemas/article.schema";

@Injectable()
export default class ArticlesRepository {
  async create(createdArticle: HydratedDocument<Article>): Promise<Article> {
    const result = await createdArticle.save();

    return result;
  }
  async get_one() {}
  async get_all() {}
}

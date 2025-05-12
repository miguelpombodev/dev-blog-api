import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Article } from "src/schemas/article.schema";

@Injectable()
export default class ArticlesRepository {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async create() {}
  async get_one() {}
  async get_all() {}
}

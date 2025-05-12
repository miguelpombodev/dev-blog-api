import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Article } from "src/schemas/article.schema";

@Injectable()
export default class ArticlesRepository {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async create(): Promise<Article> {
    const createdArticle = new this.articleModel({
      _id: new Types.ObjectId(),
      title: "teste",
      content: "conteudo teste",
      slug: "conteudo-teste",
      tags: ["frontend"],
    });

    return await createdArticle.save();
  }
  async get_one() {}
  async get_all() {}
}

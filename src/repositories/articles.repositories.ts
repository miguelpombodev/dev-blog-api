import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Article, ArticleDocument } from "src/schemas/article.schema";

@Injectable()
export default class ArticlesRepository {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createdPartialArticle: Partial<Article>): Promise<Article> {
    const article = new this.articleModel(createdPartialArticle);
    const result = await article.save();

    return result;
  }

  async getOneBySlug(slug: string): Promise<Article> {
    const result = (await this.articleModel
      .findOne({ slug })
      .exec()) as Article;

    return result;
  }

  async getAll() {}
}

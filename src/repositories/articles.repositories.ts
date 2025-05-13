import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Article, ArticleDocument } from "@schemas/article.schema";

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

  async getOneById(id: Types.ObjectId): Promise<Article | null> {
    const result = await this.articleModel.findById(id).exec();
    return result;
  }

  async getOneBySlug(slug: string): Promise<Article | null> {
    const result = await this.articleModel.findOne({ slug }).exec();

    return result;
  }

  async getAll(): Promise<Article[]> {
    const articles = await this.articleModel.find().exec();

    return articles;
  }

  async updateOneArticle(article: Partial<Article>): Promise<Article | null> {
    return await this.articleModel
      .findByIdAndUpdate(article._id, article, { new: true })
      .exec();
  }

  async deleteOneArticleById(id: Types.ObjectId): Promise<void> {
    await this.articleModel.findByIdAndDelete(id).exec();
  }
}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Article, ArticleDocument } from "@schemas/article.schema";
import { GetArticleQueryParams } from "@dtos/paginationDto";

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

  async getAll(params: GetArticleQueryParams): Promise<Article[]> {
    let query = this.articleModel.find();

    if (params.tags?.length) {
      query = query.where("tags.id").in(params.tags);
    }

    if (params.sort === "desc") {
      query = query.sort({ createdAt: params.sort });
    }

    const articles = await query.exec();
    return articles;
  }

  async updateArticleAvatar(
    slug: string,
    newArticleImageUrl: string,
  ): Promise<Article | null> {
    const result = await this.articleModel.findOneAndUpdate(
      {
        slug: slug,
      },
      {
        $set: { articleImageSrc: newArticleImageUrl },
      },
      { new: true },
    );

    return result;
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

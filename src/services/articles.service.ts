import { Injectable } from "@nestjs/common";
import ArticlesRepository from "src/repositories/articles.repositories";
import { CreateArticleDto } from "src/dtosSchemas/createArticleDto";
import { Article } from "src/schemas/article.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

@Injectable()
export class ArticleService {
  constructor(
    private readonly _articleRepository: ArticlesRepository,
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async getHello(_dto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel({
      _id: new Types.ObjectId(),
      title: _dto.title,
      content: _dto.content,
      slug: _dto.slug,
      tags: _dto.tags,
    });

    return await this._articleRepository.create(createdArticle);
  }
}

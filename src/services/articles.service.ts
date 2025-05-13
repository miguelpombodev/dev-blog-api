import { Injectable } from "@nestjs/common";
import ArticlesRepository from "src/repositories/articles.repositories";
import { CreateAndUpdateArticleDto } from "src/dtos/createArticleDto";
import { Article } from "src/schemas/article.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Result } from "src/abstractions/result";
import ArticleErrors from "src/errors/article.errors";

@Injectable()
export class ArticleService {
  constructor(
    private readonly _articleRepository: ArticlesRepository,
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async createArticleService(
    _dto: CreateAndUpdateArticleDto,
  ): Promise<Article> {
    const createdArticle = new this.articleModel({
      title: _dto.title,
      content: _dto.content,
      slug: _dto.slug,
      tags: _dto.tags,
    });

    return await this._articleRepository.create(createdArticle);
  }

  async getArticleBySlugService(slug: string): Promise<Result<Article>> {
    const result = await this._articleRepository.getOneBySlug(slug);

    if (result === null) {
      return Result.failure<Article>(ArticleErrors.articleNotFound);
    }

    return Result.success<Article>(result);
  }

  async getAllArticlesService(): Promise<Article[]> {
    return await this._articleRepository.getAll();
  }

  async updateOneArticleService(
    id: Types.ObjectId,
    newModel: CreateAndUpdateArticleDto,
  ): Promise<string | null> {
    const article = await this._articleRepository.getOneById(id);

    if (article === null) {
      return null;
    }

    article.title = newModel.title;
    article.content = newModel.content;
    article.slug = newModel.slug;
    article.tags = newModel.tags;

    await this._articleRepository.updateOneArticle(article);

    return "success!";
  }

  async deleteOneArticleService(id: Types.ObjectId): Promise<string | null> {
    const article = await this._articleRepository.getOneById(id);

    if (article === null) {
      return null;
    }

    await this._articleRepository.deleteOneArticleById(id);

    return "success!";
  }
}

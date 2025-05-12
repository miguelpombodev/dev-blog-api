import { Injectable } from "@nestjs/common";
import ArticlesRepository from "src/repositories/articles.repositories";
import { CreateAndUpdateArticleDto } from "src/dtosSchemas/createArticleDto";
import { Article } from "src/schemas/article.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

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

  async getArticleBySlugService(slug: string): Promise<Article | null> {
    return await this._articleRepository.getOneBySlug(slug);
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
}

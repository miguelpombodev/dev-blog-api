import { Injectable, Logger } from "@nestjs/common";
import ArticlesRepository from "@repositories/articles.repositories";
import { CreateAndUpdateArticleDto } from "@dtos/createArticleDto";
import { Article } from "@schemas/article.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Result } from "@abstractions/result";
import ArticleErrors from "@errors/article.errors";
import TagsRepository from "@repositories/tag.repository";

@Injectable()
export class ArticleService {
  constructor(
    private readonly _articleRepository: ArticlesRepository,
    private readonly _tagRepository: TagsRepository,
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  private readonly _logger = new Logger(ArticleService.name, {
    timestamp: true,
  });

  async createArticleService(
    _dto: CreateAndUpdateArticleDto,
  ): Promise<Result<Article | Record<string, string>>> {
    const result = await this._articleRepository.getOneBySlug(_dto.slug);

    if (result) {
      return Result.failure<Article>(ArticleErrors.articleAlreadyRegistered);
    }

    const createdArticle = new this.articleModel({
      _id: new Types.ObjectId(),
      articleImageSrc: _dto.articleImageSrc,
      title: _dto.title,
      briefDescription: _dto.briefDescription,
      content: _dto.content,
      slug: _dto.slug,
      tags: _dto.tags,
    });

    await this._articleRepository.create(createdArticle);

    this._logger.log(
      `Article with slug ${createdArticle.slug} was successfully created!`,
    );

    return Result.success<Record<string, string>>({ status: "success!" });
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
  ): Promise<Result<Article | Record<string, string>>> {
    const article = await this._articleRepository.getOneById(id);

    if (article === null) {
      return Result.failure<Article>(ArticleErrors.articleNotFound);
    }

    const tags = newModel.tags.map(async (tag) => {
      const registeredTag = await this._tagRepository.getOneById(tag);

      return registeredTag;
    });

    if (tags === null) {
      return Result.failure<Article>(ArticleErrors.articleNotFound);
    }

    article.title = newModel.title;
    article.content = newModel.content;
    article.slug = newModel.slug;

    await this._articleRepository.updateOneArticle(article);

    return Result.success<Record<string, string>>({ status: "success!" });
  }

  async deleteOneArticleService(
    id: Types.ObjectId,
  ): Promise<Result<Article | Record<string, string>>> {
    const article = await this._articleRepository.getOneById(id);

    if (article === null) {
      return Result.failure<Article>(ArticleErrors.articleNotFound);
    }

    await this._articleRepository.deleteOneArticleById(id);

    return Result.success<Record<string, string>>({ status: "success!" });
  }
}

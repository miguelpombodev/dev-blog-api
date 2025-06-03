import { Result } from "@abstractions/result";
import {
  GetAllArticlesAdmin,
  GetCategoriesCount,
} from "@dtos/output/getAllArticlesAdmin";
import { GetArticleQueryParams } from "@dtos/paginationDto";
import { Injectable } from "@nestjs/common";
import ArticlesRepository from "@repositories/articles.repositories";
import TagsRepository from "@repositories/tag.repository";
import { Article } from "@schemas/article.schema";

@Injectable()
export class AdminService {
  constructor(
    private readonly _articleRepository: ArticlesRepository,
    private readonly _tagRepository: TagsRepository,
  ) {}

  async getAllArticles(
    params: GetArticleQueryParams,
  ): Promise<Result<GetAllArticlesAdmin>> {
    const articles = await this._articleRepository.getAll(params);
    const articlesCountByCategory = this.getArticlesCategoryCount(articles);

    const result = GetAllArticlesAdmin.create(
      articles.length,
      articles,
      articlesCountByCategory,
    );

    return Result.success<GetAllArticlesAdmin>(result);
  }

  private getArticlesCategoryCount(articles: Article[]): GetCategoriesCount[] {
    const tagsCount: GetCategoriesCount[] = [];

    articles.map((article) => {
      article.tags.map((tag) => {
        const checkTagAlreadyInList = tagsCount.find(
          (c) => c.getTagName() == tag.name,
        );

        if (checkTagAlreadyInList) {
          return checkTagAlreadyInList.setIncrementTag();
        }

        const categoryCount = GetCategoriesCount.create(tag, 1);
        tagsCount.push(categoryCount);
      });
    });

    return tagsCount;
  }
}

import { Result } from "@abstractions/result";
import {
  GetAllArticlesAdmin,
  GetArticlesAndTagsInformations,
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
    const tags = await this._tagRepository.getAll();
    const articlesCountByCategory = this.getArticlesCategoryCount(articles);

    const cardsInformations = this.getCardsInformations(
      tags.length,
      articles.length,
    );

    const result = GetAllArticlesAdmin.create(
      tags.length,
      articles,
      articlesCountByCategory,
      cardsInformations,
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

  private getCardsInformations(
    tagsCount: number,
    articleCount: number,
  ): GetArticlesAndTagsInformations[] {
    const list: GetArticlesAndTagsInformations[] = [];

    list.push(
      GetArticlesAndTagsInformations.create("Tags Registered", tagsCount),
    );
    list.push(
      GetArticlesAndTagsInformations.create("Articles published", articleCount),
    );

    return list;
  }
}

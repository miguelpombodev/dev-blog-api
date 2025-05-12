import { Injectable } from "@nestjs/common";
import ArticlesRepository from "src/repositories/articles.repositories";
import { Article } from "src/schemas/article.schema";

@Injectable()
export class ArticleService {
  constructor(private readonly _articleRepository: ArticlesRepository) {}

  async getHello(): Promise<Article> {
    return await this._articleRepository.create();
  }
}

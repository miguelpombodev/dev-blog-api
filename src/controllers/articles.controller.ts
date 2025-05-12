import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  CreateArticleDto,
  CreateArticleDtoSchema,
} from "src/dtosSchemas/createArticleDto";
import { GetBySlugSchema } from "src/dtosSchemas/getArticleSchema";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { Article } from "src/schemas/article.schema";
import { ArticleService } from "src/services/articles.service";

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post("/create")
  async createArticle(
    @Body(new ZodValidationPipe(CreateArticleDtoSchema))
    body: CreateArticleDto,
  ): Promise<Article> {
    return this.articleService.createArticleService(body);
  }

  @Get("/article/:slug")
  async getArticleBySlug(
    @Param("slug", new ZodValidationPipe(GetBySlugSchema)) slug: string,
  ): Promise<Article> {
    const article = await this.articleService.getArticleBySlugService(slug);
    return article;
  }
}

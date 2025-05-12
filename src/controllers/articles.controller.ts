import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Types } from "mongoose";
import {
  CreateAndUpdateArticleDto,
  CreateAndUpdateArticleDtoSchema,
} from "src/dtosSchemas/createArticleDto";
import {
  GetByIdSchema,
  GetBySlugSchema,
} from "src/dtosSchemas/getArticleSchema";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { Article } from "src/schemas/article.schema";
import { ArticleService } from "src/services/articles.service";

@Controller({
  path: "/article",
})
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post("/create")
  async createArticle(
    @Body(new ZodValidationPipe(CreateAndUpdateArticleDtoSchema))
    body: CreateAndUpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.createArticleService(body);
  }

  @Get("/:slug")
  async getArticleBySlug(
    @Param("slug", new ZodValidationPipe(GetBySlugSchema)) slug: string,
  ): Promise<Article | null> {
    const article = await this.articleService.getArticleBySlugService(slug);
    return article;
  }

  @Get()
  async getAllArticles(): Promise<Article[]> {
    const articles = await this.articleService.getAllArticlesService();
    return articles;
  }

  @Put("/:id")
  async updateOneArticle(
    @Body(new ZodValidationPipe(CreateAndUpdateArticleDtoSchema))
    body: CreateAndUpdateArticleDto,
    @Param("id", new ZodValidationPipe(GetByIdSchema)) id: Types.ObjectId,
  ): Promise<Record<"status", string | null>> {
    const result = await this.articleService.updateOneArticleService(id, body);

    return {
      status: result,
    };
  }
}

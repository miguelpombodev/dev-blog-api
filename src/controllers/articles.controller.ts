import { Controller, Get, Param, Res } from "@nestjs/common";

import { Response } from "express";
import { GetBySlugSchema } from "@dtos/getArticleSchema";
import { ZodValidationPipe } from "@pipes/zod-validation.pipe";
import { Article } from "@schemas/article.schema";
import { ArticleService } from "@services/articles.service";
import { JwtAuthGuard } from "src/guards/jwtAuth.guard";

@Controller({
  path: "/article",
})
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get("/:slug")
  async getArticleBySlug(
    @Res() response: Response,
    @Param("slug", new ZodValidationPipe(GetBySlugSchema)) slug: string,
  ): Promise<Response> {
    const result = await this.articleService.getArticleBySlugService(slug);

    if (!result.isSuccessful) {
      return response.status(result.error!.statusCode).send({
        errorCode: result.error?.codeDescription,
        errorDescription: result.error?.errorDescription,
      });
    }

    return response.send(result.data);
  }

  @Get()
  async getAllArticles(): Promise<Article[]> {
    const articles = await this.articleService.getAllArticlesService();
    return articles;
  }
}

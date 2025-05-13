import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { Types } from "mongoose";
import {
  CreateAndUpdateArticleDto,
  CreateAndUpdateArticleDtoSchema,
} from "src/dtos/createArticleDto";
import { GetByIdSchema, GetBySlugSchema } from "src/dtos/getArticleSchema";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { Article } from "src/schemas/article.schema";
import { ArticleService } from "src/services/articles.service";

@Controller({
  path: "/article",
})
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post("/create")
  @HttpCode(201)
  async createArticle(
    @Res() response: Response,
    @Body(new ZodValidationPipe(CreateAndUpdateArticleDtoSchema))
    body: CreateAndUpdateArticleDto,
  ): Promise<Response> {
    const result = await this.articleService.createArticleService(body);

    if (!result.isSuccessful) {
      return response.status(result.error!.statusCode).send({
        errorCode: result.error?.codeDescription,
        errorDescription: result.error?.errorDescription,
      });
    }

    return response.send(result.data);
  }

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

  @Put("/:id")
  async updateOneArticle(
    @Res() response: Response,
    @Body(new ZodValidationPipe(CreateAndUpdateArticleDtoSchema))
    body: CreateAndUpdateArticleDto,
    @Param("id", new ZodValidationPipe(GetByIdSchema)) id: Types.ObjectId,
  ): Promise<Response> {
    const result = await this.articleService.updateOneArticleService(id, body);

    if (!result.isSuccessful) {
      return response.status(result.error!.statusCode).send({
        errorCode: result.error?.codeDescription,
        errorDescription: result.error?.errorDescription,
      });
    }

    return response.send(result.data);
  }

  @Delete("/:id")
  async deleteOneArticle(
    @Res() response: Response,
    @Param("id", new ZodValidationPipe(GetByIdSchema)) id: Types.ObjectId,
  ): Promise<Response> {
    const result = await this.articleService.deleteOneArticleService(id);
    if (!result.isSuccessful) {
      return response.status(result.error!.statusCode).send({
        errorCode: result.error?.codeDescription,
        errorDescription: result.error?.errorDescription,
      });
    }

    return response.send(result.data);
  }
}

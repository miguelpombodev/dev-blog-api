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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { Response } from "express";
import { GetByIdSchema, GetBySlugSchema } from "@dtos/getArticleSchema";
import { ZodValidationPipe } from "@pipes/zod-validation.pipe";
import { Article } from "@schemas/article.schema";
import { ArticleService } from "@services/articles.service";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import { JwtAuthGuard } from "src/guards/jwtAuth.guard";
import {
  CreateAndUpdateArticleDto,
  CreateAndUpdateArticleDtoSchema,
} from "@dtos/createArticleDto";
import { Types } from "mongoose";

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

  @Post()
  @UseGuards(JwtAuthGuard)
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

  @Put("/avatar/:slug")
  @UseInterceptors(FileInterceptor("file", { storage: multer.memoryStorage() }))
  async updateArticleAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param("slug", new ZodValidationPipe(GetBySlugSchema)) slug: string,
    @Res() response: Response,
  ) {
    const result = await this.articleService.uploadArticleAvatarService(
      file,
      slug,
    );

    if (!result.isSuccessful) {
      return response.status(result.error!.statusCode).send({
        errorCode: result.error?.codeDescription,
        errorDescription: result.error?.errorDescription,
      });
    }

    return response.send(result.data);
  }

  @Put("/:id")
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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

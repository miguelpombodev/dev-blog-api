import {
  CreateAndUpdateArticleDto,
  CreateAndUpdateArticleDtoSchema,
} from "@dtos/createArticleDto";
import {
  CreateAndUpdateTagDto,
  CreateAndUpdateTagDtoSchema,
} from "@dtos/createTagDto";
import { GetByIdSchema } from "@dtos/getArticleSchema";
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
  UseGuards,
} from "@nestjs/common";
import { ZodValidationPipe } from "@pipes/zod-validation.pipe";
import { AdminService } from "@services/admin.service";
import { ArticleService } from "@services/articles.service";
import { TagsService } from "@services/tags.service";
import { Response } from "express";
import { Types } from "mongoose";
import { JwtAuthGuard } from "src/guards/jwtAuth.guard";

@Controller({
  path: "/admin",
})
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly articleService: ArticleService,
    private readonly tagService: TagsService,
  ) {}

  @Post("/create")
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

  @Get("/articles")
  async GetDashboardArticles(@Res() response: Response): Promise<Response> {
    const result = await this.adminService.getAllArticles();

    if (!result.isSuccessful) {
      return response.status(result.error!.statusCode).send({
        errorCode: result.error?.codeDescription,
        errorDescription: result.error?.errorDescription,
      });
    }

    return response.send(result.data);
  }

  @Get("/tags")
  async GetAllTags(@Res() response: Response): Promise<Response> {
    const result = await this.tagService.getAllTags();

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

  @Post("/create/tag")
  @UseGuards(JwtAuthGuard)
  async createOneTag(
    @Res() response: Response,
    @Body(new ZodValidationPipe(CreateAndUpdateTagDtoSchema))
    body: CreateAndUpdateTagDto,
  ): Promise<Response> {
    const result = await this.tagService.createTagService(body);

    if (!result.isSuccessful) {
      return response.status(result.error!.statusCode).send({
        errorCode: result.error?.codeDescription,
        errorDescription: result.error?.errorDescription,
      });
    }

    return response.send(result.data);
  }
}

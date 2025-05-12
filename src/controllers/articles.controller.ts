import { Body, Controller, Get, Post } from "@nestjs/common";
import {
  CreateArticleDto,
  CreateArticleDtoSchema,
} from "src/dtosSchemas/createArticleDto";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { Article } from "src/schemas/article.schema";
import { ArticleService } from "src/services/articles.service";

@Controller()
export class ArticleController {
  constructor(private readonly appService: ArticleService) {}

  @Post("/create")
  async createArticle(
    @Body(new ZodValidationPipe(CreateArticleDtoSchema))
    body: CreateArticleDto,
  ): Promise<Article> {
    return this.appService.getHello(body);
  }

  @Get()
  getHello() {
    return {
      message: "Hello World!",
    };
  }
}

import { Controller, Get } from "@nestjs/common";
import { Article } from "src/schemas/article.schema";
import { ArticleService } from "src/services/articles.service";

@Controller()
export class ArticleController {
  constructor(private readonly appService: ArticleService) {}

  @Get()
  async getHello(): Promise<Article> {
    return this.appService.getHello();
  }
}

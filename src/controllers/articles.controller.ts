import { Controller, Get } from "@nestjs/common";
import { ArticleService } from "src/services/articles.service";

@Controller()
export class ArticleController {
  constructor(private readonly appService: ArticleService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

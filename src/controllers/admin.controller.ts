import {
  GetArticleQueryParams,
  getArticleQueryParams,
} from "@dtos/paginationDto";
import { Controller, Get, Query, Res } from "@nestjs/common";
import { ZodValidationPipe } from "@pipes/zod-validation.pipe";
import { AdminService } from "@services/admin.service";
import { Response } from "express";

@Controller({
  path: "/admin",
})
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("/articles")
  async GetDashboardArticles(
    @Res() response: Response,
    @Query(new ZodValidationPipe(getArticleQueryParams))
    params: GetArticleQueryParams,
  ): Promise<Response> {
    const result = await this.adminService.getAllArticles(params);

    if (!result.isSuccessful) {
      return response.status(result.error!.statusCode).send({
        errorCode: result.error?.codeDescription,
        errorDescription: result.error?.errorDescription,
      });
    }

    return response.send(result.data);
  }
}

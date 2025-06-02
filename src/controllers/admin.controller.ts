import { Controller, Get, Res } from "@nestjs/common";
import { AdminService } from "@services/admin.service";
import { Response } from "express";

@Controller({
  path: "/admin",
})
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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
}

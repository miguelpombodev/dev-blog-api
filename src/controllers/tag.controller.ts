import {
  CreateAndUpdateTagDto,
  CreateAndUpdateTagDtoSchema,
} from "@dtos/createTagDto";
import { GetByTagTitleSchema } from "@dtos/getTagSchema";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ZodValidationPipe } from "@pipes/zod-validation.pipe";
import { TagsService } from "@services/tags.service";
import { Response } from "express";
import { JwtAuthGuard } from "src/guards/jwtAuth.guard";

@Controller({
  path: "/tags",
})
export class TagController {
  constructor(private readonly tagService: TagsService) {}

  @Get()
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

  @Post()
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

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateOneTag(
    @Res() response: Response,
    @Body(new ZodValidationPipe(CreateAndUpdateTagDtoSchema))
    body: CreateAndUpdateTagDto,
  ): Promise<Response> {
    const result = await this.tagService.updateOneTagService(body);

    if (!result.isSuccessful) {
      return response.status(result.error!.statusCode).send({
        errorCode: result.error?.codeDescription,
        errorDescription: result.error?.errorDescription,
      });
    }

    return response.send(result.data);
  }

  @Delete("/:title")
  @UseGuards(JwtAuthGuard)
  async deleteOneTag(
    @Res() response: Response,
    @Param("title", new ZodValidationPipe(GetByTagTitleSchema)) title: string,
  ): Promise<Response> {
    const result = await this.tagService.deleteOneTagService(title);
    if (!result.isSuccessful) {
      return response.status(result.error!.statusCode).send({
        errorCode: result.error?.codeDescription,
        errorDescription: result.error?.errorDescription,
      });
    }

    return response.send(result.data);
  }
}

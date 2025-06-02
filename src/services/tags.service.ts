import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Result } from "@abstractions/result";
import TagsRepository from "@repositories/tag.repository";
import { Tag as TagSchema } from "@schemas/tag.schema";
import { CreateAndUpdateTagDto } from "@dtos/createTagDto";
import TagErrors from "@errors/tag.errors";
import { GetAllTags, Tag } from "@dtos/output/tags.output";

@Injectable()
export class TagsService {
  constructor(
    private readonly _tagRepository: TagsRepository,
    @InjectModel(TagSchema.name) private tagModel: Model<TagSchema>,
  ) {}

  private readonly _logger = new Logger(TagsService.name, {
    timestamp: true,
  });

  async createTagService(
    _dto: CreateAndUpdateTagDto,
  ): Promise<Result<TagSchema | Record<string, string>>> {
    const result = await this._tagRepository.getOneByTitle(_dto.title);

    if (result) {
      return Result.failure<TagSchema>(TagErrors.tagAlreadyRegistered);
    }

    const createdTag = new this.tagModel({
      _id: new Types.ObjectId(),
      name: _dto.title,
      color: _dto.color,
    });

    await this._tagRepository.create(createdTag);

    this._logger.log(
      `Tag with name ${createdTag.name} was successfully created!`,
    );

    return Result.success<Record<string, string>>({ status: "success!" });
  }

  async getAllTags(): Promise<Result<Tag[]>> {
    const result = await this._tagRepository.getAll();

    const tags = GetAllTags.create(result);

    return Result.success<Tag[]>(tags.getTags());
  }

  async deleteOneTagService(
    title: string,
  ): Promise<Result<Tag | Record<string, string>>> {
    const tag = await this._tagRepository.getOneByTitle(title);

    if (tag === null) {
      return Result.failure<Tag>(TagErrors.tagNotFound);
    }

    await this._tagRepository.deleteOneTagById(tag?._id);

    return Result.success<Record<string, string>>({ status: "success!" });
  }

  async updateOneTagService(
    _dto: CreateAndUpdateTagDto,
  ): Promise<Result<Record<string, string>>> {
    const tag = await this._tagRepository.getOneByTitle(_dto.title);

    if (tag === null) {
      return Result.failure<Record<string, string>>(TagErrors.tagNotFound);
    }

    tag.color = _dto.color;
    tag.name = _dto.title;

    await this._tagRepository.updateOneTag(tag);

    return Result.success<Record<string, string>>({ status: "success!" });
  }
}

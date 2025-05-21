import { Injectable, Scope } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tag, TagDocument } from "@schemas/tag.schema";
import { Model } from "mongoose";

@Injectable({ scope: Scope.TRANSIENT })
export default class TagsRepository {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  async create(createdPartialTag: Partial<Tag>): Promise<Tag> {
    const tag = new this.tagModel(createdPartialTag);
    const result = await tag.save();

    return result;
  }

  async getAll(): Promise<Tag[]> {
    const result = await this.tagModel.find().exec();

    return result;
  }

  async updateOneTag(tag: Partial<Tag>): Promise<Tag | null> {
    return await this.tagModel
      .findByIdAndUpdate(tag._id, tag, { new: true })
      .exec();
  }
}

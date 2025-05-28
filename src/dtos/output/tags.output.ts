import { Tag as TagSchema } from "@schemas/tag.schema";
import { Types } from "mongoose";

export class Tag {
  private constructor(id: Types.ObjectId, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  private id: Types.ObjectId;
  private name: string;
  private color: string;

  public static create(id: Types.ObjectId, name: string, color: string): Tag {
    return new Tag(id, name, color);
  }
}

export class GetAllTags {
  private constructor(tags: Tag[]) {
    this.tags = tags;
  }

  private tags: Tag[];

  public getTags() {
    return this.tags;
  }

  public static create(tagsFromRepository: TagSchema[]): GetAllTags {
    const tags = tagsFromRepository.map((tag) =>
      Tag.create(tag._id, tag.name, tag.color),
    );

    return new GetAllTags(tags);
  }
}

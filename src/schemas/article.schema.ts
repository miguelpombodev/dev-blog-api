import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseEntity } from "./base_entity.schema";
import { Tag } from "./tag.schema";

@Schema({ timestamps: true })
export class Article extends BaseEntity {
  @Prop({ required: true })
  articleImageSrc: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  briefDescription: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  tags: Tag[];
}

export type ArticleDocument = Article & Document;
export const ArticleSchema = SchemaFactory.createForClass(Article);

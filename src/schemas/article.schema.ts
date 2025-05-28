import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { BaseEntity } from "./base_entity.schema";

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
  tags: Types.ObjectId[];
}

export type ArticleDocument = Article & Document;
export const ArticleSchema = SchemaFactory.createForClass(Article);

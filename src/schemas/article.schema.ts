import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseEntity } from "./base_entity.schema";

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article extends BaseEntity {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  tags: string[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from "./base_entity.schema";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Tag extends BaseEntity {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  color: string;
}

export type TagDocument = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);

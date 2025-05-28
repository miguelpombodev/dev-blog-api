import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from "./base_entity.schema";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Tag extends BaseEntity {
  @Prop()
  id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;
}

export type TagDocument = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseEntity } from "./base_entity.schema";

@Schema({ timestamps: true })
export class Auth extends BaseEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;
}

export type AuthDocument = Auth & Document;
export const AuthSchema = SchemaFactory.createForClass(Auth);

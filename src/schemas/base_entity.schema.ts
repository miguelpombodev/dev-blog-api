import { Prop } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

export abstract class BaseEntity {
  @Prop({ type: String })
  _id: ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

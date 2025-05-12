import { Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";

export abstract class BaseEntity {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;
}

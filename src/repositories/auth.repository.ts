import { Injectable, Scope } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Auth, AuthDocument } from "@schemas/auth.schema";
import { Model, Types } from "mongoose";

@Injectable({ scope: Scope.REQUEST })
export class AuthRepository {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  async getOneUser(id: Types.ObjectId): Promise<Auth | null> {
    const result = await this.authModel.findById(id).exec();

    return result;
  }
}

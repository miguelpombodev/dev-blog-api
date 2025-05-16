import { Request } from "express";

export interface IUserRequest extends Request {
  profile: any;
  user: IUser;
}

export interface IUser {
  profile: IProfile;
}

export interface IProfile {
  username: string;
  _raw: string;
  emails: string[];
}

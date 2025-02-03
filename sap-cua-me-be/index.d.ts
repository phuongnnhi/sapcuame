import { IUser } from "./models/User";
import { Request as ExpressRequest } from "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user: IUser;  // Optional in case it's not always set
  }
}

export type CustomRequest = ExpressRequest & { user?: IUser };
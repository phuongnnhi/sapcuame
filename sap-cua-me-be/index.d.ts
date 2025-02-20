import { IUser } from "./models/User";
import { Request as ExpressRequest } from "express-serve-static-core";
import { FileArray } from 'express-fileupload';
import multer from 'multer';

declare module "express-serve-static-core" {
  interface Request {
    user: IUser;  // Optional in case it's not always set
    files?: Express.Multer.File[];
  }
}

export type CustomRequest = ExpressRequest & { user?: IUser };
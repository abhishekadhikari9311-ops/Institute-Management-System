import { Request } from "express";

export interface IRequestExtended extends Request {
  user?: {
    id: string;
    userName: string;
    userEmail: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
    currentInstituteNumber?: string | null;
    courseName?: string;
    courseDescription?: string;
  };
  file?: Express.Multer.File | undefined;
}

import { Request } from "express";

export interface IRequestExtended extends Request {
  user?: {
    id: string;
    userName: string;
    userEmail: string;
    password: string;
    role: string;
    createdat?: Date;
    updatedAt?: Date;
    institute_id?: string | null;
  };
}

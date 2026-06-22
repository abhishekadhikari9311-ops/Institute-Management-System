import { Request, Response, NextFunction } from "express";

const asyncErrorHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      console.error("err:", err);
    });
  };
};

export default asyncErrorHandler;

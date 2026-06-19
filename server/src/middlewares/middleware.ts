import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/config";
import User from "../database/models/user.model";
import { IRequestExtended } from "./type";

// interface IExtendedRequest extends Request {
//   user;
// }

// interface IDataValues {
//   dataValues: {
//     id: string;
//     userName: string;
//     userEmail: string;
//     password: string;
//     role: string;
//   };
// }

class Middleware {
  static async isLoggedIn(
    req: IRequestExtended,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.headers.authorization; //  accepting token by backend

      // checking whether the token exists or not

      if (!token) {
        return res.status(400).json({
          message: "token not exists........",
        });
      }

      // verifying the token

      const secret = jwtConfig.jwtSecretKey;

      if (!secret) {
        throw new Error("JWT Secret Key not found");
      }

      jwt.verify(token, secret, async (err, resp: any) => {
        if (err) {
          res.status(400).json({
            message: "invalid token ........ ",
          });
          return;
        }

        // console.log("token verified successfully:", resp);

        const userData = await User.findOne({
          where: {
            id: resp?.id,
          },
        });
        // console.log("userData:", userData);

        if (!userData) {
          return res.status(400).json({
            message: "not details of user found...",
          });
        } else {
          // console.log("userData found:", userData);

          req.user = userData;

          next();
        }
      });
    } catch (err) {
      console.error("error:", err);
      return res.status(400).json({
        message: "error found",
      });
    }
  }
}
export default Middleware;

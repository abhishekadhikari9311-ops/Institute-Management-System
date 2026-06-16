// register logic

//  receiving the incoming body data -->  userName,userEmail,password

// processing // checking -->  email valid,, compulsory data aaunu paryo

// db query -->  table maa insert, read, update, delete

import { Request, Response } from "express";
import User from "../../../database/models/user.model";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    const { userName, userEmail, password } = req.body;

    if (!userName || !userEmail || !password) {
      return res.status(400).json({
        message: "please provide the proper userName,userEmail and password...",
      });
    }

    if (userEmail > 0) {
      return res.status(400).json({
        message: "user email already registered... please choose another....",
      });
    }

    const data = await User.create({
      userName,
      userEmail,
      password,
    });

    console.log("data:", data.dataValues);

    return res.status(200).json({
      message: "user registered successfully..............",
    });
  }
}

export default AuthController;

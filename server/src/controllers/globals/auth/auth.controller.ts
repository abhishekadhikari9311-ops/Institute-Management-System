// register logic

//  receiving the incoming body data -->  userName,userEmail,password

// processing // checking -->  email valid,, compulsory data aaunu paryo

// db query -->  table maa insert, read, update, delete

///  login logic

// email , password --> data accept  --> validation

// first check email exists or not (verify) -->  yes -->  check password now  --> no --> not registered

// password milyo vane   --> token generation(jwt)  -->  password milena vane -->  error message faaldine (can't login...)

//token --> your identity on digital platform

import { Request, Response } from "express";
import User from "../../../database/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../../config/config";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    const { userName, userEmail, password } = req.body;

    if (!userName || !userEmail || !password) {
      return res.status(400).json({
        message: "please provide the proper userName,userEmail and password...",
      });
    }

    const existingUser = await User.findOne({
      where: { userEmail },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User email already registered. Please choose another.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 2);

    const data = await User.create({
      userName,
      userEmail,
      password: hashPassword,
    });

    // console.log("data:", data.dataValues);

    return res.status(200).json({
      message: "user registered successfully..............",
    });
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        userEmail: email,
      },
    });

    console.log("user:", user?.dataValues);

    if (!user) {
      return res.status(400).json({
        message: "email not registered yet",
      });
    }

    const isPasswordMatched = bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "invalid credintials.....can't login...........",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtConfig.jwtSecretKey,
      {
        expiresIn: jwtConfig.jwtExpiryTime,
      },
    );

    return res.status(200).json({
      message: "user logged in successfully..........",
      token: token,
    });
  }
}

export default AuthController;

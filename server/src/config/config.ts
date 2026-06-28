import { config } from "dotenv";
import type { Dialect } from "sequelize";
config();
import jwt from "jsonwebtoken";

export const envConfig = {
  portNumber: process.env.PORT,
};

export const dbConfig = {
  database: process.env.DB_NAME!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST!,
  dialect: process.env.DB_DIALECT as Dialect,
  port: Number(process.env.DB_PORT),
};

export const jwtConfig = {
  jwtSecretKey: process.env.JWT_SECRET_KEY as string,
  jwtExpiryTime: process.env.JWT_EXPIRY_TIME as jwt.SignOptions["expiresIn"] 
};

export const mailConfig = {
  authUser: process.env.AUTH_USER,
  authPass: process.env.AUTH_PASSWORD,
};

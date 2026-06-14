import { config } from "dotenv";
import type { Dialect } from "sequelize";
config();

export const envConfig = {
  portNumber: process.env.PORT,
};

export const dbConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as Dialect,
  port: Number(process.env.DB_PORT),
};

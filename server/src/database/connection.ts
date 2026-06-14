import { Sequelize } from "sequelize-typescript";
import { dbConfig } from "../config/config.ts";

const sequelize = new Sequelize({
  database: dbConfig.database as string,
  username: dbConfig.username as string,
  password: dbConfig.password as string,
  dialect: dbConfig.dialect,

  host: dbConfig.host as string,

  port: dbConfig.port as number,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Authenticated....   ,,,,  Connected......");
  })
  .catch((err) => {
    console.log(err, "err:");
  });

export default sequelize;

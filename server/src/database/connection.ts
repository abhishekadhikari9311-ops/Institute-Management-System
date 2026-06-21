import { Sequelize } from "sequelize-typescript";
// import { config } from "dotenv";
import { dbConfig } from "../config/config";
// config();
const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  models: [__dirname + "/models"],
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Authenticated, connceted vayo");
  })
  .catch((err) => {
    console.log(err);
  });
sequelize.sync().then(() => {
  console.log("migrated successfully new changes");
});
export default sequelize;

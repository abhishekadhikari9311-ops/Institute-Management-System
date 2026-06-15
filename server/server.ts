// import "dotenv/config";
// import { envConfig } from "./src/config/config.ts";
// import "reflect-metadata";

// import app from "./src/app.ts";

// import sequelize from "./src/database/connection.ts";

// // const app = require("./src/app");

// async function server() {
//   try {
//     await sequelize
//       .authenticate()
//       .then(() => {
//         console.log("Authenticated, connceted vayo");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     await sequelize.sync({ alter: true }).then(() => {
//       console.log("migrated successfully new changes");
//     });

//     const port = envConfig.portNumber || 6000;
//     app.listen(port, () => {
//       console.log(`server is running at port ${port} `);
//     });
//   } catch (err) {
//     console.log("err:", err);
//   }
// }

// server();

// new  ////

import "dotenv/config";
// import "reflect-metadata";
import app from "./src/app";
import "./src/database/connection";

// import app from "./src/app.ts";
// import "./src/database/connection.ts";

async function server() {
  try {
    const port = 7000;

    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

server();

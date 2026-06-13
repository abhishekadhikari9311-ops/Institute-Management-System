import app from "./src/app.ts";
import { envConfig } from "./src/config/config.ts";

// const app = require("./src/app");

function server() {
  const port = envConfig.portNumber || 6000;
  app.listen(port, () => {
    console.log(`server is running at port ${port} `);
  });
}

server();

import { createServer } from "http";
import { createApplication } from "./app";

const httpServer = createServer();

createApplication(
  httpServer,
  {
    cors: {
      origin: ["http://localhost:4200", "https://tyllo.herokuapp.com"],
    },
  }
);

httpServer.listen(3000);

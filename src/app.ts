import { Server as HttpServer } from "http";
import { Server, ServerOptions } from "socket.io";
import { ClientEvents, ServerEvents } from "./events";
import TodoController from "./modules/Todo/todo.controller";

export function createApplication(
  httpServer: HttpServer,
  serverOptions: Partial<ServerOptions> = {}
): Server<ClientEvents, ServerEvents> {
  const io = new Server<ClientEvents, ServerEvents>(httpServer, serverOptions);

  io.on("connection", (socket) => {
    TodoController.registerHandlers(socket);
  });

  return io;
}

import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import TodoHandler from "./todo.handler";
import { TodoClientEvents, TodoServerEvents } from "./types";

const registerHandlers = (
  socket: Socket<TodoClientEvents, TodoServerEvents, DefaultEventsMap, any>
) => {
  const todoHandler = new TodoHandler(socket);
  socket.on("todo:create", todoHandler.createTodo);
  socket.on("todo:read", todoHandler.readTodo);
  socket.on("todo:update", todoHandler.updateTodo);
  socket.on("todo:delete", todoHandler.deleteTodo);
  socket.on("todo:list", todoHandler.listTodo);
};

const TodoController = {
  registerHandlers,
};

export default TodoController;

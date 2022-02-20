import { v4 as uuid } from "uuid";
import { Socket } from "socket.io";
import { Todo, TodoClientEvents, TodoID, TodoServerEvents } from "./types";
import { InMemoryTodoRepository } from "./todo.repository";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const todoRepository = new InMemoryTodoRepository();

export default class TodoService {
  socket: Socket<TodoClientEvents, TodoServerEvents, DefaultEventsMap, any>;

  constructor(
    socket: Socket<TodoClientEvents, TodoServerEvents, DefaultEventsMap, any>
  ) {
    this.socket = socket;
  }

  create = async (value: any) => {
    value.id = uuid();

    // persist the entity
    await todoRepository.save(value);

    // notify the other users
    this.socket.broadcast.emit("todo:created", value);
  };

  read = async function (id: TodoID) {
    return todoRepository.findById(id);
  };

  update = async (value: Todo) => {
    await todoRepository.save(value);

    this.socket.broadcast.emit("todo:updated", value);
  };

  delete = async  (id: TodoID) => {
    await todoRepository.deleteById(id);

    this.socket.broadcast.emit("todo:deleted", id);
  };

  list = async function () {
    return todoRepository.findAll();
  };
}

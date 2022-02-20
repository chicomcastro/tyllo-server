import { Errors, mapErrorDetails, sanitizeErrorMessage } from "../../utils";
import { ClientEvents, Response, ServerEvents } from "../../events";
import { Socket } from "socket.io";
import { Todo, TodoID } from "./types";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { validateCreate, validateId, validateUpdate } from "./todo.validators";
import TodoService from "./todo.service";

export default class TodoHandler {
  service: TodoService;

  constructor(
    socket: Socket<ClientEvents, ServerEvents, DefaultEventsMap, any>
  ) {
    this.service = new TodoService(socket);
  }

  createTodo = async (
    payload: Omit<Todo, "id">,
    callback: (res: Response<TodoID>) => void
  ) => {
    // validate the payload
    const { error, value } = validateCreate(payload);

    if (error) {
      return callback({
        error: Errors.INVALID_PAYLOAD,
        errorDetails: mapErrorDetails(error.details),
      });
    }

    // persist the entity
    try {
      await this.service.create(value);
    } catch (e) {
      return callback({
        error: sanitizeErrorMessage(e),
      });
    }

    // acknowledge the creation
    callback({
      data: value.id,
    });
  };

  readTodo = async (id: TodoID, callback: (res: Response<Todo>) => void) => {
    const { error } = validateId(id);

    if (error) {
      return callback({
        error: Errors.ENTITY_NOT_FOUND,
      });
    }

    try {
      const todo = await this.service.read(id);
      callback({
        data: todo,
      });
    } catch (e) {
      callback({
        error: sanitizeErrorMessage(e),
      });
    }
  };

  updateTodo = async (
    payload: Todo,
    callback: (res?: Response<void>) => void
  ) => {
    const { error, value } = validateUpdate(payload);

    if (error) {
      return callback({
        error: Errors.INVALID_PAYLOAD,
        errorDetails: mapErrorDetails(error.details),
      });
    }

    try {
      await this.service.update(value);
    } catch (e) {
      return callback({
        error: sanitizeErrorMessage(e),
      });
    }

    callback();
  };

  deleteTodo = async (id: TodoID, callback: (res?: Response<void>) => void) => {
    const { error } = validateId(id);

    if (error) {
      return callback({
        error: Errors.ENTITY_NOT_FOUND,
      });
    }

    try {
      await this.service.delete(id);
    } catch (e) {
      return callback({
        error: sanitizeErrorMessage(e),
      });
    }

    callback();
  };

  listTodo = async (callback: (res: Response<Todo[]>) => void) => {
    try {
      const todos = await this.service.list();
      callback({
        data: todos,
      });
    } catch (e) {
      callback({
        error: sanitizeErrorMessage(e),
      });
    }
  };
}

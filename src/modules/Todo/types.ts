import { Response } from "../../events";

export type TodoID = string;

export interface Todo {
  id: TodoID;
  completed: boolean;
  title: string;
}

export interface TodoServerEvents {
  "todo:created": (todo: Todo) => void;
  "todo:updated": (todo: Todo) => void;
  "todo:deleted": (id: TodoID) => void;
}

export interface TodoClientEvents {
  "todo:list": (callback: (res: Response<Todo[]>) => void) => void;

  "todo:create": (
    payload: Omit<Todo, "id">,
    callback: (res: Response<TodoID>) => void
  ) => void;

  "todo:read": (id: TodoID, callback: (res: Response<Todo>) => void) => void;

  "todo:update": (
    payload: Todo,
    callback: (res?: Response<void>) => void
  ) => void;

  "todo:delete": (id: TodoID, callback: (res?: Response<void>) => void) => void;
}

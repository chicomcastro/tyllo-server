import { CrudRepository, Errors } from "../../utils";
import { Todo, TodoID } from "./types";

abstract class TodoRepository extends CrudRepository<Todo, TodoID> {}

export class InMemoryTodoRepository extends TodoRepository {
  private readonly todos: Map<TodoID, Todo> = new Map();

  findAll(): Promise<Todo[]> {
    const entities = Array.from(this.todos.values());
    return Promise.resolve(entities);
  }

  findById(id: TodoID): Promise<Todo> {
    if (this.todos.has(id)) {
      return Promise.resolve(this.todos.get(id)!);
    } else {
      return Promise.reject(Errors.ENTITY_NOT_FOUND);
    }
  }

  save(entity: Todo): Promise<void> {
    console.log(entity)
    this.todos.set(entity.id, entity);
    console.log(this.todos)
    return Promise.resolve();
  }

  deleteById(id: TodoID): Promise<void> {
    const deleted = this.todos.delete(id);
    if (deleted) {
      return Promise.resolve();
    } else {
      return Promise.reject(Errors.ENTITY_NOT_FOUND);
    }
  }
}

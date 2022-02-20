import { ValidationErrorItem } from "joi";

export enum Errors {
  ENTITY_NOT_FOUND = "entity not found",
  INVALID_PAYLOAD = "invalid payload",
}

const errorValues: string[] = Object.values(Errors);

export function sanitizeErrorMessage(message: any) {
  if (typeof message === "string" && errorValues.includes(message)) {
    return message;
  } else {
    return "an unknown error has occurred";
  }
}

export function mapErrorDetails(details: ValidationErrorItem[]) {
  return details.map((item) => ({
    message: item.message,
    path: item.path,
    type: item.type,
  }));
}

export abstract class CrudRepository<T, ID> {
  abstract findAll(): Promise<T[]>;
  abstract findById(id: ID): Promise<T>;
  abstract save(entity: T): Promise<void>;
  abstract deleteById(id: ID): Promise<void>;
}

import { ValidationErrorItem } from "joi";
import { TodoClientEvents, TodoServerEvents } from "./modules/Todo/types";

interface Error {
  error: string;
  errorDetails?: ValidationErrorItem[];
}

interface Success<T> {
  data: T;
}

export type Response<T> = Error | Success<T>;

export type ServerEvents = TodoServerEvents;

export type ClientEvents = TodoClientEvents;

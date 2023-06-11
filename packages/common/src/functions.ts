import { type Truthy } from "./types";

export function isTruthy<T>(value: T): value is Truthy<T> {
  return Boolean(value);
}

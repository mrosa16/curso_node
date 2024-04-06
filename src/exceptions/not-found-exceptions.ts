import { appException } from "./app-exceptions";

export class notFoundException extends appException {
  constructor(entity: string) {
    super(`${entity} not found`, 404);
  }
}

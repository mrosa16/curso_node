import { appException } from "./app-exceptions";

export class internalServerErrorExceptions extends appException {
  constructor(message: string) {
    super(message);
  }
}

import { appException } from "./app-exceptions";

export class internalServerErrorExceptions extends appException {
  constructor() {
    super("Internal Server Error");
  }
}

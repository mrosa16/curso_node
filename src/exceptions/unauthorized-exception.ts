import { appException } from "./app-exceptions";

export class unauthorizedException extends appException {
  constructor() {
    super("User without permission", 401);
  }
}

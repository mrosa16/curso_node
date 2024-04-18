import { appException } from './app-exceptions';

export class BasRequestException extends appException {
  constructor(message: string) {
    super(message, 400);
  }
}

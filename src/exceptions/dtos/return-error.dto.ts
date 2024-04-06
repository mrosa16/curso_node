import { appException } from "@exceptions/app-exceptions";

export class ReturnError {
  error: boolean;
  message: string;
  errorCode: number;

  constructor(res: Response, error: Error, errorCode?: number) {
    this.error = true;
    this.message = error.message;

    if (error instanceof appException) {
      this.errorCode = error.errorCode;
    }

    res.status(errorCode || 500).send(this);
  }
}

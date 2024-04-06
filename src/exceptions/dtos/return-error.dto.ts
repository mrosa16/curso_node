export class ReturnError {
  error: boolean;
  message: string;
  errorCode: number;

  constructor(res: Response, error: Error, errorCode?: number) {
    this.error = true;
    this.message = error.message;
    this.errorCode = this.errorCode;

    res.status(errorCode || 500).send(this);
  }
}
import { HttpError } from "routing-controllers";

export class DbError extends HttpError {
  public args: Error

  constructor(args: Error) {
    super(500)
    Object.setPrototypeOf(this, DbError.prototype)
    this.args = args
  }

  toJSON() {
    return {
      status: this.httpCode,
      message: this.args.message
    }
  }
}

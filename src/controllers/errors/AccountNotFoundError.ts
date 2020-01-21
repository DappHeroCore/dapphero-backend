import { HttpError } from "routing-controllers"

export class AccountNotFoundError extends HttpError {
  constructor() {
    super(404)
  }

  toJSON() {
    return {
      status: this.httpCode,
      message: "Account not found!"
    }
  }
}

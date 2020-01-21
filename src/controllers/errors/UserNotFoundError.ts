import { HttpError } from "routing-controllers"

export class UserNotFoundError extends HttpError {
  constructor() {
    super(404)
  }

  toJSON() {
    return {
      status: this.httpCode,
      message: "User not found!"
    }
  }
}

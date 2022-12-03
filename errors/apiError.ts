import { BaseError, HttpStatusCode } from "./baseError";
export class APIError extends BaseError {
  constructor(
    name = "",
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = "internal server error"
  ) {
    super(name, httpCode, description, isOperational);
  }
}

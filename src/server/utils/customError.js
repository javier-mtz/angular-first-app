// This custom error is used to show a message to the user without exposing the error message
// "message" is handled by the middleware

export default class CustomError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}


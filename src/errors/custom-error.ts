/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';

class NotFoundError extends Error {
  statusCode: any;
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

class BadRequest extends Error {
  statusCode: any;
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class UnauthenticatedError extends Error {
  statusCode: any;
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

class UnauthorizedError extends Error {
  statusCode: any;
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = {
  NotFoundError,
  BadRequest,
  UnauthenticatedError,
  UnauthorizedError,
};

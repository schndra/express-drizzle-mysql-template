import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { handleValidationError } from "../errors/validation-error";

const errorHandlerMiddleware = async (
  err: Error & {
    statusCode: number;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let msg: string = err.message || "Something went wrong try again later..";
  let details: unknown | undefined;

  if (err instanceof ZodError) {
    statusCode = StatusCodes.BAD_REQUEST;
    msg = "Validation failed: invalid request data";
    details = handleValidationError(err);
  }

  res.status(statusCode).json({ msg, details });
};

export default errorHandlerMiddleware;

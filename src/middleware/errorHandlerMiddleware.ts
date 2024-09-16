import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = async (
  err: Error & {
    statusCode: number;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.name);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  const msg = err.message || "something went wrong try again later";

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = async (
  err: any,
  req: any,
  res: any,
  next: any
) => {
  console.log(err);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  const msg = err.message || 'something went wrong try again late';

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;

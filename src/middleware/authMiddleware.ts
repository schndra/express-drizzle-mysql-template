import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { UnauthenticatedError } from "../errors/custom-error";
import { db } from "../db/connect";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export type JwtPayload = {
  userId: number;
};

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // console.log(decoded);

    const [currentUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.userId))
      .limit(1);

    // console.log(currentUser);

    req.user = currentUser;
    res.locals = currentUser;

    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

export default authMiddleware;

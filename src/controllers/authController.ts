import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../db/connect";
import { insertUserSchema, users } from "../db/schema";
import { eq } from "drizzle-orm";
import { BadRequestError } from "../errors/custom-error";

const register = async (req: Request, res: Response) => {
  //validate user data
  const userData = insertUserSchema.parse(req.body);

  //check for existing user (TODO: write a reusable func :p)
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, userData.email))
    .limit(1);

  // console.log(existingUser);

  if (existingUser.length > 0) {
    throw new BadRequestError(
      `A user with email ${userData.email} already exists.`
    );
  }
  //insert user
  const user = await db.insert(users).values(userData).$returningId();

  console.log(user);

  res.status(StatusCodes.CREATED).json({ msg: "user created successfully" });
};

const login = async (req: Request, res: Response) => {
  res.send("login route");
};

export { login, register };

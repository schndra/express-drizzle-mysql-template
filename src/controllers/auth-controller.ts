import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../db/connect";
import { insertUserSchema, loginSchema, users } from "../db/schema";
import { eq } from "drizzle-orm";
import { BadRequestError, UnauthenticatedError } from "../errors/custom-error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

const register = async (req: Request, res: Response) => {
  //validate user data
  const { email, name, password } = insertUserSchema.parse(req.body);

  //check for existing user (TODO: write a reusable func :p)
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // console.log(existingUser);

  if (existingUser) {
    throw new BadRequestError(`A user with email ${email} already exists.`);
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const userDataWithHashedPassword = {
    name,
    email,
    password: hashPassword,
  };

  //insert user
  const user = await db
    .insert(users)
    .values({ ...userDataWithHashedPassword })
    .$returningId();

  // console.log(user);

  res.status(StatusCodes.CREATED).json({ msg: "user created successfully" });
};

const login = async (req: Request, res: Response) => {
  // validate req
  const { email, password } = loginSchema.parse({ ...req.body });

  // check if the user in the sys
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!existingUser) {
    throw new UnauthenticatedError(`Invalid Credintials`);
  }

  // compare password
  const isPassword = await bcrypt.compare(password, existingUser.password);

  if (!isPassword) {
    throw new BadRequestError("Invalid password");
  }

  // sign jwt token
  const token = jwt.sign({ userId: existingUser.id }, config.jwtSecret, {
    expiresIn: "15d", //later make it 15m :p
  });

  res
    .status(StatusCodes.OK)
    .json({ user: { name: existingUser.name }, msg: "user Signed In", token });
};

const testAuthRoutes = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    msg: "this is to test auth routes",
    user: req.user,
  });
};

export { login, register, testAuthRoutes };

import express, { NextFunction, Request, Response } from "express";
import { db } from "./db/connect";
import config from "./config";
import { userTable } from "./db/schema";
import { sql } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";
import { ResultSetHeader } from "mysql2";
import { BadRequest } from "./errors/custom-error";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/v1/users", async function (req, res, next) {
  // const userList = await db.select().from(users);
  try {
    const userList = await db.query.userTable.findMany({});

    if (userList.length > 0) {
      throw new BadRequest("is this working");
    }

    console.log(userList); // throw new Error("nothing");

    res.status(200).json({
      users: userList,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/users", async function (req, res) {
  const user = await db.insert(userTable).values(req.body).$returningId();

  res.status(StatusCodes.CREATED).json({
    user,
    msg: "user created successfully",
  });
});

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Not Found" });
});

app.use(errorHandlerMiddleware);

const port = config.port || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Something went wrong...", error);
  }
};

start();

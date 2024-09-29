import express, { NextFunction, Request, Response } from "express";
import { db } from "./db/connect";
import config from "./config";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";
import "express-async-errors";
//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";
import authRouter from "./routes/auth-router";
import { sql } from "drizzle-orm";
// import { users } from "./db/schema";
// import { BadRequestError } from "./errors/custom-error";
// import userRouter from "./routes/userRoute";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/auth", authRouter);

// app.get("/api/v1/users", async function (req, res, next) {
//   // const userList = await db.select().from(users);
//   const userList = await db.query.userTable.findMany({});

//   if (userList.length < 0) {
//     throw new BadRequestError("is this working");
//   }

//   console.log(userList); // throw new Error("nothing");

//   res.status(200).json({
//     users: userList,
//     message: "success",
//   });
// });

// app.post("/api/v1/users", async function (req, res) {
//   const user = await db.insert(userTable).values(req.body).$returningId();

//   res.status(StatusCodes.CREATED).json({
//     user,
//     msg: "user created successfully",
//   });
// });

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Not Found" });
});

app.use(errorHandlerMiddleware);

const port = config.port || 5000;

const start = async () => {
  try {
    const x = await db.execute(sql`SELECT 1`);
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

start();

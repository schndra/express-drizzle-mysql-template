import express from "express";
import { db } from "./db/connect";
import config from "./config";
import { UserTable } from "./db/schema";
const app = express();

app.get("/", async function (req, res) {
  const users = await db.select().from(UserTable);

  res.status(200).json({
    users,
    message: "success",
  });
});

const port = config.port || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();

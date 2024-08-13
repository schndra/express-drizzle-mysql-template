import * as schema from "./schema";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import config from "../config";

const poolConnection = mysql.createPool(config.getDatabaseConfig());

export const db = drizzle(poolConnection, { schema, mode: "default" });

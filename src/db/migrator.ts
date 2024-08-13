import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { migrate } from "drizzle-orm/mysql2/migrator";
import config from "../config";
import path from "path";

const migrateDB = async () => {
  try {
    const connection = await mysql.createConnection(config.getDatabaseConfig());

    const db = drizzle(connection);

    // This will run migrations on the database, skipping the ones already applied
    await migrate(db, {
      migrationsFolder: path.join(__dirname, "../../drizzle"),
    });

    // Don't forget to close the connection, otherwise the script will hang
    await connection.end();
    console.log("migrations are done");
  } catch (error) {
    console.log("migration error", error);
  }
};

migrateDB();

import { int, mysqlTable, varchar, boolean } from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("user", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  age: int("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

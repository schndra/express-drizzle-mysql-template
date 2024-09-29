import { int, mysqlTable, varchar, text } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = mysqlTable("user", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
});

export const selectUserSchema = createSelectSchema(users, {
  email: (schema) =>
    schema.email.email().regex(/^([\w.%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/i),
  name: z.string().min(3, {
    message: "name must be at least 3 characters",
  }),
});

// export const insertUserSchema = createInsertSchema(users, {
//   name: z.string().min(3, {
//     message: "name must be at least 3 characters",
//   }),
// });

export const insertUserSchema = selectUserSchema.pick({
  email: true,
  name: true,
  password: true,
});

export const loginSchema = selectUserSchema.pick({
  email: true,
  password: true,
});

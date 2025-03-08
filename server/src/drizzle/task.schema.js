import { relations, sql } from "drizzle-orm";
import { primaryKey } from "drizzle-orm/mysql-core";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { pgUsers } from "./user.schema.js";

export const pgTask = pgTable("task", {
  taskId: uuid("task_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  taskMongoId: varchar("task_mongo_id", { length: 100 }).unique().notNull(),
});

export const taskRelation = relations(pgTask, ({ many }) => ({
  user: many(pgUserTasks),
}));

export const pgUserTasks = pgTable(
  "user_tasks",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => pgUsers.userId),
    taskId: uuid("task_id")
      .notNull()
      .references(() => pgTask.task_id),
  },
  (table) => [{ pk: primaryKey({ columns: [table.userId, table.taskId] }) }]
);

export const userTaskRelation = relations(pgUserTasks, ({ one }) => ({
  user: one(pgUsers, {
    fields: [pgUserTasks.userId],
    references: [pgUsers.userId],
  }),
  task: one(pgTask, {
    fields: [pgUserTasks.taskId],
    references: [pgTask.taskId],
  }),
}));

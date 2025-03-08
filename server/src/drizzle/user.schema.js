import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  text,
  uuid,
  varchar,
  uniqueIndex,
  integer,
  check,
} from "drizzle-orm/pg-core";
import { pgUserJobs } from "./job.schema.js";
import { pgUserTasks } from "./task.schema.js";

export const pgUsers = pgTable(
  "users",
  {
    userId: uuid("user_id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userPassword: varchar("user_password", { lenght: 30 }).notNull(),
    userEmail: varchar("user_email", { length: 100 }).notNull().unique(),
  },
  (table) => {
    return [
      {
        emailIdx: uniqueIndex("idx_user_email").on(table.userEmail),
      },
    ];
  }
);

export const userRelations = relations(pgUsers, ({ one, many }) => ({
  profile: one(pgProfile),
  job: many(pgUserJobs),
  task: many(pgUserTasks),
}));

export const pgProfile = pgTable(
  "profile",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => pgUsers.userId),
    profileName: text("profile_name").notNull(),
    profileRating: integer("profile_rating"),
  },
  (table) => [
    {
      checkConstraint: check(
        "rating_check",
        sql`${table.profileRating} >= 1 AND ${table.profileRating} <=5`
      ),
    },
  ]
);

export const proflieRelation = relations(pgProfile, ({ one }) => ({
  user: one(pgUsers, {
    fields: [pgProfile.userId],
    references: [pgUsers.userId],
  }),
}));

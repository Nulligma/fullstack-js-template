import { relations, sql } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { pgUsers } from "./user.schema.js";

export const pgJob = pgTable("job", {
  jobId: uuid("job_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  jobName: varchar("job_name", { length: 30 }).unique().notNull(),
});

export const jobRelations = relations(pgJob, ({ many }) => ({
  user: many(pgUserJobs),
}));

export const pgUserJobs = pgTable(
  "user_jobs",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => pgUsers.userId),
    jobId: uuid("job_id")
      .notNull()
      .references(() => pgJob.jobId),
  },
  (table) => [{ pk: primaryKey({ columns: [table.userId, table.jobId] }) }]
);

export const userJobsRelations = relations(pgUserJobs, ({ one }) => ({
  user: one(pgUsers, {
    fields: [pgUserJobs.userId],
    references: [pgUsers.userId],
  }),
  job: one(pgJob, {
    fields: [pgUserJobs.jobId],
    references: [pgJob.jobId],
  }),
}));

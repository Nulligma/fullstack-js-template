import { pg } from "../../server.js";
import { pgJob, pgUserJobs } from "../drizzle/job.schema.js";
import { pgTask } from "../drizzle/task.schema.js";
import { pgProfile, pgUsers } from "../drizzle/user.schema.js";
import { sql } from "drizzle-orm";

export const selectAllUsers = async () => await pg.select().from(pgUsers);
export const selectAllJobs = async () => await pg.select().from(pgJob);
export const selectAllTasks = async () => await pg.select().from(pgTask);

export const selectUser = async (email) => await pg.select().from(pgUsers).where(sql`${pgUsers.userEmail} = ${email}`);
export const selectProfile = async (userId) => await pg.select().from(pgProfile).where(sql`${pgProfile.userId} = ${userId}`);

export const assignJob = async (user, jobList) => {
    const userJobs = [];
    for (let i = 0; i < jobList.length; i++) {
        const job = jobList[i];
        
        const jobSelect = await pg.select().from(pgJob).where(sql`${pgJob.jobName} = ${job}`);
        if(jobSelect.length == 0) throw new Error(`Job ${job} not found in db`);

        const userJob = await pg.insert(pgUserJobs).values({ userId: user[0].userId, jobId: jobSelect[0].jobId }).returning();
        userJobs.push(userJob[0]);
    }
    return userJobs;
}
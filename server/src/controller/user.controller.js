import { pg } from "../../server.js";
import { pgProfile, pgUsers } from "../drizzle/user.schema.js";
import { assignJob, selectAllJobs, selectAllTasks, selectAllUsers, selectProfile, selectUser } from '../service/user.service.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generateToken.js";

export async function getUserList(req, res, next) {
    res.json(await selectAllUsers());
}

export async function getJobList(req, res, next) {
    res.json(await selectAllJobs());
}

export async function taskList(req, res, next) {
    res.json(await selectAllTasks());
}

export async function addUser(req, res, next) {
    const { name, email, password, jobList } = req.body;

    const user = await pg.insert(pgUsers).values({ userEmail: email, userPassword: password }).returning();
    const profile = await pg.insert(pgProfile).values({ userId: user[0].userId, profileName: name, profileRating: 5 }).returning();

    const userJobs = await assignJob(user, jobList);

    res.json({
        user: user[0],
        profile: profile[0],
        userJobs
    })
}

export const getUserProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.userId;

    const profile = await selectProfile(userId);

    if (profile.length == 0) { res.status(404); throw new Error('Profile not found') }

    res.json({
        name: profile[0].name,
        rating: profile[0].profileRating
    })
})

export const authUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await selectUser(email);
    if (user.length == 0) { res.status(404); throw new Error(`user with email ${email} not found`); }

    if (! await bcrypt.compare(password, user[0].userPassword)) throw new Error(`invalid password`);

    const profile = await selectProfile(user[0].userId);

    const name = profile.length == 0 ? "No name" : profile[0].profileName;
    const rating = profile.length == 0 ? 5 : profile[0].profileRating;

    const token = generateToken(res, user[0].userEmail);

    res.json({ id: user[0].userId, email: user[0].userEmail, name, rating, token });
});

export const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, jobList } = req.body;

    const checkUser = await selectUser(email);
    if (checkUser.length != 0) { res.status(400); throw new Error(`user with email ${email} already exists`); }

    const salt = await bcrypt.genSalt(10);
    const saltedPass = await bcrypt.hash(password, salt);

    try {
        const newUser = await pg.insert(pgUsers).values({ userEmail: email, userPassword: saltedPass }).returning();
        const profile = await pg.insert(pgProfile).values({ userId: newUser[0].userId, profileName: name, profileRating: 5 }).returning();

        const userJobs = await assignJob(newUser, jobList);

        const token = generateToken(res, newUser[0].userId);

        res.status(201).json({
            id: newUser[0].userId,
            name,
            email,
            rating: 5,
            token
        });
    } catch (error) {
        res.status(400);
        throw new Error(`Invalid user data ${error}`);
    }
});
import { Router } from "express";
import { addUser, authUser, getJobList, getUserList, getUserProfile, registerUser } from "../controller/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

export const userRouter = Router();

userRouter.get("/", getUserList);
// userRouter.post("/",addUser);

userRouter.post("/", registerUser);
userRouter.post("/auth", authUser);

userRouter
    .route('/profile')
    .get(protect, getUserProfile);

userRouter.get("/jobs",getJobList);
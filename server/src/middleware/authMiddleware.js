import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { selectUser } from '../service/user.service.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const email = decode.email;

            const user = await selectUser(email);
            if (user.length == 0) { res.status(404); throw new Error(`user with email ${email} not found`); }

            req.user = user[0];

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});
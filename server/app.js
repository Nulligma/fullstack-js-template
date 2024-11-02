import express from 'express'
import todoRouter from './src/routes/todo.routes.js';
import cors from 'cors';
import { userRouter } from './src/routes/user.routes.js';
import { errorHandler, notFound } from './src/middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (_, res) => res.send('Welcome to todo app V1'));

app.use('/todo', todoRouter);
app.use('/user', userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
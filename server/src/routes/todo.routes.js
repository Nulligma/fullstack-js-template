import { Router } from 'express'
import { createTodo, deleteTodo, getTodo, getTodoList, updateTodo } from '../controller/todo.controller.js';

const todoRouter = Router();

todoRouter.get('/', getTodoList);
todoRouter.get("/:id", getTodo);
todoRouter.post("/", createTodo);
todoRouter.patch("/:id",updateTodo);
todoRouter.delete("/:id",deleteTodo);

export default todoRouter;
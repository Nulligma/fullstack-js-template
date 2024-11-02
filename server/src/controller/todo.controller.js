import {Todo} from "../models/todo.model.js";

export async function getTodoList(req,res,next) {
    const todos = await Todo.find();
    res.json(todos);
}

export async function getTodo(req,res,next){
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
}

export async function createTodo(req,res,next) {
    const r = await Todo.create(req.body);
    res.json(r);
}

export async function updateTodo(req,res,next) {
    const u = await Todo.updateOne({_id:req.params.id},{...req.body},);
    res.json(u);
}

export async function deleteTodo(req,res,next) {
    const d = await Todo.deleteOne({_id:req.params.id});
    res.json(d);
}
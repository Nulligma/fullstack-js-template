import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String },
    dueDate: { type: Date, required: true },
    done: { type: Boolean, default: false }
}, { timestamps: true });

export const Todo = mongoose.model('todos', todoSchema);
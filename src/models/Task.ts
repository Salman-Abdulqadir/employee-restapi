import mongoose, { Schema } from "mongoose";

import { TaskI } from "../interfaces/task.interface";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  duedate: {
    type: Date,
    required: true,
  },
  assignee: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
});

export const TaskModel = mongoose.model<TaskI>("Task", taskSchema);

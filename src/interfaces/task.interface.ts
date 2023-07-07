import mongoose from "mongoose";

export interface TaskI extends mongoose.Document {
  title: string;
  duedate: Date;
}

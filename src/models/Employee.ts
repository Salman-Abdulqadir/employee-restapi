import mongoose, { Schema } from "mongoose";
import { EmployeeSI } from "../interfaces/employee.interface";

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  notificationPreference: [
    {
      type: String,
      required: true,
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export const EmployeeModel = mongoose.model<EmployeeSI>(
  "Employee",
  EmployeeSchema
);

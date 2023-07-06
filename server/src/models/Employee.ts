import mongoose from "mongoose";
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
});

export const EmployeeModel = mongoose.model<EmployeeSI>(
  "Employee",
  EmployeeSchema
);

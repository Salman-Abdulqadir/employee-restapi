import mongoose, { Document } from "mongoose";

export interface EmployeeI {
  name: string;
  age: number;
}

export interface ServiceI {
  model: mongoose.Model<any, any>;
  post: (data: object) => any;
  get: () => Promise<object | undefined>;
  delete: (id: string) => void;
}

export default interface EmployeeSI extends EmployeeI, Document {}

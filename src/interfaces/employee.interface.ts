import mongoose from "mongoose";

export interface EmployeeSI extends mongoose.Document {
  name: string;
  age: number;
  salary: number;
  notificationPreference: string[];
}

export interface EmployeeI {
  id: string;
  name: string;
  age: number;
  salary: number;
  notificationPreference: string[];
}

export interface EmployeeServiceI {
  model: mongoose.Model<any, any>;
  post: (data: object) => any;
  get: () => Promise<object | undefined>;
  delete: (id: string) => void;
  update: (updatedEmployee: EmployeeI) => void;
  bulkInsert: (employees: EmployeeI[]) => void;
}

export interface SubjectI {
  attach: (observer: ObserverI) => void;
  detach: (observer: ObserverI) => void;
  notify: (content: EmployeeI) => void;
}

export interface ObserverI {
  update: (content: EmployeeI) => void;
}

import mongoose from "mongoose";

export interface EmployeeI extends mongoose.Document {
  name: string;
  age: number;
}

export interface ServiceI {
  model: mongoose.Model<any, any>;
  post: (data: object) => any;
  get: () => Promise<object | undefined>;
  delete: (id: string) => void;
}

export interface SubjectI {
  attach: (observer: ObserverI) => void;
  detach: (observer: ObserverI) => void;
  notify: (content: object) => void;
}

export interface ObserverI {
  update: (content: object) => void;
}

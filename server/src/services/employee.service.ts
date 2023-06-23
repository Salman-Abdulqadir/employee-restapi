import { EmployeeI, ServiceI } from "../interfaces/employee.interface";
import mongoose from "mongoose";

export default class EmployeeService implements ServiceI {
  model: mongoose.Model<EmployeeI, any>;

  constructor(model: mongoose.Model<EmployeeI, any>) {
    this.model = model;
  }
  post = async (data: object) => {
    const resource = await this.model.create(data);
    return resource;
  };
  get = async (): Promise<object | undefined> => {
    const resource = await this.model.find();
    return resource;
  };
  delete = (id: string): void => {
    return this.model.findOneAndDelete(new mongoose.Types.ObjectId(id));
  };
}

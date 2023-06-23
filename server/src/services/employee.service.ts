import { ServiceI } from "../interfaces/employee.interface";
import { EmployeeModel } from "../models/Employee";
import mongoose from "mongoose";

export default class EmployeeService implements ServiceI {
  model: mongoose.Model<any, any> = EmployeeModel;

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

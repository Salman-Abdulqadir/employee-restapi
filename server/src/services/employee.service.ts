import { injectable, inject } from "inversify";
import mongoose, { Model } from "mongoose";
import { ServiceI } from "../interfaces/employee.interface";

@injectable()
export default class EmployeeService implements ServiceI {
  model: Model<any, any>;

  constructor(@inject("EmployeeModel") Employee: Model<any, any>) {
    this.model = Employee;
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

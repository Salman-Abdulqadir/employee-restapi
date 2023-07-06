import {
  EmployeeSI,
  EmployeeServiceI,
  EmployeeI,
} from "../interfaces/employee.interface";
import mongoose from "mongoose";

export default class EmployeeService implements EmployeeServiceI {
  model: mongoose.Model<EmployeeSI, any>;

  constructor(model: mongoose.Model<EmployeeSI, any>) {
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
  update = async (updatedEmployee: EmployeeI) => {
    try {
      const id = updatedEmployee.id;
      const name = updatedEmployee.name;
      const age = updatedEmployee.age;
      await this.model.findByIdAndUpdate(id, { name, age });
    } catch (err) {
      console.log(err);
    }
  };
}

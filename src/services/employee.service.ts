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
    const employee: EmployeeI[] = await this.model.find(data);
    if (employee.length == 0) {
      const resource = await this.model.create(data);
      return resource;
    }
  };
  get = async (): Promise<object | undefined> => {
    const resource = await this.model.find();
    return resource;
  };
  getOne = async (employeeId: string): Promise<EmployeeI | undefined> => {
    return this.model.findById(employeeId);
  };
  delete = (id: string): void => {
    return this.model.findOneAndDelete(new mongoose.Types.ObjectId(id));
  };
  update = async (updatedEmployee: EmployeeI) => {
    try {
      await this.model.findByIdAndUpdate(updatedEmployee.id, updatedEmployee);
    } catch (err) {
      console.log(err);
    }
  };
  bulkInsert = async (employees: EmployeeI[]) => {
    let notExistingEmployees = await Promise.all(
      employees.map(async (employee) => {
        let status = await this.model.find(employee);

        if (status.length === 0) {
          return employee;
        }
      })
    );
    notExistingEmployees = notExistingEmployees.filter(
      (employee) => employee !== undefined
    );
    this.model.insertMany(notExistingEmployees);
    return notExistingEmployees;
  };
}

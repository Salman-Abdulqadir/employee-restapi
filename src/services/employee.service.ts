import {
  EmployeeSI,
  EmployeeServiceI,
  EmployeeI,
} from "../interfaces/employee.interface";
import mongoose from "mongoose";
import { EmployeeCacheService } from "./employeeCache.service";

export default class EmployeeService implements EmployeeServiceI {
  constructor(
    public model: mongoose.Model<EmployeeSI, any>,
    public employeeCacheService: EmployeeCacheService
  ) {}
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
    // checking if the employee is in the cache
    let employee = await this.employeeCacheService.getEmployee(employeeId);
    if (employee) {
      console.log("From redis");
      return employee;
    }
    employee = await this.model.findById(employeeId);
    if (employee) {
      console.log("from db");
      await this.employeeCacheService.setEmployee(employee);
      return employee;
    }
    throw new Error("Employee not found");
  };
  delete = (id: string): void => {
    return this.model.findOneAndDelete(new mongoose.Types.ObjectId(id));
  };
  update = async (updatedEmployee: EmployeeI) => {
    const employee = await this.model.findByIdAndUpdate(
      updatedEmployee.id,
      updatedEmployee
    );
    if (!employee) throw new Error("Employee not updated");

    // check if the employee is in the cache memory
    const cachedEmployee = await this.employeeCacheService.getEmployee(
      updatedEmployee.id
    );
    if (cachedEmployee) {
      console.log("Updating cached employee");
      this.employeeCacheService.setEmployee(employee);
    }
    return employee;
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

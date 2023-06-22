import { Container } from "inversify";
import { Employee, EmployeeModel } from "./models/Employee";
import EmployeeService from "./services/employee.service";
import EmployeeController from "./controllers/employeeController";
import { Model } from "mongoose";

const container = new Container()

// bindings
container.bind<Model<Employee>>('EmployeeModel').toConstantValue(EmployeeModel)
container.bind<EmployeeService>(EmployeeService).to(EmployeeService)
container.bind<EmployeeController>(EmployeeController).to(EmployeeController);

export default container
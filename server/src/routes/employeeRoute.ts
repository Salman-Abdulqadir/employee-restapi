import { Router } from "express";
import { Container} from "inversify";
import EmployeeController from "../controllers/employeeController";

export class EmployeeRoutes {
  private controller: EmployeeController
  private router: Router

  constructor(container: Container){
    this.controller = container.resolve(EmployeeController)
    this.router = Router()
    this.setRouter()
  }

  private setRouter = () => {
    this.router.get("/employee/", this.controller.getAllEmployees.bind(this.controller));
    this.router.post("/employee/", this.controller.addEmployee.bind(this.controller));
    this.router.delete("/employee/:id", this.controller.deleteEmployee.bind(this.controller));
  }
  public getRouter: () => Router = () => this.router
}


export default EmployeeRoutes












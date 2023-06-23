import { Router } from "express";
import EmployeeController from "../controllers/employeeController";
import EmployeeService from "../services/employee.service";

export default (_employeeService: EmployeeService) => {
  const router = Router();

  const employeeController = new EmployeeController(_employeeService);

  router.get("/employee", employeeController.getAllEmployees);
  router.post("/employee", employeeController.addEmployee);
  router.delete("/employee/:id", employeeController.deleteEmployee);

  return router;
};

// export class Routes {
//   private employeeController: EmployeeControlle;

//   constructor(employeeController: EmployeeController) {
//     this.router = Router();
//     this.setRouter();
//   }

//   private setRouter = () => {
//     this.router.get(
//       "/employee/",
//       this.controller.getAllEmployees.bind(this.controller)
//     );
//     this.router.post(
//       "/employee/",
//       this.controller.addEmployee.bind(this.controller)
//     );
//     this.router.delete(
//       "/employee/:id",
//       this.controller.deleteEmployee.bind(this.controller)
//     );
//   };
//   public getRouter: () => Router = () => this.router;
// }

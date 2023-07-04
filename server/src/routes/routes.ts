import { Router } from "express";
import EmployeeController from "../controllers/employeeController";
import EmployeeService from "../services/employee.service";
import { NotificationController } from "../controllers/notificationController";

export default (_employeeService: EmployeeService) => {
  const router = Router();

  const employeeController = new EmployeeController(_employeeService);
  employeeController.attach(new NotificationController());

  router.route("/employee").get(employeeController.getAllEmployees);
  router.post("/employee", employeeController.addEmployee);
  router.delete("/employee/:id", employeeController.deleteEmployee);

  return router;
};

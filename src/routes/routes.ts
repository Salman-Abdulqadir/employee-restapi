import { Router } from "express";
import EmployeeController from "../controllers/employeeController";
import EmployeeService from "../services/employee.service";
import { NotificationHandler } from "../notification/notificationHandler";
export default (_employeeService: EmployeeService) => {
  const router = Router();

  const employeeController = new EmployeeController(_employeeService);
  employeeController.attach(new NotificationHandler());

  router.route("/employee").get(employeeController.getAllEmployees);
  router.post("/employee", employeeController.addEmployee);
  router.post("/employee/bulk-upload", employeeController.bulkUpload);
  router.patch("/employee", employeeController.updateEmployee);
  router.delete("/employee/:id", employeeController.deleteEmployee);

  return router;
};

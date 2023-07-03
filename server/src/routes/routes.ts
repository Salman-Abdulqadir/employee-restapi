import { Router } from "express";
import EmployeeController from "../controllers/employeeController";
import EmployeeService from "../services/employee.service";
import { NotificationServiceI } from "../interfaces/notification.interface";
import { NotificationController } from "../controllers/notificationController";

export default (
  _employeeService: EmployeeService,
  _notificationService: NotificationServiceI
) => {
  const router = Router();

  const employeeController = new EmployeeController(_employeeService);

  const notificationController = new NotificationController(["email", "fax"]);

  router.route("/employee").get(employeeController.getAllEmployees);
  router.post(
    "/employee",
    employeeController.addEmployee,
    notificationController.notify
  );
  router.delete("/employee/:id", employeeController.deleteEmployee);

  return router;
};

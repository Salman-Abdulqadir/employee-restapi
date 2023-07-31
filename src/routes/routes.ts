import { Router } from "express";
import EmployeeController from "../controllers/employeeController";
import EmployeeService from "../services/employee.service";
import { NotificationHandler } from "../notification/notificationHandler";
import { uploadMiddleware } from "../middleware/upload.middleware";
import { EmployeeCache } from "../services/employeeCache.service";

export default (
  _employeeService: EmployeeService,
  _employeeCache: EmployeeCache
) => {
  const router = Router();
  const employeeController = new EmployeeController(
    _employeeService,
    _employeeCache
  );
  employeeController.attach(new NotificationHandler());

  router.route("/employee").get(employeeController.getAllEmployees);
  router.get("/employee/:id", employeeController.getOneEmployee);
  router.post(
    "/employee/bulk-upload",
    uploadMiddleware,
    employeeController.bulkUpload
  );
  router.post("/employee", employeeController.addEmployee);
  router.patch("/employee", employeeController.updateEmployee);
  router.delete("/employee/:id", employeeController.deleteEmployee);

  return router;
};

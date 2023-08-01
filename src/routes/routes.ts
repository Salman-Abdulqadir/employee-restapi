import { Router } from "express";
import EmployeeController from "../controllers/employeeController";
import EmployeeService from "../services/employee.service";
import { NotificationHandler } from "../notification/notificationHandler";
import { uploadMiddleware } from "../middleware/upload.middleware";

export default (_employeeService: EmployeeService) => {
  const router = Router();
  const employeeController = new EmployeeController(_employeeService);
  employeeController.attach(new NotificationHandler());

  router.route("/employees").get(employeeController.getAllEmployees);
  router.get("/employees/:id", employeeController.getOneEmployee);
  router.post(
    "/employees/bulk-upload",
    uploadMiddleware,
    employeeController.bulkUpload
  );
  router.post("/employees", employeeController.addEmployee);
  router.patch("/employees", employeeController.updateEmployee);
  router.delete("/employees/:id", employeeController.deleteEmployee);

  return router;
};

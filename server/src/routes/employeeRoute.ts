import express from "express";
import {
  getAllEmployees,
  addEmployee,
  deleteEmployee
} from "../controllers/employeeController";

const router = express.Router();

router.get("/get-all", getAllEmployees);
router.post("/add-employee", addEmployee);
router.delete("/delete-employee", deleteEmployee)

export default router;

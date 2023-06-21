import express from "express";
import {
  getAllEmployees,
  addEmployee,
  deleteEmployee
} from "../controllers/employeeController";

const router = express.Router();

router.get("/employee", getAllEmployees);
router.post("/employee", addEmployee);
router.delete("/employee/:id", deleteEmployee)

export default router;

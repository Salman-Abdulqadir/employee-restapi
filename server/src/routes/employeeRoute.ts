import express from "express";
import {
  getAllEmployees,
  addEmployee,
} from "../controllers/employeeController";

const router = express.Router();

router.get("/get-all", getAllEmployees);
router.post("/add-employee", addEmployee);

export default router;

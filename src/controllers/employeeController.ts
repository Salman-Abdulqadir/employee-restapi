import { NextFunction, Request, Response } from "express";
import { Employee } from "../model/Employee";

export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};

export const addEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name;
    const age = parseInt(req.body.age);
    const employee = new Employee({ name, age });
    await employee.save();
    res.json("Employee created succesfully!").status(200);
  } catch (err) {
    next(err);
  }
};

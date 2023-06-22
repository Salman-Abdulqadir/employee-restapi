import { NextFunction, Request, Response } from "express";
import EmployeeService from "../services/employee.service";
import { inject } from "inversify";
import { controller } from "inversify-express-utils";
import { Employee } from "../models/Employee";

@controller("/employee")
export default class EmployeeController {
  private employeeService: EmployeeService;

  constructor(@inject(EmployeeService) employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  public getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const employees = await this.employeeService.get();
      res.status(200).json(employees);
    } catch (err) {
      next(err);
    }
  };

  public addEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const name: string = req.body.name;
      const age: number = parseInt(req.body.age);

      this.employeeService.post({ name, age });

      res.json("Employee created succesfully!").status(200);
    } catch (err) {
      next(err);
    }
  };
  public deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const employee_id: string = req.params.id;
      await this.employeeService.delete(employee_id);
      res.json(`Employee with Id ${employee_id} is deleted!`).status(201);
    } catch (err) {
      next(err);
    }
  };
}

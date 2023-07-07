import { NextFunction, Request, Response } from "express";
import EmployeeService from "../services/employee.service";
import { ObserverI, SubjectI } from "../interfaces/employee.interface";
import { ValidateEmployee } from "../middleware/validateEmployeeInfo";

export default class EmployeeController implements SubjectI {
  private employeeService: EmployeeService;
  private subscribers: ObserverI[] = [];

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }
  public attach = (observer: ObserverI) => {
    if (!this.subscribers.includes(observer)) this.subscribers.push(observer);
  };
  public detach = (observer: ObserverI) => {
    if (this.subscribers.includes(observer))
      this.subscribers.splice(this.subscribers.indexOf(observer), 1);
  };
  public notify = (employee: any) => {
    if (this.subscribers.length > 0)
      this.subscribers.forEach((subscriber) => subscriber.update(employee));
  };
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
      const validation = ValidateEmployee(req);

      if (!validation.status)
        return res.status(400).json({ message: validation.message });

      const employee = {
        name: req.body.name,
        age: parseInt(req.body.age),
        notificationPreference: req.body.notificationPreference,
      };

      this.employeeService.post(employee);

      // notifying all the observers that an employee is created
      this.notify(employee);

      res.status(201).json({ message: "Employee Added" });
    } catch (err) {
      next(err);
    }
  };
  public updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updatedEmployee = {
        id: req.body.id,
        name: req.body.name,
        age: parseInt(req.body.age),
        notificationPreference: req.body.notificationPreference,
      };
      await this.employeeService.update(updatedEmployee);
      res.status(200).json(`Employee with id ${updatedEmployee.id} updated`);
    } catch (err) {
      console.log(err);
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

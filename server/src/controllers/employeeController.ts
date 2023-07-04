import { NextFunction, Request, Response } from "express";
import EmployeeService from "../services/employee.service";
import { NotificationController } from "./notificationController";
import { ObserverI, SubjectI } from "../interfaces/employee.interface";

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
  public notify = () => {
    if (this.subscribers.length > 0)
      this.subscribers.forEach((subscriber) => subscriber.update(this));
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
      const name: string = req.body.name;
      const age: number = parseInt(req.body.age);

      this.employeeService.post({ name, age });
      this.notify();
      res.status(201).json({ message: "Employee added" });
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

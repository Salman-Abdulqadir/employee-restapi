import { NextFunction, Request, Response } from "express";
import EmployeeService from "../services/employee.service";
import {
  EmployeeI,
  ObserverI,
  SubjectI,
} from "../interfaces/employee.interface";
import { EmployeeCache } from "../middleware/cache.middleware";
import { ValidateEmployee } from "../middleware/validateEmployeeInfo";
import { processCSV } from "../middleware/process-csv.middleware";

export default class EmployeeController implements SubjectI {
  private employeeService: EmployeeService;
  private employeeCache: EmployeeCache;
  private subscribers: ObserverI[] = [];

  constructor(employeeService: EmployeeService, employeeCache: EmployeeCache) {
    this.employeeService = employeeService;
    this.employeeCache = employeeCache;
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
  public getOneEmployee = async (req: Request, res: Response) => {
    try {
      const employeeId = req.params.id;
      if (employeeId === "") throw new Error("Employee id is empty");

      // checks in the cache first
      let employee = await this.employeeCache.getEmployee(employeeId);
      console.log(employee);
      // if the employee is not in the cache it will bring it from the db
      // and save it in the cache
      if (!employee) {
        employee = await this.employeeService.getOne(employeeId);
        console.log("from db");
        if (!employee)
          throw new Error(`Employee with id - ${employeeId} not found`);
        await this.employeeCache.setEmployee(employee);
      }

      res.status(200).json(employee);
    } catch (err: any) {
      res.status(400).json({ message: err?.message });
    }
  };
  public addEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const employee = {
        name: req.body.name,
        age: parseInt(req.body.age),
        salary: parseFloat(req.body.salary),
        notificationPreference: req.body.notificationPreference,
      };

      const validation = ValidateEmployee(employee);

      if (!validation.status) throw new Error(validation.message);

      this.employeeService.post(employee);

      // notifying all the observers that an employee is created
      this.notify(employee);

      res.status(201).json({ message: "Employee Added" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
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
        salary: parseFloat(req.body.salary),
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
  public bulkUpload = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // taking the first file from the form-data files
      const file = (req.files as Express.Multer.File[])[0];

      if (!file) throw new Error();

      // checking if the csv file valid and get the employees from it
      const employees = await processCSV(file.buffer);

      // if the status is false, some fields are not correct
      if (!employees.status)
        return res.status(400).json({ message: employees.content });

      // if the employees are successfully processed, they will be inserted
      const insertedEmployees = await this.employeeService.bulkInsert(
        employees.content
      );
      if (insertedEmployees.length < 1)
        return res
          .status(409)
          .json({ message: "Employees already exist in the database" });

      // notify the observers that employees were created
      this.notify(insertedEmployees);

      res.status(201).json({ insertedEmployees });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error uploading and processing the file" });
    }
  };
}

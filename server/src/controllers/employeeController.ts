import { NextFunction, Request, Response } from "express";
import EmployeeService from "../services/employee.service";
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
  public notify = (employee: any) => {
    if (this.subscribers.length > 0)
      this.subscribers.forEach((subscriber) => subscriber.update(employee));
  };
  /**
   * @swagger
   * tags:
   *   name: Employee
   *   description: Employee management
   */

  /**
   * @swagger
   * /api/v1/employee:
   *   get:
   *     summary: Get all employees
   *     tags: [Employee]
   *     responses:
   *       200:
   *         description: OK
   *       403:
   *         description: Forbidden (authentication key is wrong)
   */
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
  /**
   * @swagger
   * /api/v1/employee:
   *   post:
   *     summary: Create a new employee
   *     tags: [Employee]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserInput'
   *     responses:
   *       201:
   *         description: Created
   *       400:
   *         description: Bad Request
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     Employee:
   *       type: object
   *       properties:
   *         name:
   *           type: string
   *         age:
   *           type: number
   *       required:
   *         - name
   *         - age
   */
  public addEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const name: string = req.body.name;
      const age: number = parseInt(req.body.age);
      const employee = {
        name,
        age,
        notificationPreference: req.body.notificationPreference,
      };

      this.employeeService.post({ name, age });
      this.notify(employee);
      res.status(201).json({ message: "Employee added" });
    } catch (err) {
      next(err);
    }
  };
  /**
   * @swagger
   * api/v1/employee/{id}:
   *   delete:
   *     summary: Delete an employee
   *     tags: [Employee]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the employee to delete
   *     responses:
   *       204:
   *         description: No Content
   *       404:
   *         description: Employee not found
   */
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

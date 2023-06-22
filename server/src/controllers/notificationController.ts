import { NextFunction, Request, Response } from "express";
import { Employee } from "../models/Employee";

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
    const name: string = req.body.name;
    const age: number = parseInt(req.body.age);
    const employee = new Employee({ name, age });
    await employee.save();
    res.json("Employee created succesfully!").status(200);
  } catch (err) {
    next(err);
  }
};

export const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const employee_id: string = req.params.id;
    await Employee.findByIdAndDelete(employee_id);
    res.json(`Employee with Id ${employee_id} is deleted!`).status(201);
  }
  catch(err){
    next(err)
  }
}

// export const updateEmployee = async(req: Request, res: Response, next: NextFunction) => {
//   try{
    
//   }catch(err){
//     console.log(err)
//   }
// }
import { Request, Response, NextFunction } from "express";
import { RegisteredNotification } from "../notification/notificationFactory";

export const ValidateEmployee = (
  req: Request
): { status: boolean; message: string } => {
  const employee = {
    name: req.body.name,
    age: parseInt(req.body.age),
    notificationPreference: req.body.notificationPreference,
  };

  // checking if the name is valid
  if (employee.name.length < 1)
    return { status: false, message: `Employee name is not valid` };

  // checking if the age is valid
  if (employee.age < 1)
    return { status: false, message: `Employee age is not valid` };

  // checking if the notification preferences are available
  let checkingServices = RegisteredNotification.includes(
    employee.notificationPreference
  );
  if (!checkingServices.status)
    return {
      status: false,
      message: `Some of the services are not registered: ${checkingServices.unavailableServices}`,
    };
  return { status: true, message: "valid" };
};

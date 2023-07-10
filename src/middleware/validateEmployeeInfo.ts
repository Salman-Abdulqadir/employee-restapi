import { RegisteredNotification } from "../notification/notificationFactory";
import { EmployeeI } from "../interfaces/employee.interface";

export const ValidateEmployee = (
  employee: any
): { status: boolean; message: string } => {
  // checking if the name is valid
  if (employee.name.length < 1)
    return { status: false, message: `Employee name is not valid` };

  // checking if the age is valid
  if (employee.age < 1)
    return { status: false, message: `Employee age is not valid` };

  // checking if the age is valid
  if (employee.salary < 1)
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

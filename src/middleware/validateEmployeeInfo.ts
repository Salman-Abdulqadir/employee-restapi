import { RegisteredNotification } from "../notification/notificationFactory";

export const ValidateEmployee = (
  employee: any
): { status: boolean; message: string } => {
  // checking if the name is valid
  if (!employee.name || employee.name.length < 1)
    return { status: false, message: `Employee name is not valid` };

  // checking if the age is valid
  if (isNaN(employee.age) || employee.age < 1)
    return { status: false, message: `Employee age is not valid` };

  // checking if the salary is valid
  if (isNaN(employee.salary) || employee.salary < 1)
    return { status: false, message: `Employee salary is not valid` };

  // checking if the notification preferences are available
  if (
    employee.notificationPreference &&
    employee.notificationPreference.length === 0
  ) {
    return {
      status: false,
      message: `At least one notification preference should be provided`,
    };
  }
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

import { EmployeeI, ObserverI } from "../interfaces/employee.interface";
import { NotificationFactory } from "./notificationFactory";

export class NotificationHandler implements ObserverI {
  public notify = (preferences: string[]) => {
    preferences.forEach((preference) => {
      preference = preference.toUpperCase();
      try {
        const service = NotificationFactory.getService(preference);
        service?.notify();
      } catch (err) {
        console.log(err);
      }
    });
  };
  public update = (employees: EmployeeI | EmployeeI[]) => {
    try {
      if (employees instanceof Array) {
        employees.forEach((employee) => {
          const notificationPreference = employee.notificationPreference;
          if (notificationPreference.length > 0)
            this.notify(notificationPreference);
        });
      } else {
        const { notificationPreference } = employees;
        if (notificationPreference.length > 0)
          this.notify(notificationPreference);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

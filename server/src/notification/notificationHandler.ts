import { EmployeeI, ObserverI } from "../interfaces/employee.interface";
import { NotificationFactory } from "./notificationFactory";

export class NotificationHandler implements ObserverI {
  public notify = (preferences: string[]) => {
    preferences.forEach((preference) => {
      preference = preference.toUpperCase();
      try {
        const service = NotificationFactory.getService(preference);
        if (!service)
          throw new Error(`${preference} service is not registered`);
        service.notify();
      } catch (err) {
        console.log(err);
      }
    });
  };
  public update = (employee: EmployeeI) => {
    const { notificationPreference } = employee;
    if (notificationPreference.length > 0) this.notify(notificationPreference);
  };
}

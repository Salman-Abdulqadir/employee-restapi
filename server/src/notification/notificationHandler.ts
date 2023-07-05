import { NotificationServiceI } from "../interfaces/notification.interface";
import { ObserverI } from "../interfaces/employee.interface";
import { NotificationService } from "./notification.enum";

export class NotificationHandler implements ObserverI {
  private notficationServices: { [key: string]: NotificationServiceI };

  constructor() {
    this.notficationServices = {};
    Object.values(NotificationService).forEach((service) => {
      this.notficationServices[service.name] = service.service;
    });
  }
  public notify = (preferences: string[]) => {
    preferences.forEach((preference) => {
      preference = preference.toUpperCase();
      try {
        if (!(preference in this.notficationServices))
          throw "Notification Service Doesn't exist!";
        this.notficationServices[preference].notify();
      } catch (err) {
        console.log(err);
      }
    });
  };
  public update = (employee: any) => {
    const { notificationPreference } = employee;
    this.notify(notificationPreference);
  };
}

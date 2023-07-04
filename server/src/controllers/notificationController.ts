import { NextFunction, Request, Response } from "express";
import { NotificationServiceI } from "../interfaces/notification.interface";

// notification services
import { EmailNotification } from "../services/email.service";
import { SmsNotification } from "../services/sms.service";
import { FaxNotification } from "../services/fax.service";
import { ObserverI, SubjectI } from "../interfaces/employee.interface";

class NotificationServices {
  public static emailNotification: NotificationServiceI =
    new EmailNotification();
  public static smsNotification: NotificationServiceI = new SmsNotification();
  public static faxNotification: NotificationServiceI = new FaxNotification();
}

export class NotificationController implements ObserverI {
  private notficationServices: NotificationServiceI[];

  constructor() {
    this.notficationServices = Object.values(NotificationServices);
  }
  public notify = () => {
    this.notficationServices.forEach((service) => service.notify());
  };
  public update = (subject: SubjectI) => {
    this.notify();
  };
}

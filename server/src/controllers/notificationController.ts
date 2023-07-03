import { Request, Response } from "express";
import { NotificationServiceI } from "../interfaces/notification.interface";
import { EmailNotification } from "../services/email.service";
import { SmsNotification } from "../services/sms.service";
import { FaxNotification } from "../services/fax.service";

export class NotificationController {
  private notificationServices: NotificationServiceI[];

  constructor(notificationPreference: string[]) {
    this.notificationServices = notificationPreference.map((service) => {
      switch (service) {
        case "email":
          return new EmailNotification();
        case "fax":
          return new FaxNotification();
        case "sms":
          return new SmsNotification();
        default:
          return new EmailNotification();
      }
    });
  }
  public notify = (req: Request, res: Response) => {
    this.notificationServices.forEach((service) => {
      service.notify();
    });
    res.json("Employee created succesfully!").status(200);
  };
}

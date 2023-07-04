import { NextFunction, Request, Response } from "express";
import { NotificationServiceI } from "../interfaces/notification.interface";

// notification services
import { EmailNotification } from "../services/email.service";
import { SmsNotification } from "../services/sms.service";
import { FaxNotification } from "../services/fax.service";
import { WhatsAppNotification } from "../services/whatsapp.service";

class NotificationServices {
  static emailNotification: NotificationServiceI = new EmailNotification();
  static smsNotification: NotificationServiceI = new SmsNotification();
  static faxNotification: NotificationServiceI = new FaxNotification();
  static whatsappNotification: NotificationServiceI =
    new WhatsAppNotification();
}

export class NotificationController {
  private notficationServices: NotificationServiceI[];

  constructor() {
    this.notficationServices = Object.values(NotificationServices);
  }
  public notify = () => {
    this.notficationServices.forEach((service) => service.notify());
  };
}

export const notificationHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  new NotificationController().notify();
};

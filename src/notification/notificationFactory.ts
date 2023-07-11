import { NotificationServiceI } from "../interfaces/notification.interface";

// notification services
import { EmailNotification } from "../services/notification/email.service";
import { SmsNotification } from "../services/notification/sms.service";
import { FaxNotification } from "../services/notification/fax.service";
import { WhatsAppNotification } from "../services/notification/whatsapp.service";

export class RegisteredNotification {
  public static emailNotification = new RegisteredNotification(
    "EMAIL",
    new EmailNotification()
  );
  public static faxNotification = new RegisteredNotification(
    "FAX",
    new FaxNotification()
  );
  public static smsNotification = new RegisteredNotification(
    "SMS",
    new SmsNotification()
  );
  public static whatNotification = new RegisteredNotification(
    "WHATSAPP",
    new WhatsAppNotification()
  );

  readonly name;
  readonly service;

  constructor(name: string, service: NotificationServiceI) {
    this.name = name;
    this.service = service;
  }

  static get = (serviceName: string): NotificationServiceI | undefined => {
    let notification = Object.values(RegisteredNotification).find(
      (service) => service.name === serviceName
    );
    if (!notification) return;
    return notification.service;
  };
  static includes = (
    serviceNames: string[]
  ): { status: boolean; unavailableServices: string[] } => {
    let unavailableServices: string[] = [];

    for (let service of serviceNames) {
      if (!RegisteredNotification.get(service.toUpperCase()))
        unavailableServices.push(service);
    }

    if (unavailableServices.length > 0)
      return { status: false, unavailableServices };
    return { status: true, unavailableServices: [] };
  };
}

export class NotificationFactory {
  static getService = (
    preference: string
  ): NotificationServiceI | undefined => {
    try {
      const targetService = RegisteredNotification.get(preference);
      return targetService;
    } catch (err) {
      console.log(err);
    }
  };
}

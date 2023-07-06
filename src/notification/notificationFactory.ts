import { NotificationServiceI } from "../interfaces/notification.interface";

// notification services
import { EmailNotification } from "../services/notification/email.service";
import { SmsNotification } from "../services/notification/sms.service";
import { FaxNotification } from "../services/notification/fax.service";

class NotificationEnum {
  public static emailNotification = new NotificationEnum(
    "EMAIL",
    new EmailNotification()
  );
  public static faxNotification = new NotificationEnum(
    "FAX",
    new FaxNotification()
  );
  public static smsNotification = new NotificationEnum(
    "SMS",
    new SmsNotification()
  );

  readonly name;
  readonly service;

  constructor(name: string, service: NotificationServiceI) {
    this.name = name;
    this.service = service;
  }
}

// const NotificationEnum: { [keys: string]: NotificationServiceI } = {
//   EMAIL: new EmailNotification(),
//   FAX: new FaxNotification(),
//   SMS: new SmsNotification(),
// };

export class NotificationFactory {
  static getService = (
    serviceName: string
  ): NotificationServiceI | undefined => {
    try {
      const targetService = Object.values(NotificationEnum).find(
        (service) => service.name === serviceName
      );
      if (!targetService) return;
      return targetService.service;
    } catch (err) {
      console.log(err);
    }
    // return NotificationEnum[serviceName];
  };
}

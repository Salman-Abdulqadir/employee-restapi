import { NotificationServiceI } from "../interfaces/notification.interface";

// notification services
import { EmailNotification } from "../services/email.service";
import { SmsNotification } from "../services/sms.service";
import { FaxNotification } from "../services/fax.service";

export class NotificationService {
  public static emailNotification = new NotificationService(
    "EMAIL",
    new EmailNotification()
  );
  public static faxNotification = new NotificationService(
    "FAX",
    new FaxNotification()
  );
  public static SmsNotification = new NotificationService(
    "SMS",
    new SmsNotification()
  );

  constructor(name: string, service: NotificationServiceI) {
    this.name = name;
    this.service = service;
  }
  readonly name;
  readonly service;
}

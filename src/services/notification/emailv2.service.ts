import { NotificationServiceI } from "../../interfaces/notification.interface";
import { EmailNotification } from "./email.service";

export class EmailNotificationV2
  extends EmailNotification
  implements NotificationServiceI
{
  notify() {
    super.notify();
    console.log("email sent");
  }
}

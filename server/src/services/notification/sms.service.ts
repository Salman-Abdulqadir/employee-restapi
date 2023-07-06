import { NotificationServiceI } from "../../interfaces/notification.interface";

export class SmsNotification implements NotificationServiceI {
  public notify = () => {
    console.log("sms notification sent");
  };
}

import { NotificationServiceI } from "../../interfaces/notification.interface";

export class WhatsAppNotification implements NotificationServiceI {
  public notify = () => {
    console.log("whatsapp notification sent");
  };
}

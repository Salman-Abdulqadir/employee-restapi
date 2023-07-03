import { NotificationServiceI } from "../interfaces/notification.interface";

export class EmailNotification implements NotificationServiceI {
  notify() {
    console.log("email notification");
  }
}

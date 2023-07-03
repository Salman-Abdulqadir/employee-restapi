import { NotificationServiceI } from "../interfaces/notification.interface";

export class FaxNotification implements NotificationServiceI {
  notify() {
    console.log("fax notification");
  }
}

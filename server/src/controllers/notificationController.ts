import { Request, Response } from "express";
import { NotificationServiceI } from "../interfaces/notification.interface";

export class NotificationController {
  private notificationService: NotificationServiceI;

  constructor(notficationService: NotificationServiceI) {
    this.notificationService = notficationService;
  }
  public notify = (req: Request, res: Response) => {
    this.notificationService.notify();
    res.json("Employee created succesfully!").status(200);
  };
}

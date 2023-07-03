import express, { Request, Response, NextFunction } from "express";
import { environment } from "./config";

import routes from "./routes/routes";
import mongoose from "mongoose";
import { EmployeeModel } from "./models/Employee";
import EmployeeService from "./services/employee.service";
import { generateToken, isAuth } from "./middleware/isAuth.middleware";
import { EmailNotification } from "./services/email.service";
import { SmsNotification } from "./services/sms.service";
import { FaxNotification } from "./services/fax.service";

const app = express();

// getting the db url
const db_url =
  environment.DB_URL ||
  "mongodb+srv://salman:XJ0fFNbROVRE610s@cluster0.qijjvid.mongodb.net/employees?retryWrites=true&w=majority";
const port = environment.PORT || 3000;

// body parser
app.use(express.json());

app.use("/api/v1/generate-token", generateToken);

app.use(isAuth);

app.use(
  "/api/v1",
  routes(new EmployeeService(EmployeeModel), new FaxNotification())
);

// 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>404: Page Not found<h1/>").status(404);
});

(async () => {
  try {
    if (db_url === "") throw "The database link is empty!";
    await mongoose.connect(db_url);

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();

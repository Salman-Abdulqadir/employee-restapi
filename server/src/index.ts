import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";

import routes from "./routes/routes";
import mongoose from "mongoose";
import { isAuth } from "./middleware/isAuth.middleware";
import EmployeeController from "./controllers/employeeController";
import EmployeeService from "./services/employee.service";

const app = express();

// getting the db url
const db_url: string =
  process.env.DB_URL ||
  "mongodb+srv://salman:XJ0fFNbROVRE610s@cluster0.qijjvid.mongodb.net/employees?retryWrites=true&w=majority";

// body parser
app.use(express.json());

app.use("/api/v1", routes(new EmployeeService()));
// 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>404: Page Not found<h1/>").status(404);
});

(async () => {
  try {
    if (db_url === "") throw "The database link is empty!";
    await mongoose.connect(db_url);

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server started on port ${process.env.PORT || 3000}`);
    });
  } catch (err) {
    console.log(err);
  }
})();

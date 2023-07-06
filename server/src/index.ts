import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

//swagger
import { configureSwagger } from "./swagger";

import routes from "./routes/routes";

// environment variables
import { environment } from "./config";

// employee model and service
import { EmployeeModel } from "./models/Employee";
import EmployeeService from "./services/employee.service";

// middlewares
import { generateToken, isAuth } from "./middleware/isAuth.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// swagger
configureSwagger(app);

// getting the db url and port number environment variables
const db_url = environment.DB_URL || "";
const port = environment.PORT || 3000;

// body parser
app.use(express.json());

// generate token middleware
app.use("/api/v1/generate-token", generateToken);

// authentication middleware
// app.use(isAuth);

// employee routes
app.use("/api/v1", routes(new EmployeeService(EmployeeModel)));

// 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>404: Page Not found<h1/>").status(404);
});

// error handler
app.use(errorHandler);

const start = async () => {
  try {
    if (db_url === "") throw "The database link is empty!";
    await mongoose.connect(db_url);
  } catch (err) {
    console.log(err);
  }
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start();

import express, { Request, Response, NextFunction } from "express";
import router from "./routes/employeeRoute";
import mongoose from "mongoose";

const app = express();

// getting the db url
const db_url: string = process.env.DB_URL || "mongodb://localhost:27017/employees";

// body parser
app.use(express.json());

// adding route
app.use("/employee", router);

// 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>404: Page Not found<h1/>").status(404);
});

// starting the server
(async () => {
  try {
    if (db_url === "")
      throw "The database link is empty!"
    await mongoose.connect(db_url);
    app.listen(4300, () => console.log("using 4300..."));
  } catch (err) {
    console.log(err);
  }
})();

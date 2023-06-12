import express, { Request, Response, NextFunction } from "express";
import router from "./routes/employeeRoute";
import mongoose from "mongoose";

const app = express();
const db_url: string = process.env.DB_URL || "";
app.use(express.json());

app.use("/employee", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>Page Not found<h1/>").status(404);
});

(async () => {
  try {
    await mongoose.connect(db_url);
    app.listen(4300, () => console.log("using 4300..."));
  } catch (err) {
    console.log(err);
  }
})();

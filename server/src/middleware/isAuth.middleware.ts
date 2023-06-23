import { Request, Response, NextFunction } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { key } = req.params;
  if (key === "password") next();
  else res.status(401).send("Access forbidden");
};

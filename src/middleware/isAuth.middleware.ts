import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { privateKey, publicKey } from "./keyHandler";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, publicKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.body.user = user;
    next();
  });
};

export const generateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signOptions: jwt.SignOptions = {
    expiresIn: "12h",
    algorithm: "RS256",
  };
  const token = jwt.sign({ user: "someone" }, privateKey, signOptions);
  res.status(201).json(token);
};

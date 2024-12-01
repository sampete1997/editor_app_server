import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

// Middleware to handle validation results
export const handleValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array()?.map((ele) => ele.msg) });
  } else {
    next();
  }
};

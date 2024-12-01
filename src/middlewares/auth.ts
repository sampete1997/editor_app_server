import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';


dotenv.config()
export const authenticate = (req: any, res: Response, next: NextFunction): any => {
  try {
    const secret_key: any = process.env.AUTH_SECRET_KEY;
    const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from the Authorization header
console.log('req.headers', token);
    if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    const decoded = jwt.verify(token, secret_key); // Verify the token using your secret
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

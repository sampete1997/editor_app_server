import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import * as dotenv from 'dotenv';
import { encryptData } from "../utils/crypto";

dotenv.config()

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    const date = new Date()
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      email,
      created_at: date.toISOString(),
    });
    const userExist = await User.findOne({ email });
    console.log("userExist", userExist);
    if (userExist) {
      res.status(201).json({ status:200,message: `${email} already registered!` });
    } else {
      await user.save();
      res.status(201).json({status:200, message: "User registered successfully!" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status:404,error: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status:404,error: "Invalid credentials!" });
    }

    const payload = {
      metaData: encryptData( JSON.stringify({id: user._id, username: user.username}) ),
  
    }

    const token = jwt.sign(payload, process.env.AUTH_SECRET_KEY as string, {expiresIn: '1d'});
    res.status(200).json({status:200, token, username : user.username, email});
  } catch (err: any) {
    res.status(500).json({status:500, error: err.message });
  }
}

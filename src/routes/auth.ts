import express from "express";
import {
  logInValidate,
  validateRegistrationUser,
} from "../controllers/validation/authValidation";
import { register, login } from "../controllers/auth";
import { handleValidation } from "../middlewares/validater";

const router = express.Router();

router.post("/register", validateRegistrationUser, handleValidation, register);
router.post("/login", logInValidate, handleValidation, login);

export default router;

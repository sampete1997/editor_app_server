"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authValidation_1 = require("../controllers/validation/authValidation");
const auth_1 = require("../controllers/auth");
const validater_1 = require("../middlewares/validater");
const router = express_1.default.Router();
router.post("/register", authValidation_1.validateRegistrationUser, validater_1.handleValidation, auth_1.register);
router.post("/login", authValidation_1.logInValidate, validater_1.handleValidation, auth_1.login);
exports.default = router;

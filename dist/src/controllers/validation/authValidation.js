"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInValidate = exports.validateRegistrationUser = void 0;
const express_validator_1 = require("express-validator");
// Middleware for validation
exports.validateRegistrationUser = [
    (0, express_validator_1.body)('username')
        .isAlphanumeric().withMessage('Username must be alphanumeric.')
        .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters.')
        .notEmpty().withMessage('Username is required.'),
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('Please enter a valid email address.')
        .notEmpty().withMessage('Email is required.'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter.')
        .matches(/[0-9]/).withMessage('Password must contain at least one number.')
        .notEmpty().withMessage('Password is required.')
];
exports.logInValidate = [
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('Please enter a valid email address.')
        .notEmpty().withMessage('Email is required.'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter.')
        .matches(/[0-9]/).withMessage('Password must contain at least one number.')
        .notEmpty().withMessage('Password is required.')
];
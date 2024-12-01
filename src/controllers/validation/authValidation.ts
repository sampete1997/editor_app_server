import { body, validationResult }  from 'express-validator';

// Middleware for validation
export const validateRegistrationUser = [
  body('username')
    .isAlphanumeric().withMessage('Username must be alphanumeric.')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters.')
    .notEmpty().withMessage('Username is required.'),

  body('email')
    .isEmail().withMessage('Please enter a valid email address.')
    .notEmpty().withMessage('Email is required.'),

  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter.')
    .matches(/[0-9]/).withMessage('Password must contain at least one number.')
    .notEmpty().withMessage('Password is required.')
];

export const logInValidate = [

  body('email')
    .isEmail().withMessage('Please enter a valid email address.')
    .notEmpty().withMessage('Email is required.'),

  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter.')
    .matches(/[0-9]/).withMessage('Password must contain at least one number.')
    .notEmpty().withMessage('Password is required.')
];



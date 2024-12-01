"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidation = void 0;
const express_validator_1 = require("express-validator");
// Middleware to handle validation results
const handleValidation = (req, res, next) => {
    var _a;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: (_a = errors.array()) === null || _a === void 0 ? void 0 : _a.map((ele) => ele.msg) });
    }
    else {
        next();
    }
};
exports.handleValidation = handleValidation;

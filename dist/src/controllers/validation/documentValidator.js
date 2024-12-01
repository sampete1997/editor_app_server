"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateOnlyDoc = exports.validateGetDoc = exports.validateVersionUpdateDoc = exports.validateNewDoc = void 0;
const express_validator_1 = require("express-validator");
exports.validateNewDoc = [
    (0, express_validator_1.body)("content")
        .isString()
        .withMessage("content must be string")
        .notEmpty()
        .withMessage("content is required."),
    (0, express_validator_1.body)("title")
        .isString()
        .withMessage("title must be string")
        .notEmpty()
        .withMessage("title is required."),
    (0, express_validator_1.body)("collaboration")
        .isArray()
        .withMessage("collaboration must be Array")
        .notEmpty()
        .withMessage("collaboration is required."),
    (0, express_validator_1.body)("created_by")
        .isEmail()
        .withMessage("created_by must be Email")
        .notEmpty()
        .withMessage("created_by is required."),
];
exports.validateVersionUpdateDoc = [
    (0, express_validator_1.body)("content")
        .isString()
        .withMessage("content must be string")
        .notEmpty()
        .withMessage("content is required."),
    (0, express_validator_1.body)("title")
        .isLength({ min: 0, max: 50 })
        .withMessage("title must be between 3 and 50 characters.")
        .isString()
        .withMessage("title must be string")
        .notEmpty()
        .withMessage("title is required."),
    (0, express_validator_1.body)("parent_id")
        .isLength({ min: 0, max: 50 })
        .withMessage("parent_id must be between 3 and 50 characters.")
        .isString()
        .withMessage("parent_id must be string")
        .notEmpty()
        .withMessage("parent_id is required."),
    (0, express_validator_1.body)("collaboration")
        .isArray()
        .withMessage("collaboration must be Array")
        .notEmpty()
        .withMessage("collaboration is required."),
    (0, express_validator_1.body)("created_by")
        .isEmail()
        .withMessage("created_by must be Email")
        .notEmpty()
        .withMessage("created_by is required."),
    (0, express_validator_1.body)("created_at")
        .isString()
        .withMessage("isString must be string")
        .notEmpty()
        .withMessage("isString is required."),
    (0, express_validator_1.body)("last_updated_by")
        .isEmail()
        .withMessage("last_updated_by must be Email")
        .notEmpty()
        .withMessage("last_updated_by is required."),
];
exports.validateGetDoc = [
    (0, express_validator_1.body)("id").optional().isString().withMessage("id must be string"),
    (0, express_validator_1.body)("parent_id")
        .optional()
        .isString()
        .withMessage("parent_id must be string"),
];
exports.validateUpdateOnlyDoc = [
    (0, express_validator_1.body)("id").optional().isString().withMessage("id must be string"),
    (0, express_validator_1.body)("content")
        .isString()
        .withMessage("content must be string")
        .notEmpty()
        .withMessage("content is required."),
    (0, express_validator_1.body)("title")
        .isLength({ min: 0, max: 50 })
        .withMessage("title must be between 3 and 50 characters.")
        .isString()
        .withMessage("title must be string")
        .optional(),
    (0, express_validator_1.body)("collaboration")
        .isArray()
        .withMessage("collaboration must be Array")
        .optional(),
    (0, express_validator_1.body)("last_updated_by")
        .isEmail()
        .withMessage("last_updated_by must be Email")
        .optional(),
];

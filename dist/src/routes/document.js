"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const documents_1 = require("../controllers/documents");
const auth_1 = require("../middlewares/auth");
const validater_1 = require("../middlewares/validater");
const documentValidator_1 = require("../controllers/validation/documentValidator");
const router = express_1.default.Router();
router.post("/createDoc", auth_1.authenticate, documentValidator_1.validateNewDoc, validater_1.handleValidation, documents_1.createDoc);
router.post("/createNewVersionDoc", auth_1.authenticate, documentValidator_1.validateVersionUpdateDoc, validater_1.handleValidation, documents_1.createVersionUpdateDoc);
router.get("/getdocument", auth_1.authenticate, documentValidator_1.validateGetDoc, validater_1.handleValidation, documents_1.getDocument);
router.put("/updateDocument", auth_1.authenticate, documentValidator_1.validateUpdateOnlyDoc, validater_1.handleValidation, documents_1.updateDocument);
exports.default = router;

import express from "express";

import {
  createDoc,
  createVersionUpdateDoc,
  getDocument,
  updateDocument,
} from "../controllers/documents";
import { authenticate } from "../middlewares/auth";
import { handleValidation } from "../middlewares/validater";
import {
    validateVersionUpdateDoc,
  validateGetDoc,
  validateNewDoc,
  validateUpdateOnlyDoc,
} from "../controllers/validation/documentValidator";
const router = express.Router();

router.post(
  "/createDoc",
  authenticate,
  validateNewDoc,
  handleValidation,
  createDoc
);

router.post(
    "/createNewVersionDoc",
    authenticate,
    validateVersionUpdateDoc,
    handleValidation,
    createVersionUpdateDoc
  );

router.get(
  "/getdocument",
  authenticate,
  validateGetDoc,
  handleValidation,
  getDocument
);

router.put("/updateDocument", authenticate, validateUpdateOnlyDoc,handleValidation, updateDocument);

export default router;

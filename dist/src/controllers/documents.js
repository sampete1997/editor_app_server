"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCurrentDocument = exports.updateDocument = exports.getDocument = exports.createVersionUpdateDoc = exports.createDoc = void 0;
const Document_1 = __importDefault(require("../models/Document"));
const crypto_1 = require("../utils/crypto");
const createDoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, title, created_by, collaboration } = req.body;
    try {
        const date = new Date();
        const new_parent_id = (0, crypto_1.generateUniqueId)(created_by);
        const document = new Document_1.default({
            content,
            title,
            version: 1,
            created_at: date.toISOString(),
            created_by,
            collaboration,
            parent_id: new_parent_id,
            last_updated_by: created_by,
            last_updated_at: date.toISOString(),
        });
        console.log("doc", document);
        const result = yield document.save();
        return res.status(201).json({
            status: 201,
            message: "document created successfully!",
            docs: result,
        });
    }
    catch (err) {
        res.status(500).json({ status: 500, error: err.message });
    }
});
exports.createDoc = createDoc;
const createVersionUpdateDoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, title, version = 1, created_by, created_at, collaboration, parent_id, last_updated_by, } = req.body;
    try {
        const date = new Date();
        let new_parent_id = parent_id;
        const prev_doc = yield Document_1.default.findOne({ parent_id })
            .sort({ version: -1 }) // Get the latest version
            .exec();
        if (!prev_doc) {
            return res
                .status(404)
                .json({ status: 404, message: "parent_id of doc not found!" });
        }
        const version_update = ((prev_doc === null || prev_doc === void 0 ? void 0 : prev_doc.version) || version) + 1;
        console.log("collaboration", collaboration);
        const document = new Document_1.default({
            content,
            title,
            version: version_update,
            created_by: created_by,
            created_at: created_at,
            collaboration,
            parent_id: new_parent_id,
            last_updated_by,
            last_updated_at: date.toISOString(),
        });
        console.log("docNew", document);
        const result = yield document.save();
        res.status(201).json({
            status: 201,
            message: "new doc version created successfully!",
            docs: result,
        });
    }
    catch (err) {
        res.status(500).json({ status: 500, error: err.message });
    }
});
exports.createVersionUpdateDoc = createVersionUpdateDoc;
const getDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, parent_id } = req.query;
    const filter = {};
    if (id)
        filter["_id"] = id;
    if (parent_id)
        filter["parent_id"] = parent_id;
    try {
        const documents = yield Document_1.default.find(filter, { __v: 0 });
        if (!documents) {
            return res.status(404).json({ status: 404, error: "Document not found" });
        }
        res.json({
            total: documents.length,
            data: documents,
        });
    }
    catch (err) {
        res.status(500).json({ status: 500, error: err.message });
    }
});
exports.getDocument = getDocument;
const updateDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, last_updated_by, collaboration, id } = req.body;
    try {
        const date = new Date();
        const updatePayload = { content, last_updated_at: date.toISOString() };
        if (last_updated_by)
            updatePayload["last_updated_by"] = last_updated_by;
        if (collaboration && collaboration.length > 0)
            updatePayload["collaboration"] = collaboration;
        const document = yield Document_1.default.findByIdAndUpdate(id, updatePayload, {
            new: true,
        });
        if (!document) {
            return res.status(404).json({ status: 404, error: "Document not found" });
        }
        return res.json(document);
    }
    catch (err) {
        res.status(500).json({ status: 500, error: err.message });
    }
});
exports.updateDocument = updateDocument;
const updateCurrentDocument = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, doc_id, last_updated_by, title } = payload;
    try {
        const date = new Date();
        const updatePayload = {
            last_updated_by,
            content,
            title,
            last_updated_at: date.toISOString(),
        };
        const document = yield Document_1.default.findByIdAndUpdate(doc_id, updatePayload, {
            new: true,
        });
        if (!document) {
            return "no doc found to edit!";
        }
        return Object.assign({}, document);
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.updateCurrentDocument = updateCurrentDocument;

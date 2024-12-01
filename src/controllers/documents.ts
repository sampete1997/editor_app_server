import { Request, Response } from "express";
import Document from "../models/Document";
import { ObjectId } from "mongoose";
import { generateUniqueId } from "../utils/crypto";

export const createDoc = async (req: Request, res: Response): Promise<any> => {
  const { content, title, created_by, collaboration } = req.body;

  try {
    const date = new Date();
    const new_parent_id = generateUniqueId(created_by);

    const document = new Document({
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
    const result = await document.save();
    return res.status(201).json({
      status: 201,
      message: "document created successfully!",
      docs: result,
    });
  } catch (err: any) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const createVersionUpdateDoc = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    content,
    title,
    version = 1,
    created_by,
    created_at,
    collaboration,
    parent_id,
    last_updated_by,
  } = req.body;

  try {
    const date = new Date();
    let new_parent_id = parent_id;
    const prev_doc = await Document.findOne({ parent_id })
      .sort({ version: -1 }) // Get the latest version
      .exec();

    if (!prev_doc) {
      return res
        .status(404)
        .json({ status: 404, message: "parent_id of doc not found!" });
    }
    const version_update = (prev_doc?.version || version) + 1;
    console.log("collaboration", collaboration);
    const document = new Document({
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
    const result = await document.save();
    res.status(201).json({
      status: 201,
      message: "new doc version created successfully!",
      docs: result,
    });
  } catch (err: any) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const getDocument = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id, parent_id } = req.query;

  const filter: any = {};
  if (id) filter["_id"] = id;
  if (parent_id) filter["parent_id"] = parent_id;

  try {
    const documents = await Document.find(filter, { __v: 0 });
    if (!documents) {
      return res.status(404).json({ status: 404, error: "Document not found" });
    }
    res.json({
      total: documents.length,
      data: documents,
    });
  } catch (err: any) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const updateDocument = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { content, last_updated_by, collaboration, id } = req.body;

  try {
    const date = new Date();
    const updatePayload: any = { content, last_updated_at: date.toISOString() };
    if (last_updated_by) updatePayload["last_updated_by"] = last_updated_by;
    if (collaboration && collaboration.length > 0)
      updatePayload["collaboration"] = collaboration;

    const document = await Document.findByIdAndUpdate(id, updatePayload, {
      new: true,
    });
    if (!document) {
      return res.status(404).json({ status: 404, error: "Document not found" });
    }
    return res.json(document);
  } catch (err: any) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const updateCurrentDocument = async (payload: {
  content: String;
  doc_id: String;
  last_updated_by: string;
  title: string;
}) => {
  const { content, doc_id, last_updated_by, title } = payload;
  try {
    const date = new Date();
    const updatePayload = {
      last_updated_by,
      content,
      title,
      last_updated_at: date.toISOString(),
    };
    const document = await Document.findByIdAndUpdate(doc_id, updatePayload, {
      new: true,
    });
    if (!document) {
      return "no doc found to edit!";
    }

    return {...document};
  } catch (err: any) {
    throw new Error(err);
  }
};

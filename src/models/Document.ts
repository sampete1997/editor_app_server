import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: "" },
  version: { type: Number, default: 1 },
  created_by: { type: String, required: true, default: "" },
  collaboration: {type: Array<String>, required: false},
  parent_id: { type: String, required: true, default: "" },
  created_at: { type: String },
  last_updated_at: { type: String },
  last_updated_by: { type: String, required: true },
});

export default mongoose.model("Document", DocumentSchema);

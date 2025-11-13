import mongoose from "mongoose";

const TipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "" },
    author: { type: String, default: "" },
    authorName: { type: String, default: "" },
    upvotes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Tip", TipSchema);

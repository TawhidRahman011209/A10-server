
import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  duration: Number,
  target: String,
  participants: { type: Number, default: 0 },
  impactMetric: String,
  createdBy: String,
  startDate: Date,
  endDate: Date,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

export default mongoose.model("Challenge", challengeSchema);

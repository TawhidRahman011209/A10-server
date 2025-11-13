import mongoose from "mongoose";

const ChallengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    duration: { type: Number, default: 0 },
    target: { type: String, default: "" },
    participants: { type: Number, default: 0 },
    impactMetric: { type: String, default: "" },
    createdBy: { type: String, default: "" },
    startDate: { type: Date },
    endDate: { type: Date },
    imageUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Challenge", ChallengeSchema);

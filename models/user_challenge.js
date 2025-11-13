
import mongoose from "mongoose";

const userChallengeSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // e.g., firebase uid or email
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
  status: { type: String, enum: ["Not Started", "Ongoing", "Finished"], default: "Not Started" },
  progress: { type: Number, default: 0 }, // 0-100
  joinDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model("UserChallenge", userChallengeSchema);

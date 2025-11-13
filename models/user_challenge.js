import mongoose from "mongoose";

const userChallengeSchema = new mongoose.Schema(
  {
    userId: String,
    challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
    status: { type: String, default: "Not Started" },
    progress: { type: Number, default: 0 },
    joinDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("UserChallenge", userChallengeSchema);

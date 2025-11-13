import mongoose from "mongoose";

const UserChallengeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
    status: { type: String, default: "Not Started" },
    progress: { type: Number, default: 0 },
    joinDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("UserChallenge", UserChallengeSchema);

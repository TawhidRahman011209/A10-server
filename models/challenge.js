
import mongoose from "mongoose";

const { Schema } = mongoose;

const ChallengeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Waste Reduction",
        "Energy Conservation",
        "Water Conservation",
        "Sustainable Transport",
        "Green Living",
        "Other",
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    target: {
      type: String,
      required: true,
    },

    participants: {
      type: Number,
      default: 0,
    },

    impactMetric: {
      type: String,
      required: true,
    },

    createdBy: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Challenge", ChallengeSchema);

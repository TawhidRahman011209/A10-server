import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true },
    location: { type: String, default: "" },
    organizer: { type: String, default: "" },
    maxParticipants: { type: Number, default: 0 },
    currentParticipants: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);

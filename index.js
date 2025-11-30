import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import challengeRoutes from "./routes/challenges.js";
import tipRoutes from "./routes/tips.js";
import eventRoutes from "./routes/events.js";
import userChallengeRoutes from "./routes/user_challenges.js";
import userRoutes from "./routes/users.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("EcoTrack API running"));

app.use("/api/challenges", challengeRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/user-challenges", userChallengeRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// index.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import challengesRoutes from "./routes/challenges.js";
import tipsRoutes from "./routes/tips.js";
import eventsRoutes from "./routes/events.js";
import userChallengesRoutes from "./routes/user_challenges.js";
import { initializeFirebaseAdmin } from "./middleware/firebaseAdmin.js";

const app = express();
const port = process.env.PORT || 5000;

// ---------- MongoDB URI (kept as you requested) ----------
const MONGO_URI = "mongodb+srv://Assignment10:assignment10ten@cluster0.iivmfnp.mongodb.net/Assignment10?retryWrites=true&w=majority";

// Middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(helmet());

// Initialize Firebase Admin (required for token verification)
initializeFirebaseAdmin();

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("🌍 EcoTrack API is running");
});

// API routes
app.use("/api/challenges", challengesRoutes);
app.use("/api/tips", tipsRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/user-challenges", userChallengesRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

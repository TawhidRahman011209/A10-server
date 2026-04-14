import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import challengesRouter from "./routes/challenges.js";
import tipsRouter from "./routes/tips.js";
import eventsRouter from "./routes/events.js";
import userChallengesRouter from "./routes/user_challenges.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();

//
// ✅ FIXED CORS CONFIG
//
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5179", // 👈 your current frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps / curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

//
// ✅ DB CONNECTION
//
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("DB error:", err);
    process.exit(1);
  });

//
// ✅ ROUTES
//
app.use("/api/challenges", challengesRouter);
app.use("/api/tips", tipsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/user-challenges", userChallengesRouter);
app.use("/api/users", usersRouter);

//
// ✅ 404 HANDLER
//
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

//
// ✅ ERROR HANDLER
//
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

//
// ✅ SERVER START
//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
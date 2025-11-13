
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import challengesRoutes from "./routes/challenges.js";
import tipsRoutes from "./routes/tips.js";
import eventsRoutes from "./routes/events.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://Assignment10:assignment10ten@cluster0.iivmfnp.mongodb.net/Assignment10?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("🌍 API is running");
});

app.use("/api/challenges", challengesRoutes);
app.use("/api/tips", tipsRoutes);
app.use("/api/events", eventsRoutes);


app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

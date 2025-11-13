import express from "express";
import Tip from "../models/tip.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const tips = await Tip.find().sort({ createdAt: -1 }).limit(5);
  res.json(tips);
});

router.post("/", async (req, res) => {
  const tip = new Tip(req.body);
  await tip.save();
  res.status(201).json(tip);
});

export default router;

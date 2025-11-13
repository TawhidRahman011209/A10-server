import express from "express";
import Tip from "../models/tip.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tips = await Tip.find().sort({ createdAt: -1 }).limit(20);
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const tip = new Tip(req.body);
    await tip.save();
    res.status(201).json(tip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

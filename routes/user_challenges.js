import express from "express";
import UserChallenge from "../models/user_challenge.js";
import { verifyToken } from "../middleware/firebase_admin.js";

const router = express.Router();


router.post("/join", verifyToken, async (req, res) => {
  try {
    const { userId, challengeId } = req.body;
    const uid = req.user?.uid || userId;
    if (!uid || !challengeId) return res.status(400).json({ message: "Missing data" });

    const existing = await UserChallenge.findOne({ userId: uid, challengeId });
    if (existing) return res.status(400).json({ message: "Already joined" });

    const uc = new UserChallenge({ userId: uid, challengeId });
    await uc.save();
    res.status(201).json(uc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await UserChallenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/user/:userId", verifyToken, async (req, res) => {
  try {
    
    if (req.user?.uid !== req.params.userId) {
     
      return res.status(403).json({ message: "Forbidden" });
    }
    const list = await UserChallenge.find({ userId: req.params.userId }).populate("challengeId");
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

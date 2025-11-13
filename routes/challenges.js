import express from "express";
import Challenge from "../models/challenge.js";
import UserChallenge from "../models/user_challenge.js";
import { verifyToken } from "../middleware/firebase_admin.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category, minParticipants, maxParticipants, startDate, endDate } = req.query;
    const filter = {};
    if (category) filter.category = { $in: category.split(",") };
    if (minParticipants || maxParticipants) {
      filter.participants = {
        ...(minParticipants && { $gte: +minParticipants }),
        ...(maxParticipants && { $lte: +maxParticipants })
      };
    }
    if (startDate || endDate) {
      filter.startDate = {
        ...(startDate && { $gte: new Date(startDate) }),
        ...(endDate && { $lte: new Date(endDate) })
      };
    }
    const challenges = await Challenge.find(filter).sort({ createdAt: -1 });
    res.json(challenges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: "Not Found" });
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    await challenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updated = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Challenge.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/join/:id", verifyToken, async (req, res) => {
  try {
    const challengeId = req.params.id;
    const uid = req.user?.uid || req.body.userId;
    if (!uid) return res.status(400).json({ message: "Missing user id" });

    const existing = await UserChallenge.findOne({ userId: uid, challengeId });
    if (existing) return res.status(400).json({ message: "Already joined" });

    const uc = new UserChallenge({ userId: uid, challengeId });
    await uc.save();

    const challenge = await Challenge.findByIdAndUpdate(
      challengeId,
      { $inc: { participants: 1 } },
      { new: true }
    );

    res.status(201).json({ userChallenge: uc, challenge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

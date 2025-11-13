import express from "express";
import UserChallenge from "../models/user_challenge.js";

const router = express.Router();

router.post("/join", async (req, res) => {
  const { userId, challengeId } = req.body;
  const existing = await UserChallenge.findOne({ userId, challengeId });
  if (existing) return res.status(400).json({ message: "Already joined" });
  const newJoin = new UserChallenge({ userId, challengeId });
  await newJoin.save();
  res.status(201).json(newJoin);
});

router.patch("/:id", async (req, res) => {
  const updated = await UserChallenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.get("/user/:userId", async (req, res) => {
  const challenges = await UserChallenge.find({ userId: req.params.userId }).populate("challengeId");
  res.json(challenges);
});

export default router;

import express from "express";
import UserChallenge from "../models/user_challenge.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId query required" });
    const list = await UserChallenge.find({ userId }).populate("challengeId");
    res.json(list);
  } catch (err) {
    next(err);
  }
});

router.get("/user/:uid", async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const list = await UserChallenge.find({ userId: uid }).populate("challengeId");
    res.json(list);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const updates = req.body;
    updates.lastUpdated = new Date();
    const updated = await UserChallenge.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;

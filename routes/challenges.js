import express from "express";
import Challenge from "../models/challenge.js";
import UserChallenge from "../models/user_challenge.js";
import { verifyToken } from "../middleware/firebase_admin.js";

const router = express.Router();

//
// ✅ GET ALL CHALLENGES
//
router.get("/", async (req, res, next) => {
  try {
    const {
      category,
      startDate,
      endDate,
      minParticipants,
      maxParticipants,
      q,
    } = req.query;

    const filter = {};

    if (category) {
      const cats = category.split(",").map((c) => c.trim());
      filter.category = { $in: cats };
    }

    if (startDate || endDate) {
      filter.startDate = {};
      if (startDate) filter.startDate.$gte = new Date(startDate);
      if (endDate) filter.startDate.$lte = new Date(endDate);
    }

    if (minParticipants || maxParticipants) {
      filter.participants = {};
      if (minParticipants)
        filter.participants.$gte = parseInt(minParticipants);
      if (maxParticipants)
        filter.participants.$lte = parseInt(maxParticipants);
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const challenges = await Challenge.find(filter).sort({ startDate: 1 });
    res.json(challenges);
  } catch (err) {
    next(err);
  }
});

//
// ✅ GET SINGLE CHALLENGE
//
router.get("/:id", async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

//
// ✅ CREATE CHALLENGE
//
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      createdBy: req.user.email,
    };

    const created = await Challenge.create(data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

//
// ✅ UPDATE CHALLENGE
//
router.patch("/:id", verifyToken, async (req, res, next) => {
  try {
    const existing = await Challenge.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Not found" });
    }

    if (existing.createdBy !== req.user.email) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

//
// ✅ DELETE CHALLENGE
//
router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const existing = await Challenge.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Not found" });
    }

    if (existing.createdBy !== req.user.email) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Challenge.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

//
// ✅ JOIN CHALLENGE (FIXED)
//
router.post("/join/:id", verifyToken, async (req, res, next) => {
  try {
    const challengeId = req.params.id;
    const userId = req.user.uid;

    // 🔍 check challenge exists
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    // 🔍 prevent duplicate join
    const existing = await UserChallenge.findOne({
      userId,
      challengeId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already joined this challenge",
      });
    }

    // ✅ create user challenge
    const userChallenge = await UserChallenge.create({
      userId,
      challengeId,
      status: "Ongoing",
      progress: 0,
    });

    // ✅ increment participants safely
    await Challenge.findByIdAndUpdate(challengeId, {
      $inc: { participants: 1 },
    });

    res.json({
      message: "Joined successfully",
      userChallenge,
    });
  } catch (err) {
    console.error("❌ JOIN ERROR:", err);
    next(err);
  }
});

export default router;
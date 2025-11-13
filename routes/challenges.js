
import express from "express";
import Challenge from "../models/challenge.js";
import UserChallenge from "../models/user_challenge.js";
import { verifyToken } from "../middleware/firebase_admin.js"; 

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { category, startDate, endDate, minParticipants, maxParticipants, q } = req.query;
    const filter = {};

    if (category) {
   
      const cats = category.split(",").map(c => c.trim());
      filter.category = { $in: cats };
    }

    if (startDate || endDate) {
      filter.startDate = {};
      if (startDate) filter.startDate.$gte = new Date(startDate);
      if (endDate) filter.startDate.$lte = new Date(endDate);
    }

    if (minParticipants || maxParticipants) {
      filter.participants = {};
      if (minParticipants) filter.participants.$gte = parseInt(minParticipants, 10);
      if (maxParticipants) filter.participants.$lte = parseInt(maxParticipants, 10);
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

router.get("/:id", async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: "Not found" });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const created = await Challenge.create(data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});


router.patch("/:id",  async (req, res, next) => {
  try {
    const updated = await Challenge.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
    await Challenge.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});


router.post("/join/:id",  async (req, res, next) => {
  try {
    const challengeId = req.params.id;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId required in body" });

    
    const challenge = await Challenge.findByIdAndUpdate(challengeId, { $inc: { participants: 1 } }, { new: true });

    let userChallenge = await UserChallenge.findOne({ userId, challengeId });
    if (!userChallenge) {
      userChallenge = await UserChallenge.create({ userId, challengeId, status: "Ongoing", progress: 0 });
    }

    res.json({ challenge, userChallenge });
  } catch (err) {
    next(err);
  }
});

export default router;

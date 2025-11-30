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
      if (minParticipants) filter.participants.$gte = parseInt(minParticipants);
      if (maxParticipants) filter.participants.$lte = parseInt(maxParticipants);
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


router.post("/", verifyToken, async (req, res, next) => {
  try {
    const userEmail = req.user.email;

    const data = {
      ...req.body,
      createdBy: userEmail,
    };

    const created = await Challenge.create(data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", verifyToken, async (req, res, next) => {
  try {
    const userEmail = req.user.email;

    const existing = await Challenge.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    if (existing.createdBy !== userEmail) {
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

router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const userEmail = req.user.email;

    const existing = await Challenge.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    if (existing.createdBy !== userEmail) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Challenge.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

router.post("/join/:id", verifyToken, async (req, res, next) => {
  

  try {
    const challengeId = req.params.id;
    const userId = req.user.uid;

    let userChallenge = await UserChallenge.findOne({ userId, challengeId });

    if (!userChallenge) {
      console.log("🟢 Creating NEW UserChallenge");
      userChallenge = await UserChallenge.create({
        userId,
        challengeId,
        status: "Ongoing",
        progress: 0,
      });
    } else {
      console.log("🟡 User already joined:", userChallenge);
    }

    res.json({ userChallenge });
  } catch (err) {
    console.log("❌ JOIN ERROR:", err);
    next(err);
  }
});


export default router;

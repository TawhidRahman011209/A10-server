import express from "express";
import Challenge from "../models/challenge.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category, minParticipants, maxParticipants, startDate, endDate } = req.query;
    const filter = {};
    if (category) filter.category = { $in: category.split(",") };
    if (minParticipants || maxParticipants)
      filter.participants = {
        ...(minParticipants && { $gte: +minParticipants }),
        ...(maxParticipants && { $lte: +maxParticipants }),
      };
    if (startDate || endDate)
      filter.startDate = {
        ...(startDate && { $gte: new Date(startDate) }),
        ...(endDate && { $lte: new Date(endDate) }),
      };
    const challenges = await Challenge.find(filter).sort({ createdAt: -1 });
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) return res.status(404).json({ message: "Not Found" });
  res.json(challenge);
});

router.post("/", async (req, res) => {
  const challenge = new Challenge(req.body);
  await challenge.save();
  res.status(201).json(challenge);
});

router.patch("/:id", async (req, res) => {
  const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(challenge);
});

router.delete("/:id", async (req, res) => {
  await Challenge.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;

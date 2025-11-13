
import express from "express";
import Event from "../models/event.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 0;
    const now = new Date();
    const events = await Event.find({ date: { $gte: now } }).sort({ date: 1 }).limit(limit);
    res.json(events);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const created = await Event.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

export default router;

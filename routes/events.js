import express from "express";
import Event from "../models/event.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }).limit(20);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

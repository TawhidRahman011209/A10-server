import express from "express";
import Event from "../models/event.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Event.find().sort({ date: 1 }).limit(4);
  res.json(events);
});

router.post("/", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json(event);
});

export default router;


import express from "express";
import Tip from "../models/tip.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
   
    const limit = parseInt(req.query.limit, 10) || 0;
    const tips = await Tip.find().sort({ createdAt: -1 }).limit(limit);
    res.json(tips);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const created = await Tip.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

export default router;

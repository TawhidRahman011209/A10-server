import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Check if user exists
router.get("/check/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (user) {
      return res.json({ exists: true, user });
    }

    return res.json({ exists: false });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Register (manual or google)
router.post("/register", async (req, res) => {
  try {
    const { name, email, photoURL } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.json({ success: true, user });

    user = await User.create({ name, email, photoURL });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

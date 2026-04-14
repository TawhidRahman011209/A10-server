import express from "express";
import User from "../models/user.js";
import { verifyToken } from "../middleware/firebase_admin.js";

const router = express.Router();

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

router.post("/register", verifyToken, async (req, res) => {
  try {
    const { name, email, photoURL } = req.body;

    if (req.user.email !== email) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    let user = await User.findOne({ email });
    if (user) return res.json({ success: true, user });

    user = await User.create({ name, email, photoURL });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

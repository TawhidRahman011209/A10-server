import mongoose from "mongoose";
import dotenv from "dotenv";
import Challenge from "./models/challenge.js";

dotenv.config();

const challenges = [
  {
    title: "Plastic Free Week",
    category: "Sustainability",
    description: "Avoid single-use plastics for 7 days.",
    duration: 7,
    target: "Reduce plastic waste by 2kg",
    impactMetric: "kg plastic reduced",
    participants: 12,
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 86400000)
  },
  {
    title: "Tree Planting Challenge",
    category: "Environment",
    description: "Plant at least 5 trees in your community.",
    duration: 10,
    target: "Plant 5 trees",
    impactMetric: "trees planted",
    participants: 30,
    imageUrl: "https://images.unsplash.com/photo-1506765515384-028b60a970df",
    startDate: new Date(),
    endDate: new Date(Date.now() + 10 * 86400000)
  }
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Challenge.deleteMany({});
    await Challenge.insertMany(challenges);
    console.log("✅ Seeded challenges successfully!");
    process.exit();
  })
  .catch(err => console.error("❌ Seed error:", err));

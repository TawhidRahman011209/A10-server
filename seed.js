import mongoose from "mongoose";
import dotenv from "dotenv";

import Challenge from "./models/challenge.js";
import Tip from "./models/tip.js";
import Event from "./models/event.js";

dotenv.config();


const challenges = [
  {
    title: "Plastic Free Week",
    category: "Waste Reduction",
    description: "Avoid single-use plastics for 7 days.",
    duration: 7,
    target: "Reduce plastic waste by 2kg",
    impactMetric: "kg plastic reduced",
    participants: 12,
    createdBy: "admin@ecotrack.com",
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 86400000),
  },
  {
    title: "Tree Planting Challenge",
    category: "Green Living",
    description: "Plant at least 5 trees in your community.",
    duration: 10,
    target: "Plant 5 trees",
    impactMetric: "trees planted",
    participants: 30,
    createdBy: "admin@ecotrack.com",
    imageUrl: "https://images.unsplash.com/photo-1506765515384-028b60a970df",
    startDate: new Date(),
    endDate: new Date(Date.now() + 10 * 86400000),
  },
  {
    title: "Energy Saving Sprint",
    category: "Energy Conservation",
    description: "Reduce home electricity use by 15% over 5 days.",
    duration: 5,
    target: "Save 15% electricity",
    impactMetric: "kWh saved",
    participants: 20,
    createdBy: "admin@ecotrack.com",
    imageUrl: "https://images.unsplash.com/photo-1584270354949-1a0b79d89c46",
    startDate: new Date(),
    endDate: new Date(Date.now() + 5 * 86400000),
  }
];

const tips = [
  {
    title: "Reduce Water Waste",
    content: "Turn off the tap while brushing and save up to 8 liters/day!",
    category: "Water Conservation",
    author: "admin",
    authorName: "Eco Admin",
    upvotes: 12
  },
  {
    title: "Recycle Plastic Bottles",
    content: "Always recycle PET bottles to reduce microplastics.",
    category: "Waste Reduction",
    author: "admin",
    authorName: "Eco Admin",
    upvotes: 20
  }
];

const events = [
  {
    title: "Beach Cleanup",
    description: "Join our community beach cleanup event!",
    date: new Date(Date.now() + 86400000 * 2),
    location: "Bondi Beach",
    organizer: "Green Club",
    maxParticipants: 100
  },
  {
    title: "Tree Planting Day",
    description: "Help plant 200 trees in the urban park.",
    date: new Date(Date.now() + 86400000 * 5),
    location: "City Park",
    organizer: "Eco Warriors",
    maxParticipants: 150
  }
];


mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected. Seeding...");

    await Challenge.deleteMany({});
    await Tip.deleteMany({});
    await Event.deleteMany({});

    await Challenge.insertMany(challenges);
    await Tip.insertMany(tips);
    await Event.insertMany(events);

    console.log("✅ Seeded challenges, tips & events successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seed error:", err);
    process.exit(1);
  });

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
    imageUrl: "https://images.unsplash.com/photo-1605600659908-0ef719419d41",
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
    imageUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8",
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
    imageUrl: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
    startDate: new Date(),
    endDate: new Date(Date.now() + 5 * 86400000),
  },
  {
    title: "Zero Waste Day",
    category: "Waste Reduction",
    description: "Produce zero waste for a full day.",
    duration: 1,
    target: "No trash generated",
    impactMetric: "kg waste avoided",
    participants: 15,
    createdBy: "admin@ecotrack.com",
    imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac",
    startDate: new Date(),
    endDate: new Date(Date.now() + 1 * 86400000),
  },
  {
    title: "Bike to Work",
    category: "Transport",
    description: "Use a bicycle instead of a car for commuting.",
    duration: 7,
    target: "7 bike commutes",
    impactMetric: "CO₂ reduced",
    participants: 22,
    createdBy: "admin@ecotrack.com",
    imageUrl: "https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=800&q=80",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 86400000),
  },
  {
    title: "Water Saving Week",
    category: "Water Conservation",
    description: "Reduce daily water usage.",
    duration: 7,
    target: "Save 50L water/day",
    impactMetric: "liters saved",
    participants: 18,
    createdBy: "admin@ecotrack.com",
    imageUrl: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 86400000),
  },
  {
    title: "Meatless Week",
    category: "Food",
    description: "Avoid meat for a week.",
    duration: 7,
    target: "7 vegetarian days",
    impactMetric: "CO₂ reduced",
    participants: 40,
    createdBy: "admin@ecotrack.com",
    imageUrl: "https://images.unsplash.com/photo-1490818387583-1baba5e638af",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 86400000),
  },
  {
    title: "Reusable Bag Challenge",
    category: "Waste Reduction",
    description: "Use reusable bags for shopping.",
    duration: 5,
    target: "Avoid 10 plastic bags",
    impactMetric: "bags saved",
    participants: 25,
    createdBy: "admin@ecotrack.com",
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
    startDate: new Date(),
    endDate: new Date(Date.now() + 5 * 86400000),
  },
  {
    title: "Solar Energy Awareness",
    category: "Energy",
    description: "Learn and promote solar energy use.",
    duration: 3,
    target: "Share 3 awareness posts",
    impactMetric: "people reached",
    participants: 10,
    createdBy: "admin@ecotrack.com",
    imageUrl: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 86400000),
  },
  {
    title: "Clean Your Neighborhood",
    category: "Community",
    description: "Pick up litter in your local area.",
    duration: 2,
    target: "Collect 5kg trash",
    impactMetric: "kg waste collected",
    participants: 35,
    createdBy: "admin@ecotrack.com",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
    startDate: new Date(),
    endDate: new Date(Date.now() + 2 * 86400000),
  },
  {
    title: "Digital Detox Energy Save",
    category: "Energy",
    description: "Reduce screen time to save electricity.",
    duration: 4,
    target: "Limit screen to 3h/day",
    impactMetric: "kWh saved",
    participants: 12,
    createdBy: "admin@ecotrack.com",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    startDate: new Date(),
    endDate: new Date(Date.now() + 4 * 86400000),
  },
  {
    title: "Plant-Based Cooking",
    category: "Food",
    description: "Cook plant-based meals daily.",
    duration: 6,
    target: "6 plant-based meals",
    impactMetric: "CO₂ reduced",
    participants: 28,
    createdBy: "admin@ecotrack.com",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    startDate: new Date(),
    endDate: new Date(Date.now() + 6 * 86400000),
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
  },
  {
  title: "Use Reusable Bags",
  content: "Carry reusable bags when shopping to cut down plastic waste.",
  category: "Waste Reduction",
  author: "admin",
  authorName: "Eco Admin",
  upvotes: 15
},
{
  title: "Save Electricity",
  content: "Turn off lights and unplug devices when not in use.",
  category: "Energy Conservation",
  author: "admin",
  authorName: "Eco Admin",
  upvotes: 18
},
{
  title: "Compost Organic Waste",
  content: "Turn food scraps into compost to enrich soil and reduce waste.",
  category: "Green Living",
  author: "admin",
  authorName: "Eco Admin",
  upvotes: 10
},
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
  },
  {
  title: "Community Recycling Drive",
  description: "Bring recyclable items and help reduce landfill waste.",
  date: new Date(Date.now() + 86400000 * 7),
  location: "Community Center",
  organizer: "Eco Volunteers",
  maxParticipants: 80
},
{
  title: "River Cleanup अभियान",
  description: "Join us to clean and protect our local river.",
  date: new Date(Date.now() + 86400000 * 9),
  location: "River Bank",
  organizer: "Green Earth Org",
  maxParticipants: 120
},
{
  title: "Sustainability Workshop",
  description: "Learn practical ways to live a sustainable lifestyle.",
  date: new Date(Date.now() + 86400000 * 12),
  location: "City Hall",
  organizer: "EcoTrack Team",
  maxParticipants: 60
},
{
  title: "Bike Rally for Environment",
  description: "Promote eco-friendly transport with a city bike rally.",
  date: new Date(Date.now() + 86400000 * 15),
  location: "Downtown",
  organizer: "Cycling Club",
  maxParticipants: 150
},
{
  title: "Urban Gardening Meetup",
  description: "Learn how to grow plants in small urban spaces.",
  date: new Date(Date.now() + 86400000 * 18),
  location: "Rooftop Garden",
  organizer: "Green Living Group",
  maxParticipants: 50
},
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

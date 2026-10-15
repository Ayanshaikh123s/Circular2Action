const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const storage = require("./storage");
const seedData = require("./data/seedData");
const User = require("./models/User");
const Circular = require("./models/Circular");
const ActionItem = require("./models/ActionItem");
const Notification = require("./models/Notification");
const Category = require("./models/Category");

const authRoutes = require("./routes/authRoutes");
const circularRoutes = require("./routes/circularRoutes");
const studentRoutes = require("./routes/studentRoutes");
const actionRoutes = require("./routes/actionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/circular2action";

// Middlewares
app.use(cors());
app.use(express.json());

// Routes mounting
app.use("/api/auth", authRoutes);
app.use("/api/circulars", circularRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/actions", actionRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stats", statsRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Circular2Action Backend API",
    database: storage.getMongoConnected() ? "MongoDB" : "Persistent JSON DB (Fallback)",
    timestamp: new Date().toISOString(),
  });
});

// Seed MongoDB if empty
async function seedMongoDBIfEmpty() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("[MongoDB] Seeding initial students...");
      await User.insertMany(seedData.initialStudents);
    }

    const circCount = await Circular.countDocuments();
    if (circCount === 0) {
      console.log("[MongoDB] Seeding initial circulars...");
      await Circular.insertMany(seedData.initialCirculars);
    }

    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      console.log("[MongoDB] Seeding initial categories...");
      await Category.insertMany(seedData.initialCategories);
    }

    const actCount = await ActionItem.countDocuments();
    if (actCount === 0) {
      console.log("[MongoDB] Seeding initial action items...");
      await ActionItem.insertMany(seedData.initialActions);
    }

    const notifCount = await Notification.countDocuments();
    if (notifCount === 0) {
      console.log("[MongoDB] Seeding initial notifications...");
      await Notification.insertMany(seedData.initialNotifications);
    }
  } catch (err) {
    console.error("[MongoDB] Error seeding initial data:", err);
  }
}

// Connect to Database
async function startServer() {
  try {
    console.log(`[Database] Attempting connection to MongoDB at: ${MONGO_URI}`);
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log("✓ [Database] Connected to MongoDB database successfully!");
    storage.setMongoConnected(true);
    await seedMongoDBIfEmpty();
  } catch (err) {
    console.warn("! [Database] MongoDB local server not active. Seamlessly using Persistent Storage (data/db.json).");
    console.log("  (To connect to MongoDB, start local MongoDB or provide MONGO_URI in backend/.env)");
    storage.setMongoConnected(false);
    storage.initFileStorage();
  }

  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 Circular2Action Backend is running!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🔌 Health: http://localhost:${PORT}/api/health`);
    console.log(`=========================================`);
  });
}

startServer();

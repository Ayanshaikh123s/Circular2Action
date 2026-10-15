const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    circular: {
      type: String,
      default: "",
    },
    audience: {
      type: String,
      default: "All Students",
    },
    channel: {
      type: String,
      enum: ["In-App", "Email", "SMS", "WhatsApp"],
      default: "In-App",
    },
    category: {
      type: String,
      default: "General",
    },
    type: {
      type: String,
      default: "Circular",
    },
    sentDate: {
      type: String,
      default: () => new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    },
    time: {
      type: String,
      default: "Just now",
    },
    status: {
      type: String,
      enum: ["Pending", "Delivered", "Read"],
      default: "Delivered",
    },
    unread: {
      type: Boolean,
      default: true,
    },
    readBy: [
      {
        type: String, // student email or id
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);

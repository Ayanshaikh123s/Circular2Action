const mongoose = require("mongoose");

const actionItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    circular: {
      type: String,
      default: "General Circular",
    },
    circularId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Circular",
    },
    audience: {
      type: String,
      default: "All Students",
    },
    assignedDate: {
      type: String,
      default: () => new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    },
    deadline: {
      type: String,
      default: "Not set",
    },
    priority: {
      type: String,
      enum: ["Low", "Normal", "Medium", "High", "Urgent"],
      default: "Normal",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    category: {
      type: String,
      default: "General",
    },
    description: {
      type: String,
      default: "",
    },
    completedDate: {
      type: String,
      default: "",
    },
    completedBy: [
      {
        type: String, // student email or id
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActionItem", actionItemSchema);

const mongoose = require("mongoose");

const circularSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    circularNumber: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
      default: "General",
    },
    description: {
      type: String,
      required: true,
    },
    targetType: {
      type: String,
      enum: ["all", "semester", "department"],
      default: "all",
    },
    targetValue: {
      type: String,
      default: "",
    },
    audience: {
      type: String,
      default: "All Students",
    },
    actionRequired: {
      type: String,
      default: "",
    },
    deadline: {
      type: String,
      default: "—",
    },
    priority: {
      type: String,
      enum: ["Low", "Normal", "High", "Urgent", "Medium"],
      default: "Normal",
    },
    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },
    fileName: {
      type: String,
      default: "",
    },
    createdBy: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Circular", circularSchema);

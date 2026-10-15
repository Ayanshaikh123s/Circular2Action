const express = require("express");
const router = express.Router();
const storage = require("../storage");

// GET /api/circulars - fetch all circulars (with optional filtering)
router.get("/", async (req, res) => {
  try {
    const { category, status, search, audience, semester } = req.query;
    let circulars = await storage.getCirculars();

    if (category && category !== "all" && category !== "All") {
      circulars = circulars.filter(
        (c) => c.category && c.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (status && status !== "all" && status !== "All") {
      circulars = circulars.filter(
        (c) => c.status && c.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      circulars = circulars.filter(
        (c) =>
          (c.title && c.title.toLowerCase().includes(q)) ||
          (c.description && c.description.toLowerCase().includes(q)) ||
          (c.category && c.category.toLowerCase().includes(q))
      );
    }

    // Filter for student specific audience if requested
    if (semester && semester !== "all") {
      circulars = circulars.filter((c) => {
        if (!c.targetType || c.targetType === "all") return true;
        if (c.targetType === "semester" && String(c.targetValue) === String(semester)) return true;
        if (c.audience && c.audience.toLowerCase().includes("all")) return true;
        if (c.audience && c.audience.toLowerCase().includes(`semester ${semester}`)) return true;
        return true; // default include
      });
    }

    res.json({
      success: true,
      count: circulars.length,
      circulars,
    });
  } catch (err) {
    console.error("Get circulars error:", err);
    res.status(500).json({ error: "Failed to fetch circulars." });
  }
});

// POST /api/circulars - Admin publishes a new circular
router.post("/", async (req, res) => {
  try {
    const {
      title,
      circularNumber,
      category,
      description,
      targetType,
      targetValue,
      audience,
      actionRequired,
      deadline,
      priority,
      status,
      fileName,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required." });
    }

    // Compute audience label if not provided
    let computedAudience = audience;
    if (!computedAudience) {
      if (targetType === "semester" && targetValue) {
        computedAudience = `Semester ${targetValue}`;
      } else if (targetType === "department" && targetValue) {
        computedAudience = `${targetValue.toUpperCase()} Students`;
      } else {
        computedAudience = "All Students";
      }
    }

    const actionText = typeof actionRequired === "string" 
      ? actionRequired.trim() 
      : (actionRequired ? `Action for: ${title.trim()}` : "");

    const newCircular = await storage.createCircular({
      title: title.trim(),
      circularNumber: circularNumber ? String(circularNumber).trim() : "",
      category: category || "General",
      description: description.trim(),
      targetType: targetType || "all",
      targetValue: targetValue || "",
      audience: computedAudience,
      actionRequired: actionText,
      deadline: deadline || "—",
      priority: priority || "Normal",
      status: status || "Published",
      fileName: fileName || "",
    });

    // 1. If an action is required, auto-create an ActionItem so students can track it!
    if (actionText) {
      await storage.createAction({
        title: actionText,
        circular: title.trim(),
        circularId: newCircular._id || newCircular.id,
        audience: computedAudience,
        deadline: deadline || "Not set",
        priority: priority || "Normal",
        status: "Pending",
        category: category || "General",
        description: `Action from circular: ${title.trim()}`,
      });
    }

    // 2. Auto-generate notification so students receive it in Student Dashboard & Notifications!
    if (status === "Published" || !status) {
      await storage.createNotification({
        title: `New circular: ${title.trim()}`,
        message: description.trim().substring(0, 120) + (description.length > 120 ? "..." : ""),
        circular: title.trim(),
        audience: computedAudience,
        channel: "In-App",
        category: category || "General",
        type: "Circular",
        status: "Delivered",
        unread: true,
      });
    }

    res.status(201).json({
      success: true,
      message: "Circular published successfully!",
      circular: newCircular,
    });
  } catch (err) {
    console.error("Create circular error:", err);
    res.status(500).json({ error: "Failed to publish circular." });
  }
});

// PUT /api/circulars/:id - Update circular
router.put("/:id", async (req, res) => {
  try {
    const updated = await storage.updateCircular(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Circular not found." });
    }
    res.json({ success: true, message: "Circular updated successfully!", circular: updated });
  } catch (err) {
    console.error("Update circular error:", err);
    res.status(500).json({ error: "Failed to update circular." });
  }
});

// DELETE /api/circulars/:id - Delete circular
router.delete("/:id", async (req, res) => {
  try {
    await storage.deleteCircular(req.params.id);
    res.json({ success: true, message: "Circular deleted successfully." });
  } catch (err) {
    console.error("Delete circular error:", err);
    res.status(500).json({ error: "Failed to delete circular." });
  }
});

module.exports = router;

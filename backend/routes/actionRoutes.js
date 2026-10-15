const express = require("express");
const router = express.Router();
const storage = require("../storage");

// GET /api/actions - fetch actions (with optional filters)
router.get("/", async (req, res) => {
  try {
    const { status, priority, category, search } = req.query;
    let actions = await storage.getActions();

    if (status && status !== "All" && status !== "all") {
      actions = actions.filter(
        (a) => a.status && a.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (priority && priority !== "All" && priority !== "all") {
      actions = actions.filter(
        (a) => a.priority && a.priority.toLowerCase() === priority.toLowerCase()
      );
    }

    if (category && category !== "All" && category !== "all") {
      actions = actions.filter(
        (a) => a.category && a.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      actions = actions.filter(
        (a) =>
          (a.title && a.title.toLowerCase().includes(q)) ||
          (a.circular && a.circular.toLowerCase().includes(q)) ||
          (a.audience && a.audience.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: actions.length,
      actions,
    });
  } catch (err) {
    console.error("Get actions error:", err);
    res.status(500).json({ error: "Failed to fetch actions." });
  }
});

// POST /api/actions - Create action item
router.post("/", async (req, res) => {
  try {
    const { title, circular, audience, deadline, priority, status, category, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Action title is required." });
    }

    const newAction = await storage.createAction({
      title: title.trim(),
      circular: circular ? circular.trim() : "General Circular",
      audience: audience || "All Students",
      deadline: deadline || "Not set",
      priority: priority || "Normal",
      status: status || "Pending",
      category: category || "General",
      description: description || "",
    });

    res.status(201).json({
      success: true,
      message: "Action item created successfully!",
      action: newAction,
    });
  } catch (err) {
    console.error("Create action error:", err);
    res.status(500).json({ error: "Failed to create action." });
  }
});

// PATCH /api/actions/:id/status - Update action status (e.g. mark as completed by student or admin)
router.patch("/:id/status", async (req, res) => {
  try {
    const { status, studentEmail } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status is required." });
    }

    const updateData = { status };
    if (status === "Completed") {
      updateData.completedDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }

    const updated = await storage.updateAction(req.params.id, updateData);
    if (!updated) {
      return res.status(404).json({ error: "Action item not found." });
    }

    res.json({
      success: true,
      message: `Action status updated to ${status}!`,
      action: updated,
    });
  } catch (err) {
    console.error("Update action status error:", err);
    res.status(500).json({ error: "Failed to update action status." });
  }
});

// DELETE /api/actions/:id - Delete action item
router.delete("/:id", async (req, res) => {
  try {
    await storage.deleteAction(req.params.id);
    res.json({ success: true, message: "Action item deleted successfully." });
  } catch (err) {
    console.error("Delete action error:", err);
    res.status(500).json({ error: "Failed to delete action item." });
  }
});

// PUT /api/actions/:id - Update action item
router.put("/:id", async (req, res) => {
  try {
    const updated = await storage.updateAction(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Action item not found." });
    }
    res.json({
      success: true,
      message: "Action item updated successfully!",
      action: updated,
    });
  } catch (err) {
    console.error("Update action error:", err);
    res.status(500).json({ error: "Failed to update action item." });
  }
});

module.exports = router;

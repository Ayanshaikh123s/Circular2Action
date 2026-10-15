const express = require("express");
const router = express.Router();
const storage = require("../storage");

// GET /api/notifications
router.get("/", async (req, res) => {
  try {
    const { status, channel, search } = req.query;
    let notifications = await storage.getNotifications();

    if (status && status !== "All") {
      notifications = notifications.filter(
        (n) => n.status && n.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (channel && channel !== "All") {
      notifications = notifications.filter(
        (n) => n.channel && n.channel.toLowerCase() === channel.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      notifications = notifications.filter(
        (n) =>
          (n.title && n.title.toLowerCase().includes(q)) ||
          (n.message && n.message.toLowerCase().includes(q)) ||
          (n.circular && n.circular.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (err) {
    console.error("Get notifications error:", err);
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
});

// POST /api/notifications - Admin creates notification
router.post("/", async (req, res) => {
  try {
    const { title, message, circular, audience, channel, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Notification title is required." });
    }

    const newNotif = await storage.createNotification({
      title: title.trim(),
      message: message ? message.trim() : "",
      circular: circular ? circular.trim() : "",
      audience: audience || "All Students",
      channel: channel || "In-App",
      status: status || "Delivered",
      unread: true,
    });

    res.status(201).json({
      success: true,
      message: "Notification created successfully!",
      notification: newNotif,
    });
  } catch (err) {
    console.error("Create notification error:", err);
    res.status(500).json({ error: "Failed to create notification." });
  }
});

// PATCH /api/notifications/:id/read - Mark as read
router.patch("/:id/read", async (req, res) => {
  try {
    const updated = await storage.updateNotification(req.params.id, {
      unread: false,
      status: "Read",
    });
    res.json({ success: true, notification: updated });
  } catch (err) {
    console.error("Mark notification read error:", err);
    res.status(500).json({ error: "Failed to mark notification as read." });
  }
});

// PATCH /api/notifications/mark-all-read - Mark all as read
router.patch("/mark-all-read", async (req, res) => {
  try {
    await storage.markAllNotificationsRead();
    res.json({ success: true, message: "All notifications marked as read." });
  } catch (err) {
    console.error("Mark all read error:", err);
    res.status(500).json({ error: "Failed to mark all notifications as read." });
  }
});

module.exports = router;

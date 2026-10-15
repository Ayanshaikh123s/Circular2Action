const express = require("express");
const router = express.Router();
const storage = require("../storage");

// GET /api/stats/admin - Real-time statistics for Admin Dashboard
router.get("/admin", async (req, res) => {
  try {
    const circulars = await storage.getCirculars();
    const actions = await storage.getActions();
    const notifications = await storage.getNotifications();
    const users = await storage.getUsers();

    const students = users.filter((u) => u.role === "Student" || !u.role);
    const pendingActions = actions.filter((a) => a.status === "Pending" || a.status === "In Progress");

    const recentCirculars = circulars.slice(0, 4);

    res.json({
      success: true,
      stats: {
        totalCirculars: circulars.length,
        pendingActions: pendingActions.length,
        notificationsSent: notifications.length,
        studentsReached: students.length,
        recentCirculars,
      },
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ error: "Failed to fetch admin stats." });
  }
});

// GET /api/stats/student - Real-time statistics for Student Dashboard
router.get("/student", async (req, res) => {
  try {
    const { semester } = req.query;
    let circulars = await storage.getCirculars();
    const actions = await storage.getActions();
    const notifications = await storage.getNotifications();

    if (semester && semester !== "all") {
      circulars = circulars.filter((c) => {
        if (!c.targetType || c.targetType === "all") return true;
        if (c.targetType === "semester" && String(c.targetValue) === String(semester)) return true;
        return true;
      });
    }

    const pendingActions = actions.filter((a) => a.status === "Pending" || a.status === "In Progress");
    const completedActions = actions.filter((a) => a.status === "Completed");
    const unreadNotifications = notifications.filter((n) => n.unread);

    res.json({
      success: true,
      stats: {
        myCircularsCount: circulars.length,
        circularsCount: circulars.length,
        pendingActionsCount: pendingActions.length,
        completedActionsCount: completedActions.length,
        notificationsCount: unreadNotifications.length,
        recentCirculars: circulars.slice(0, 4),
        upcomingActions: pendingActions.slice(0, 3),
      },
    });
  } catch (err) {
    console.error("Student stats error:", err);
    res.status(500).json({ error: "Failed to fetch student stats." });
  }
});

module.exports = router;

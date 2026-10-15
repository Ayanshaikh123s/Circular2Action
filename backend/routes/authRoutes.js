const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const storage = require("../storage");

const JWT_SECRET = process.env.JWT_SECRET || "circular2action_default_secret_key";

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password, role, semester, department, course } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    const existingUser = await storage.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const assignedRole = role === "admin" || role === "Admin" ? "Admin" : "Student";

    const user = await storage.createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || "").trim(),
      password: hashedPassword,
      role: assignedRole,
      semester: assignedRole === "Student" ? semester || "1" : "",
      department: department || "Computer Applications",
      course: course || "BCA",
      status: "Active",
    });

    const token = jwt.sign(
      { id: user._id || user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = { ...user };
    delete safeUser.password;

    res.status(201).json({
      message: "Account created successfully!",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during registration." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await storage.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Support both bcrypt and plain text (for initial seed fallback)
    let isMatch = false;
    if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = user.password === password;
    }

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id || user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = { ...user };
    delete safeUser.password;

    res.json({
      message: "Login successful!",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login." });
  }
});

// GET /api/auth/me
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization token provided." });
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await storage.findUserByEmail(decoded.email);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const safeUser = { ...user };
    delete safeUser.password;

    res.json({ user: safeUser });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
});

// PUT /api/auth/profile
router.put("/profile", async (req, res) => {
  try {
    const { id, email, name, phone, department } = req.body;
    let targetUser = null;

    if (id) {
      targetUser = await storage.findUserById(id);
    }
    if (!targetUser && email) {
      targetUser = await storage.findUserByEmail(email);
    }

    if (!targetUser) {
      return res.status(404).json({ error: "User not found." });
    }

    const updated = await storage.updateUser(targetUser._id || targetUser.id, {
      name: name ? name.trim() : targetUser.name,
      phone: phone ? phone.trim() : targetUser.phone,
      department: department || targetUser.department,
    });

    const safeUser = { ...updated };
    delete safeUser.password;

    res.json({ message: "Profile updated successfully!", user: safeUser });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ error: "Failed to update profile." });
  }
});

module.exports = router;

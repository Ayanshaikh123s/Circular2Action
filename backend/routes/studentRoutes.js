const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const storage = require("../storage");

// GET /api/students - Admin gets all registered students
router.get("/", async (req, res) => {
  try {
    const { course, semester, status, search } = req.query;
    let users = await storage.getUsers();

    // Filter only students (or all users with Student role)
    let students = users.filter((u) => u.role === "Student" || !u.role);

    if (course && course !== "All Courses") {
      students = students.filter(
        (s) => s.course && s.course.toLowerCase() === course.toLowerCase()
      );
    }

    if (semester && semester !== "All Semesters") {
      students = students.filter((s) => {
        const semClean = String(s.semester).replace("Semester ", "").trim();
        const filterClean = String(semester).replace("Semester ", "").trim();
        return semClean === filterClean;
      });
    }

    if (status && status !== "All Status") {
      students = students.filter(
        (s) => s.status && s.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      students = students.filter(
        (s) =>
          (s.name && s.name.toLowerCase().includes(q)) ||
          (s.email && s.email.toLowerCase().includes(q)) ||
          (s.phone && s.phone.includes(q))
      );
    }

    res.json({
      success: true,
      count: students.length,
      students,
    });
  } catch (err) {
    console.error("Get students error:", err);
    res.status(500).json({ error: "Failed to fetch students." });
  }
});

// POST /api/students - Admin adds a new student directly
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, course, semester, department, status } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required." });
    }

    const existingUser = await storage.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "A student with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash("student123", 10);

    const newStudent = await storage.createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password: hashedPassword,
      role: "Student",
      course: course || "BCA",
      semester: String(semester).replace("Semester ", "") || "1",
      department: department || "Computer Applications",
      status: status || "Active",
    });

    const safeStudent = { ...newStudent };
    delete safeStudent.password;

    res.status(201).json({
      success: true,
      message: "Student added successfully!",
      student: safeStudent,
    });
  } catch (err) {
    console.error("Add student error:", err);
    res.status(500).json({ error: "Failed to add student." });
  }
});

// PUT /api/students/:id - Update student
router.put("/:id", async (req, res) => {
  try {
    const updated = await storage.updateUser(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Student not found." });
    }
    const safeStudent = { ...updated };
    delete safeStudent.password;
    res.json({ success: true, message: "Student updated successfully!", student: safeStudent });
  } catch (err) {
    console.error("Update student error:", err);
    res.status(500).json({ error: "Failed to update student." });
  }
});

// DELETE /api/students/:id - Delete student
router.delete("/:id", async (req, res) => {
  try {
    await storage.deleteUser(req.params.id);
    res.json({ success: true, message: "Student deleted successfully." });
  } catch (err) {
    console.error("Delete student error:", err);
    res.status(500).json({ error: "Failed to delete student." });
  }
});

module.exports = router;

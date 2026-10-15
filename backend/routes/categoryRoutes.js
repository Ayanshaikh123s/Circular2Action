const express = require("express");
const router = express.Router();
const storage = require("../storage");

// GET /api/categories (recalculates live circular counts)
router.get("/", async (req, res) => {
  try {
    const categories = await storage.getCategories();
    const circulars = await storage.getCirculars();

    // Dynamically calculate circular count for each category
    const categoriesWithCount = categories.map((cat) => {
      const matchCount = circulars.filter(
        (c) => c.category && c.category.toLowerCase() === cat.name.toLowerCase()
      ).length;
      return {
        ...cat,
        count: matchCount > 0 ? matchCount : cat.count || 0,
      };
    });

    res.json({
      success: true,
      count: categoriesWithCount.length,
      categories: categoriesWithCount,
    });
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ error: "Failed to fetch categories." });
  }
});

// POST /api/categories
router.post("/", async (req, res) => {
  try {
    const { name, description, color } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Category name is required." });
    }

    const newCat = await storage.createCategory({
      name: name.trim(),
      description: description ? description.trim() : "",
      color: color || "purple",
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully!",
      category: newCat,
    });
  } catch (err) {
    console.error("Create category error:", err);
    res.status(500).json({ error: "Failed to create category." });
  }
});

// PUT /api/categories/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await storage.updateCategory(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.json({
      success: true,
      message: "Category updated successfully!",
      category: updated,
    });
  } catch (err) {
    console.error("Update category error:", err);
    res.status(500).json({ error: "Failed to update category." });
  }
});

// DELETE /api/categories/:id
router.delete("/:id", async (req, res) => {
  try {
    await storage.deleteCategory(req.params.id);
    res.json({ success: true, message: "Category deleted successfully." });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ error: "Failed to delete category." });
  }
});

module.exports = router;

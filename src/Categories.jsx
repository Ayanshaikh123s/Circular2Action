import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categoryAPI } from "./api";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const loadCategories = async () => {
    try {
      const data = await categoryAPI.getAll();
      const list = Array.isArray(data) ? data : (data?.categories || []);
      setCategories(list);
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setCategoryName("");
    setCategoryDescription("");
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setCategoryName("");
    setCategoryDescription("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!categoryName.trim()) {
      return;
    }

    try {
      if (editingCategory) {
        const catId = editingCategory._id || editingCategory.id;
        const updated = await categoryAPI.update(catId, {
          name: categoryName,
          description: categoryDescription,
        });

        setCategories(
          categories.map((category) =>
            (category._id || category.id) === catId
              ? { ...category, ...updated, name: categoryName, description: categoryDescription }
              : category
          )
        );
      } else {
        const colors = ["purple", "blue", "green", "orange", "pink", "gray"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const created = await categoryAPI.create({
          name: categoryName,
          description: categoryDescription || "New circular category.",
          color: randomColor,
        });

        setCategories([...categories, created]);
      }
      closeModal();
    } catch (err) {
      alert(err.message || "Failed to save category");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (confirmDelete) {
      try {
        await categoryAPI.delete(id);
        setCategories(
          categories.filter((category) => (category._id || category.id) !== id)
        );
      } catch (err) {
        alert(err.message || "Failed to delete category");
      }
    }
  };

  return (
    <div className="categories-page">

      {/* Sidebar */}
      <aside className="categories-sidebar">

        <div className="sidebar-brand">
          <div className="brand-mark">C</div>

          <div>
            <h2>Circular2Action</h2>
            <span>Admin Portal</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <Link to="/admin-dashboard" className="nav-item">
            <span className="nav-icon">⌂</span>
            Dashboard
          </Link>

          <p className="nav-section-title">
            CIRCULAR MANAGEMENT
          </p>

          <Link to="/upload-circular" className="nav-item">
            <span className="nav-icon">＋</span>
            Upload Circular
          </Link>

          <Link to="/circular-list" className="nav-item">
            <span className="nav-icon">▤</span>
            Manage Circulars
          </Link>

          <Link
            to="/categories"
            className="nav-item active"
          >
            <span className="nav-icon">◇</span>
            Categories
          </Link>

          <p className="nav-section-title">
            ACTION MANAGEMENT
          </p>

          <Link to="/action-items" className="nav-item">
            <span className="nav-icon">✓</span>
            Action Items
          </Link>

          <Link to="/notifications" className="nav-item">
            <span className="nav-icon">♢</span>
            Notifications
          </Link>

          <p className="nav-section-title">
            STUDENT MANAGEMENT
          </p>

          <Link to="/students" className="nav-item">
            <span className="nav-icon">○</span>
            Students
          </Link>

          <p className="nav-section-title">
            INSIGHTS
          </p>

          <Link to="/analytics" className="nav-item">
            <span className="nav-icon">◩</span>
            Analytics
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <Link to="/profile" className="nav-item">
            <span className="nav-icon">⚙</span>
            Profile
          </Link>

          <Link to="/login" className="nav-item logout-item">
            <span className="nav-icon">↪</span>
            Logout
          </Link>

        </div>

      </aside>


      {/* Main Content */}
      <main className="categories-main">

        {/* Header */}
        <header className="categories-header">

          <div>
            <p className="header-label">
              CIRCULAR MANAGEMENT
            </p>

            <h1>Categories</h1>

            <p className="header-subtitle">
              Organize circulars into meaningful categories.
            </p>
          </div>

          <button
            className="add-category-btn"
            onClick={openAddModal}
          >
            <span>＋</span>
            Add Category
          </button>

        </header>


        {/* Overview */}
        <section className="category-overview">

          <div className="overview-card">

            <div className="overview-icon">
              ◇
            </div>

            <div>
              <span>Total Categories</span>
              <strong>{categories.length}</strong>
            </div>

          </div>


          <div className="overview-card">

            <div className="overview-icon purple">
              ▤
            </div>

            <div>
              <span>Total Circulars</span>
              <strong>
                {categories.reduce(
                  (total, category) => total + (category.count || 0),
                  0
                )}
              </strong>
            </div>

          </div>


          <div className="overview-card">

            <div className="overview-icon green">
              ✓
            </div>

            <div>
              <span>Active Categories</span>
              <strong>{categories.length}</strong>
            </div>

          </div>

        </section>


        {/* Category Grid */}
        <section className="category-section">

          <div className="section-heading">

            <div>
              <h2>All Categories</h2>

              <p>
                Manage categories used for college circulars.
              </p>
            </div>

          </div>


          <div className="category-grid">

            {categories.map((category) => (

              <div
                className="category-card"
                key={category._id || category.id}
              >

                <div className="category-card-top">

                  <div
                    className={`category-symbol ${category.color || "purple"}`}
                  >
                    ◇
                  </div>

                  <div className="category-card-actions">

                    <button
                      className="icon-button edit"
                      onClick={() =>
                        openEditModal(category)
                      }
                      title="Edit category"
                    >
                      ✎
                    </button>

                    <button
                      className="icon-button delete"
                      onClick={() =>
                        handleDelete(category._id || category.id)
                      }
                      title="Delete category"
                    >
                      ×
                    </button>

                  </div>

                </div>


                <h3>{category.name}</h3>

                <p className="category-description">
                  {category.description}
                </p>


                <div className="category-footer">

                  <div>
                    <strong>{category.count || 0}</strong>
                    <span>Circulars</span>
                  </div>

                  <span className="category-status">
                    Active
                  </span>

                </div>

              </div>

            ))}


            {/* Add Category Card */}
            <button
              className="add-category-card"
              onClick={openAddModal}
            >

              <div className="add-card-icon">
                ＋
              </div>

              <strong>
                Add New Category
              </strong>

              <span>
                Create a category for organizing circulars.
              </span>

            </button>

          </div>

        </section>


        {/* Information */}
        <section className="category-info">

          <div className="info-icon">
            ✦
          </div>

          <div>
            <strong>
              Why categories matter
            </strong>

            <p>
              Categories help students quickly find relevant
              circulars and allow admins to analyze announcements
              by type.
            </p>
          </div>

        </section>

      </main>


      {/* Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={closeModal}
        >

          <div
            className="category-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <h2>
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p>
                  {editingCategory
                    ? "Update category information."
                    : "Create a new circular category."}
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeModal}
              >
                ×
              </button>

            </div>


            <form onSubmit={handleSubmit}>

              <div className="modal-field">

                <label>
                  Category Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  value={categoryName}
                  onChange={(event) =>
                    setCategoryName(event.target.value)
                  }
                  placeholder="e.g. Placements"
                  required
                />

              </div>


              <div className="modal-field">

                <label>
                  Description
                </label>

                <textarea
                  value={categoryDescription}
                  onChange={(event) =>
                    setCategoryDescription(
                      event.target.value
                    )
                  }
                  placeholder="Describe what this category is used for..."
                  rows="4"
                ></textarea>

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="modal-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save"
                >
                  {editingCategory
                    ? "Save Changes"
                    : "Add Category"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Categories;
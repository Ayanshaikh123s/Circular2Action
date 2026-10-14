import { useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Academic",
      description: "Academic announcements and study related updates.",
      count: 28,
      color: "purple",
    },
    {
      id: 2,
      name: "Examination",
      description: "Exam schedules, forms, results and examination notices.",
      count: 24,
      color: "blue",
    },
    {
      id: 3,
      name: "Events",
      description: "Workshops, seminars, competitions and college events.",
      count: 19,
      color: "green",
    },
    {
      id: 4,
      name: "Finance",
      description: "Fee payments, scholarships and financial notices.",
      count: 15,
      color: "orange",
    },
    {
      id: 5,
      name: "Student Services",
      description: "Student related announcements and important information.",
      count: 22,
      color: "pink",
    },
    {
      id: 6,
      name: "General",
      description: "General college announcements and notices.",
      count: 20,
      color: "gray",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!categoryName.trim()) {
      return;
    }

    if (editingCategory) {
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                name: categoryName,
                description: categoryDescription,
              }
            : category
        )
      );
    } else {
      const newCategory = {
        id: Date.now(),
        name: categoryName,
        description:
          categoryDescription || "New circular category.",
        count: 0,
        color: "purple",
      };

      setCategories([...categories, newCategory]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (confirmDelete) {
      setCategories(
        categories.filter((category) => category.id !== id)
      );
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
                  (total, category) => total + category.count,
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
                key={category.id}
              >

                <div className="category-card-top">

                  <div
                    className={`category-symbol ${category.color}`}
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
                        handleDelete(category.id)
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
                    <strong>{category.count}</strong>
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
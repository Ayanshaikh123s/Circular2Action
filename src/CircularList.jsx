import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./CircularList.css";

function CircularList() {
  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "all";

  const circulars = [
    {
      id: 1,
      title: "Internal Examination Schedule",
      category: "Examination",
      audience: "All Students",
      date: "28 Sep 2026",
      deadline: "10 Oct 2026",
      status: "Published",
    },
    {
      id: 2,
      title: "Semester 5 Project Submission Guidelines",
      category: "Academic",
      audience: "Semester 5",
      date: "26 Sep 2026",
      deadline: "15 Oct 2026",
      status: "Published",
    },
    {
      id: 3,
      title: "Navratri Holiday Notice",
      category: "General",
      audience: "All Students",
      date: "24 Sep 2026",
      deadline: "—",
      status: "Published",
    },
    {
      id: 4,
      title: "Workshop Registration - Data Analytics",
      category: "Events",
      audience: "BCA Students",
      date: "22 Sep 2026",
      deadline: "05 Oct 2026",
      status: "Draft",
    },
    {
      id: 5,
      title: "Library Book Return Notice",
      category: "Student Services",
      audience: "All Students",
      date: "20 Sep 2026",
      deadline: "30 Sep 2026",
      status: "Published",
    },
    {
      id: 6,
      title: "Fee Payment Reminder",
      category: "Finance",
      audience: "All Students",
      date: "18 Sep 2026",
      deadline: "01 Oct 2026",
      status: "Draft",
    },
    {
      id: 7,
      title: "BCA Semester 3 Internal Assessment",
      category: "Academic",
      audience: "Semester 3",
      date: "16 Sep 2026",
      deadline: "25 Sep 2026",
      status: "Published",
    },
    {
      id: 8,
      title: "Mid Semester Examination Guidelines",
      category: "Examination",
      audience: "All Students",
      date: "15 Sep 2026",
      deadline: "28 Sep 2026",
      status: "Published",
    },
    {
      id: 9,
      title: "College Cultural Fest Registration",
      category: "Events",
      audience: "All Students",
      date: "13 Sep 2026",
      deadline: "30 Sep 2026",
      status: "Published",
    },
    {
      id: 10,
      title: "Scholarship Application Notice",
      category: "Finance",
      audience: "Eligible Students",
      date: "12 Sep 2026",
      deadline: "05 Oct 2026",
      status: "Published",
    },
    {
      id: 11,
      title: "Student ID Card Renewal",
      category: "Student Services",
      audience: "All Students",
      date: "10 Sep 2026",
      deadline: "25 Sep 2026",
      status: "Published",
    },
    {
      id: 12,
      title: "MCA Semester 1 Orientation",
      category: "Academic",
      audience: "MCA Students",
      date: "08 Sep 2026",
      deadline: "—",
      status: "Published",
    },
    {
      id: 13,
      title: "Examination Form Submission",
      category: "Examination",
      audience: "All Students",
      date: "06 Sep 2026",
      deadline: "20 Sep 2026",
      status: "Published",
    },
    {
      id: 14,
      title: "Sports Week Participation Notice",
      category: "Events",
      audience: "All Students",
      date: "04 Sep 2026",
      deadline: "18 Sep 2026",
      status: "Draft",
    },
    {
      id: 15,
      title: "Hostel Fee Payment Notice",
      category: "Finance",
      audience: "Hostel Students",
      date: "02 Sep 2026",
      deadline: "20 Sep 2026",
      status: "Published",
    },
    {
      id: 16,
      title: "Library Membership Renewal",
      category: "Student Services",
      audience: "All Students",
      date: "30 Aug 2026",
      deadline: "15 Sep 2026",
      status: "Published",
    },
    {
      id: 17,
      title: "Semester 1 Academic Calendar",
      category: "Academic",
      audience: "Semester 1",
      date: "28 Aug 2026",
      deadline: "—",
      status: "Published",
    },
    {
      id: 18,
      title: "Practical Examination Schedule",
      category: "Examination",
      audience: "BCA Students",
      date: "26 Aug 2026",
      deadline: "12 Sep 2026",
      status: "Published",
    },
    {
      id: 19,
      title: "Freshers Welcome Event",
      category: "Events",
      audience: "Semester 1",
      date: "24 Aug 2026",
      deadline: "05 Sep 2026",
      status: "Draft",
    },
    {
      id: 20,
      title: "Student Welfare Support Notice",
      category: "Student Services",
      audience: "All Students",
      date: "22 Aug 2026",
      deadline: "—",
      status: "Published",
    },
    {
      id: 21,
      title: "General College Guidelines",
      category: "General",
      audience: "All Students",
      date: "20 Aug 2026",
      deadline: "—",
      status: "Published",
    },
    {
      id: 22,
      title: "Annual Fee Structure Notice",
      category: "Finance",
      audience: "All Students",
      date: "18 Aug 2026",
      deadline: "30 Sep 2026",
      status: "Published",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(
    categoryFromUrl.toLowerCase()
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    setCategoryFilter(categoryFromUrl.toLowerCase());
    setCurrentPage(1);
  }, [categoryFromUrl]);

  const filteredCirculars = useMemo(() => {
    return circulars.filter((circular) => {
      const matchesSearch = circular.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        circular.category.toLowerCase() === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        circular.status.toLowerCase() === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchText, categoryFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCirculars.length / itemsPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const displayedCirculars = filteredCirculars.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const startNumber =
    filteredCirculars.length === 0 ? 0 : startIndex + 1;

  const endNumber = Math.min(
    startIndex + itemsPerPage,
    filteredCirculars.length
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleView = (circular) => {
    alert(
      `Circular Details\n\nTitle: ${circular.title}\nCategory: ${circular.category}\nAudience: ${circular.audience}\nStatus: ${circular.status}`
    );
  };

  const handleEdit = (circular) => {
    alert(`Edit Circular:\n\n${circular.title}`);
  };

  const handleDelete = (circular) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${circular.title}"?`
    );

    if (confirmed) {
      alert("Delete functionality will be connected to the backend later.");
    }
  };

  return (
    <div className="circular-list-page">

      {/* Sidebar */}
      <aside className="circular-sidebar">

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

          <Link
            to="/circular-list"
            className="nav-item active"
          >
            <span className="nav-icon">▤</span>
            Manage Circulars
          </Link>

          <Link to="/categories" className="nav-item">
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


      {/* Main */}
      <main className="circular-main">

        {/* Header */}
        <header className="circular-header">

          <div>
            <p className="header-label">
              CIRCULAR MANAGEMENT
            </p>

            <h1>Manage Circulars</h1>

            <p className="header-subtitle">
              View, search and manage all college circulars.
            </p>
          </div>

          <Link
            to="/upload-circular"
            className="add-circular-btn"
          >
            <span>＋</span>
            New Circular
          </Link>

        </header>


        {/* Stats */}
        <div className="circular-stats">

          <div className="mini-stat">
            <div className="mini-stat-icon">▤</div>

            <div>
              <span>Total Circulars</span>
              <strong>128</strong>
            </div>
          </div>

          <div className="mini-stat">
            <div className="mini-stat-icon published-icon">
              ✓
            </div>

            <div>
              <span>Published</span>
              <strong>116</strong>
            </div>
          </div>

          <div className="mini-stat">
            <div className="mini-stat-icon draft-icon">
              ◷
            </div>

            <div>
              <span>Drafts</span>
              <strong>12</strong>
            </div>
          </div>

          <div className="mini-stat">
            <div className="mini-stat-icon action-icon">
              !
            </div>

            <div>
              <span>With Actions</span>
              <strong>74</strong>
            </div>
          </div>

        </div>


        {/* Filters */}
        <section className="filter-card">

          <div className="search-box">

            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search circulars by title..."
              value={searchText}
              onChange={handleSearch}
            />

          </div>


          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
          >
            <option value="all">
              All Categories
            </option>

            <option value="academic">
              Academic
            </option>

            <option value="examination">
              Examination
            </option>

            <option value="events">
              Events
            </option>

            <option value="finance">
              Finance
            </option>

            <option value="general">
              General
            </option>

            <option value="student services">
              Student Services
            </option>
          </select>


          <select
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="all">
              All Status
            </option>

            <option value="published">
              Published
            </option>

            <option value="draft">
              Draft
            </option>
          </select>

        </section>


        {/* Circular Table */}
        <section className="table-card">

          <div className="table-header">

            <div>
              <h2>All Circulars</h2>

              <p>
                Showing {filteredCirculars.length} circulars
              </p>
            </div>

            <button
              className="filter-btn"
              onClick={() => {
                setSearchText("");
                setCategoryFilter("all");
                setStatusFilter("all");
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </button>

          </div>


          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>CIRCULAR</th>
                  <th>CATEGORY</th>
                  <th>AUDIENCE</th>
                  <th>PUBLISHED</th>
                  <th>DEADLINE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>

                {displayedCirculars.length > 0 ? (

                  displayedCirculars.map((circular) => (

                    <tr key={circular.id}>

                      <td>
                        <div className="circular-name">

                          <div className="document-icon">
                            ▤
                          </div>

                          <div>
                            <strong>
                              {circular.title}
                            </strong>

                            <span>
                              C2A/2026/
                              {String(circular.id).padStart(3, "0")}
                            </span>
                          </div>

                        </div>
                      </td>


                      <td>
                        <span className="category-badge">
                          {circular.category}
                        </span>
                      </td>


                      <td>
                        <span className="audience-text">
                          {circular.audience}
                        </span>
                      </td>


                      <td>
                        <span className="date-text">
                          {circular.date}
                        </span>
                      </td>


                      <td>
                        <span className="date-text">
                          {circular.deadline}
                        </span>
                      </td>


                      <td>

                        <span
                          className={`status-badge ${
                            circular.status === "Published"
                              ? "published"
                              : "draft"
                          }`}
                        >
                          <span className="status-dot"></span>
                          {circular.status}
                        </span>

                      </td>


                      <td>

                        <div className="action-buttons">

                          <button
                            className="table-action view"
                            title="View"
                            onClick={() => handleView(circular)}
                          >
                            ↗
                          </button>

                          <button
                            className="table-action edit"
                            title="Edit"
                            onClick={() => handleEdit(circular)}
                          >
                            ✎
                          </button>

                          <button
                            className="table-action delete"
                            title="Delete"
                            onClick={() => handleDelete(circular)}
                          >
                            ×
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="7">
                      <div className="no-results">
                        No circulars found matching your filters.
                      </div>
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* Pagination */}
          <div className="pagination">

            <span>
              Showing{" "}
              <strong>
                {startNumber}–{endNumber}
              </strong>{" "}
              of{" "}
              <strong>
                {filteredCirculars.length}
              </strong>
            </span>

            <div className="pagination-buttons">

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
              >
                ‹
              </button>


              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (

                <button
                  key={page}
                  className={
                    currentPage === page
                      ? "page-active"
                      : ""
                  }
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>

              ))}


              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
              >
                ›
              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default CircularList;
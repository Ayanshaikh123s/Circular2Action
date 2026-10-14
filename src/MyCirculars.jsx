import { useState } from "react";
import { Link } from "react-router-dom";
import "./MyCirculars.css";

function MyCirculars() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const circulars = [
    {
      id: 1,
      title: "Internal Examination Schedule",
      category: "Examination",
      audience: "All Students",
      date: "28 Sep 2026",
      deadline: "10 Oct 2026",
      status: "Published",
      actionRequired: true,
      description:
        "The internal examination schedule for all semesters has been published.",
    },
    {
      id: 2,
      title: "Semester 5 Project Submission Guidelines",
      category: "Academic",
      audience: "Semester 5",
      date: "26 Sep 2026",
      deadline: "15 Oct 2026",
      status: "Published",
      actionRequired: true,
      description:
        "Students are required to follow the project submission guidelines and submit their reports before the deadline.",
    },
    {
      id: 3,
      title: "Navratri Holiday Notice",
      category: "General",
      audience: "All Students",
      date: "24 Sep 2026",
      deadline: "—",
      status: "Published",
      actionRequired: false,
      description:
        "The college will remain closed during the announced Navratri holiday period.",
    },
    {
      id: 4,
      title: "Workshop Registration - Data Analytics",
      category: "Events",
      audience: "BCA Students",
      date: "22 Sep 2026",
      deadline: "05 Oct 2026",
      status: "Published",
      actionRequired: true,
      description:
        "Students can register for the upcoming Data Analytics workshop.",
    },
    {
      id: 5,
      title: "Library Book Return Notice",
      category: "Student Services",
      audience: "All Students",
      date: "20 Sep 2026",
      deadline: "30 Sep 2026",
      status: "Published",
      actionRequired: true,
      description:
        "Students are requested to return borrowed library books before the due date.",
    },
    {
      id: 6,
      title: "Fee Payment Reminder",
      category: "Finance",
      audience: "All Students",
      date: "18 Sep 2026",
      deadline: "01 Oct 2026",
      status: "Published",
      actionRequired: true,
      description:
        "Students are reminded to complete their applicable fee payments before the deadline.",
    },
    {
      id: 7,
      title: "College Cultural Fest Registration",
      category: "Events",
      audience: "All Students",
      date: "13 Sep 2026",
      deadline: "30 Sep 2026",
      status: "Published",
      actionRequired: true,
      description:
        "Registration is open for students interested in participating in the college cultural fest.",
    },
    {
      id: 8,
      title: "Student ID Card Renewal",
      category: "Student Services",
      audience: "All Students",
      date: "10 Sep 2026",
      deadline: "25 Sep 2026",
      status: "Published",
      actionRequired: false,
      description:
        "Students whose ID cards require renewal can submit their renewal request.",
    },
    {
      id: 9,
      title: "Practical Examination Schedule",
      category: "Examination",
      audience: "BCA Students",
      date: "26 Aug 2026",
      deadline: "12 Sep 2026",
      status: "Published",
      actionRequired: false,
      description:
        "The practical examination schedule for BCA students has been announced.",
    },
    {
      id: 10,
      title: "Student Welfare Support Notice",
      category: "Student Services",
      audience: "All Students",
      date: "22 Aug 2026",
      deadline: "—",
      status: "Published",
      actionRequired: false,
      description:
        "Information about available student welfare and support services.",
    },
  ];

  const filteredCirculars = circulars.filter((circular) => {
    const matchesSearch =
      circular.title.toLowerCase().includes(search.toLowerCase()) ||
      circular.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || circular.category === category;

    const matchesStatus =
      status === "All" || circular.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleView = (circular) => {
    alert(
      `Circular: ${circular.title}\n\n${circular.description}\n\nDeadline: ${circular.deadline}`
    );
  };

  return (
    <div className="student-layout">

      {/* ================= SIDEBAR ================= */}

      <aside className="student-sidebar">

        <div className="student-sidebar-brand">

          <div className="student-brand-icon">
            C
          </div>

          <div>
            <h2>Circular2Action</h2>
            <span>Student Portal</span>
          </div>

        </div>


        <nav className="student-navigation">

          <Link
            to="/student-dashboard"
            className="student-nav-item"
          >
            <span className="student-nav-icon">⌂</span>
            Dashboard
          </Link>


          <div className="student-nav-section">
            CIRCULARS
          </div>

          <Link
            to="/my-circulars"
            className="student-nav-item active"
          >
            <span className="student-nav-icon">▤</span>
            My Circulars
          </Link>

          <Link
            to="/important-circulars"
            className="student-nav-item"
          >
            <span className="student-nav-icon">★</span>
            Important Circulars
          </Link>

          <Link
            to="/circular-history"
            className="student-nav-item"
          >
            <span className="student-nav-icon">◷</span>
            Circular History
          </Link>


          <div className="student-nav-section">
            ACTION MANAGEMENT
          </div>

          <Link
            to="/my-actions"
            className="student-nav-item"
          >
            <span className="student-nav-icon">✓</span>
            My Actions
          </Link>

          <Link
            to="/pending-actions"
            className="student-nav-item"
          >
            <span className="student-nav-icon">!</span>
            Pending Actions
          </Link>

          <Link
            to="/completed-actions"
            className="student-nav-item"
          >
            <span className="student-nav-icon">✓</span>
            Completed Actions
          </Link>


          <div className="student-nav-section">
            NOTIFICATIONS
          </div>

          <Link
            to="/student-notifications"
            className="student-nav-item"
          >
            <span className="student-nav-icon">♢</span>
            Notifications
          </Link>


          <div className="student-nav-section">
            ACADEMIC
          </div>

          <Link
            to="/academic-calendar"
            className="student-nav-item"
          >
            <span className="student-nav-icon">▦</span>
            Academic Calendar
          </Link>

          <Link
            to="/important-dates"
            className="student-nav-item"
          >
            <span className="student-nav-icon">◫</span>
            Important Dates
          </Link>


          <div className="student-nav-section">
            ACCOUNT
          </div>

          <Link
            to="/student-profile"
            className="student-nav-item"
          >
            <span className="student-nav-icon">○</span>
            Profile
          </Link>

          <Link
            to="/login"
            className="student-nav-item student-logout"
          >
            <span className="student-nav-icon">↪</span>
            Logout
          </Link>

        </nav>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="student-main">

        <header className="student-page-header">

          <div>
            <p className="student-page-label">
              CIRCULARS
            </p>

            <h1>
              My Circulars
            </h1>

            <p>
              View and manage college circulars relevant to you.
            </p>
          </div>

          <div className="student-header-badge">
            {filteredCirculars.length} Circulars
          </div>

        </header>


        {/* ================= FILTER SECTION ================= */}

        <section className="circular-filter-card">

          <div className="circular-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search circulars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <div className="circular-filter">

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Academic">Academic</option>
              <option value="Examination">Examination</option>
              <option value="Events">Events</option>
              <option value="Finance">Finance</option>
              <option value="Student Services">
                Student Services
              </option>
              <option value="General">General</option>
            </select>

          </div>


          <div className="circular-filter">

            <label>
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
            </select>

          </div>

        </section>


        {/* ================= CIRCULAR LIST ================= */}

        <section className="circular-list-card">

          <div className="circular-list-header">

            <div>
              <h2>
                Available Circulars
              </h2>

              <p>
                Latest college announcements and notices
              </p>
            </div>

          </div>


          <div className="circular-table">

            <div className="circular-table-head">

              <span>
                Circular
              </span>

              <span>
                Category
              </span>

              <span>
                Audience
              </span>

              <span>
                Published
              </span>

              <span>
                Deadline
              </span>

              <span>
                Action
              </span>

            </div>


            {filteredCirculars.length > 0 ? (
              filteredCirculars.map((circular) => (

                <div
                  className="circular-table-row"
                  key={circular.id}
                >

                  <div className="circular-title-cell">

                    <div className="circular-title-icon">
                      C
                    </div>

                    <div>

                      <h3>
                        {circular.title}
                      </h3>

                      <div className="circular-meta">

                        {circular.actionRequired && (
                          <span className="action-required">
                            Action Required
                          </span>
                        )}

                        <span>
                          {circular.status}
                        </span>

                      </div>

                    </div>

                  </div>


                  <div>
                    <span
                      className={`category-badge ${circular.category
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {circular.category}
                    </span>
                  </div>


                  <div className="audience-text">
                    {circular.audience}
                  </div>


                  <div className="date-text">
                    {circular.date}
                  </div>


                  <div className="date-text">
                    {circular.deadline}
                  </div>


                  <div>

                    <button
                      className="view-circular-btn"
                      onClick={() => handleView(circular)}
                    >
                      View
                    </button>

                  </div>

                </div>

              ))
            ) : (

              <div className="no-circulars">
                <div className="no-circulars-icon">
                  ◌
                </div>

                <h3>
                  No circulars found
                </h3>

                <p>
                  Try changing your search or filters.
                </p>
              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default MyCirculars;
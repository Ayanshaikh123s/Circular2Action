import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { circularAPI } from "./api";
import CircularPosterModal from "./CircularPosterModal";
import { isEventCircular, isExamCircular } from "./utils/circularClassifier";
import "./MyCirculars.css";

function MyCirculars() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [circulars, setCirculars] = useState([]);
  const [selectedPosterCircular, setSelectedPosterCircular] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCirculars() {
      try {
        const data = await circularAPI.getAll();
        const list = Array.isArray(data) ? data : (data?.circulars || []);
        setCirculars(list);
      } catch (err) {
        console.error("Failed to fetch circulars:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCirculars();
  }, []);

  const filteredCirculars = circulars.filter((circular) => {
    const title = circular.title || "";
    const cat = circular.category || "";
    const stat = circular.status || "Published";

    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      cat.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || cat === category;

    const matchesStatus =
      status === "All" || stat === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleView = (circular) => {
    setSelectedPosterCircular(circular);
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
                  key={circular._id || circular.id}
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
                          {circular.status || "Published"}
                        </span>

                      </div>

                    </div>

                  </div>


                  <div>
                    <span
                      className={`category-badge ${(circular.category || "General")
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {circular.category || "General"}
                    </span>
                  </div>


                  <div className="audience-text">
                    {circular.targetAudience || circular.audience || "All Students"}
                  </div>


                  <div className="date-text">
                    {circular.date || "—"}
                  </div>


                  <div className="date-text">
                    {circular.deadline || "—"}
                  </div>


                  <div>

                    <button
                      className={`view-circular-btn ${
                        isEventCircular(circular)
                          ? "btn-event-pill"
                          : isExamCircular(circular)
                          ? "btn-exam-pill"
                          : "btn-notice-pill"
                      }`}
                      onClick={() => handleView(circular)}
                      title={
                        isEventCircular(circular)
                          ? "View Event Poster Flyer"
                          : isExamCircular(circular)
                          ? "View Examination Timetable Date-Sheet"
                          : "View Official Faculty Notice"
                      }
                    >
                      {isEventCircular(circular)
                        ? "🎨 Poster"
                        : isExamCircular(circular)
                        ? "📅 Timetable"
                        : "💬 Notice"}
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
      {selectedPosterCircular && (
        <CircularPosterModal
          circular={selectedPosterCircular}
          onClose={() => setSelectedPosterCircular(null)}
        />
      )}
    </div>
  );
}

export default MyCirculars;
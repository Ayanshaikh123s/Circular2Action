import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { circularAPI } from "./api";
import CircularPosterModal from "./CircularPosterModal";
import { isEventCircular, isExamCircular } from "./utils/circularClassifier";
import "./CircularHistory.css";

function CircularHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [circularHistory, setCircularHistory] = useState([]);
  const [selectedPosterCircular, setSelectedPosterCircular] = useState(null);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await circularAPI.getAll();
        const list = Array.isArray(data) ? data : (data?.circulars || []);
        setCircularHistory(list);
      } catch (err) {
        console.error("Failed to load circular history:", err);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const filteredCirculars = circularHistory.filter((circular) => {
    const title = circular.title || "";
    const category = circular.category || "";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleView = (circular) => {
    setSelectedPosterCircular(circular);
  };

  return (
    <div className="history-page">
      <aside className="student-sidebar">
        <div className="student-brand">
          <div className="student-brand-icon">C</div>

          <div>
            <h2>Circular2Action</h2>
            <span>Student Portal</span>
          </div>
        </div>

        <nav className="student-navigation">
          <p className="student-nav-heading">DASHBOARD</p>

          <Link to="/student-dashboard" className="student-nav-item">
            <span className="student-nav-icon">⌂</span>
            Dashboard
          </Link>

          <p className="student-nav-heading">CIRCULARS</p>

          <Link to="/my-circulars" className="student-nav-item">
            <span className="student-nav-icon">▤</span>
            My Circulars
          </Link>

          <Link to="/important-circulars" className="student-nav-item">
            <span className="student-nav-icon">★</span>
            Important Circulars
          </Link>

          <Link
            to="/circular-history"
            className="student-nav-item active"
          >
            <span className="student-nav-icon">◷</span>
            Circular History
          </Link>

          <p className="student-nav-heading">ACTION MANAGEMENT</p>

          <Link to="/my-actions" className="student-nav-item">
            <span className="student-nav-icon">✓</span>
            My Actions
          </Link>

          <Link to="/pending-actions" className="student-nav-item">
            <span className="student-nav-icon">◌</span>
            Pending Actions
          </Link>

          <Link to="/completed-actions" className="student-nav-item">
            <span className="student-nav-icon">✓</span>
            Completed Actions
          </Link>

          <p className="student-nav-heading">NOTIFICATIONS</p>

          <Link
            to="/student-notifications"
            className="student-nav-item"
          >
            <span className="student-nav-icon">♢</span>
            Notifications
          </Link>

          <p className="student-nav-heading">ACADEMIC</p>

          <Link to="/academic-calendar" className="student-nav-item">
            <span className="student-nav-icon">▣</span>
            Academic Calendar
          </Link>

          <Link to="/important-dates" className="student-nav-item">
            <span className="student-nav-icon">◫</span>
            Important Dates
          </Link>

          <p className="student-nav-heading">ACCOUNT</p>

          <Link to="/student-profile" className="student-nav-item">
            <span className="student-nav-icon">◯</span>
            Profile
          </Link>

          <Link to="/login" className="student-nav-item logout-item">
            <span className="student-nav-icon">↪</span>
            Logout
          </Link>
        </nav>
      </aside>

      <main className="history-main">
        <header className="history-header">
          <div>
            <p className="history-eyebrow">CIRCULARS</p>
            <h1>Circular History</h1>
            <p>
              View previously published college circulars and their details.
            </p>
          </div>

          <div className="history-profile">
            <div className="history-avatar">
              {studentName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{studentName}</strong>
              <span>
                {semester ? `Semester ${semester}` : "Student"}
              </span>
            </div>
          </div>
        </header>

        <section className="history-summary">
          <div className="history-summary-card">
            <div className="history-summary-icon">▤</div>
            <div>
              <strong>{circularHistory.length}</strong>
              <p>Total Past Circulars</p>
            </div>
          </div>

          <div className="history-summary-card">
            <div className="history-summary-icon completed-icon">
              ✓
            </div>
            <div>
              <strong>
                {
                  circularHistory.filter(
                    (item) => item.status === "Completed"
                  ).length
                }
              </strong>
              <p>Completed</p>
            </div>
          </div>

          <div className="history-summary-card">
            <div className="history-summary-icon closed-icon">
              ◷
            </div>
            <div>
              <strong>
                {
                  circularHistory.filter(
                    (item) => item.status === "Closed"
                  ).length
                }
              </strong>
              <p>Closed</p>
            </div>
          </div>
        </section>

        <section className="history-content-card">
          <div className="history-toolbar">
            <div>
              <h2>Previous Circulars</h2>
              <p>
                Circulars from previous academic activities and announcements.
              </p>
            </div>

            <div className="history-filters">
              <div className="history-search">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search circulars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Academic">Academic</option>
                <option value="Examination">Examination</option>
                <option value="Events">Events</option>
                <option value="Student Services">
                  Student Services
                </option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <div className="history-list">
            {filteredCirculars.length > 0 ? (
              filteredCirculars.map((circular) => (
                <div className="history-item" key={circular._id || circular.id}>
                  <div className="history-item-left">
                    <div className="history-document-icon">▤</div>

                    <div className="history-item-info">
                      <div className="history-title-row">
                        <h3>{circular.title}</h3>

                        <span
                          className={`history-status ${(circular.status || "Published")
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {circular.status || "Published"}
                        </span>
                      </div>

                      <div className="history-meta">
                        <span>{circular.category || "General"}</span>
                        <span>•</span>
                        <span>{circular.targetAudience || circular.audience || "All Students"}</span>
                      </div>

                      <div className="history-dates">
                        <span>
                          Issued: <strong>{circular.date || circular.issuedDate || "—"}</strong>
                        </span>

                        <span>
                          Deadline: <strong>{circular.deadline || "—"}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className={`history-view-btn ${
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
              ))
            ) : (
              <div className="history-empty">
                <div>⌕</div>
                <h3>No circular history found</h3>
                <p>
                  Try changing your search or category filter.
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

export default CircularHistory;
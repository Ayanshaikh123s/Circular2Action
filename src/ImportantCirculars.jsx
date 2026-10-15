import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { circularAPI } from "./api";
import CircularPosterModal from "./CircularPosterModal";
import { isEventCircular, isExamCircular } from "./utils/circularClassifier";
import "./ImportantCirculars.css";

function ImportantCirculars() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [importantCirculars, setImportantCirculars] = useState([]);
  const [selectedPosterCircular, setSelectedPosterCircular] = useState(null);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  useEffect(() => {
    async function loadImportantCirculars() {
      try {
        const data = await circularAPI.getAll();
        const list = Array.isArray(data) ? data : (data?.circulars || []);
        // Filter for important or action required circulars
        const filtered = list.filter(
          (c) => Boolean(c.actionRequired) || c.priority === "High" || c.priority === "Urgent" || c.priority === "Medium"
        );
        setImportantCirculars(filtered);
      } catch (err) {
        console.error("Failed to load important circulars:", err);
      } finally {
        setLoading(false);
      }
    }
    loadImportantCirculars();
  }, []);

  const filteredCirculars = importantCirculars.filter((circular) => {
    const title = circular.title || "";
    const category = circular.category || "";
    const priority = circular.priority || "Normal";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" || priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const handleView = (circular) => {
    setSelectedPosterCircular(circular);
  };

  return (
    <div className="important-page">
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

          <Link
            to="/important-circulars"
            className="student-nav-item active"
          >
            <span className="student-nav-icon">★</span>
            Important Circulars
          </Link>

          <Link to="/circular-history" className="student-nav-item">
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

          <Link to="/student-notifications" className="student-nav-item">
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

      <main className="important-main">
        <header className="important-header">
          <div>
            <p className="important-eyebrow">CIRCULARS</p>
            <h1>Important Circulars</h1>
            <p>
              View important college circulars that require your attention or
              action.
            </p>
          </div>

          <div className="important-profile">
            <div className="important-avatar">
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

        <section className="important-summary">
          <div className="summary-card">
            <span className="summary-icon">!</span>
            <div>
              <strong>{importantCirculars.length}</strong>
              <p>Important Circulars</p>
            </div>
          </div>

          <div className="summary-card">
            <span className="summary-icon high-icon">↑</span>
            <div>
              <strong>
                {
                  importantCirculars.filter(
                    (item) => item.priority === "High"
                  ).length
                }
              </strong>
              <p>High Priority</p>
            </div>
          </div>

          <div className="summary-card">
            <span className="summary-icon action-icon">✓</span>
            <div>
              <strong>
                {
                  importantCirculars.filter(
                    (item) => item.action === "Required"
                  ).length
                }
              </strong>
              <p>Actions Required</p>
            </div>
          </div>
        </section>

        <section className="important-content-card">
          <div className="important-toolbar">
            <div>
              <h2>Action Required Circulars</h2>
              <p>
                These circulars may contain deadlines, registrations or other
                important student actions.
              </p>
            </div>

            <div className="important-filters">
              <div className="important-search">
                <span>⌕</span>
                <input
                  type="text"
                  placeholder="Search circulars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Priority</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
              </select>
            </div>
          </div>

          <div className="important-list">
            {filteredCirculars.length > 0 ? (
              filteredCirculars.map((circular) => (
                <div className="important-item" key={circular._id || circular.id}>
                  <div className="important-item-left">
                    <div className="circular-symbol">!</div>

                    <div className="important-item-info">
                      <div className="important-title-row">
                        <h3>{circular.title}</h3>

                        <span
                          className={`priority-badge ${(circular.priority || "Normal").toLowerCase()}`}
                        >
                          {circular.priority || "Normal"}
                        </span>
                      </div>

                      <div className="important-meta">
                        <span>{circular.category}</span>
                        <span>•</span>
                        <span>{circular.targetAudience || circular.audience || "All Students"}</span>
                        <span>•</span>
                        <span>Issued {circular.date || circular.issuedDate || "—"}</span>
                      </div>

                      <div className="important-deadline">
                        <span>Deadline</span>
                        <strong>{circular.deadline || "—"}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="important-item-right">
                    <span className="action-required">
                      Action Required
                    </span>

                    <button
                      className={`view-important-btn ${
                        isEventCircular(circular)
                          ? "btn-event-theme"
                          : isExamCircular(circular)
                          ? "btn-exam-theme"
                          : "btn-notice-theme"
                      }`}
                      onClick={() => handleView(circular)}
                      title={
                        isEventCircular(circular)
                          ? "View Official Event Poster"
                          : isExamCircular(circular)
                          ? "View Examination Timetable Date-Sheet"
                          : "View Official Faculty Notice"
                      }
                    >
                      {isEventCircular(circular)
                        ? "🎨 View Poster"
                        : isExamCircular(circular)
                        ? "📅 View Timetable"
                        : "💬 View Notice"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="important-empty">
                <div>⌕</div>
                <h3>No important circulars found</h3>
                <p>
                  Try changing your search or priority filter.
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

export default ImportantCirculars;
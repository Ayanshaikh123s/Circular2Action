import { useState } from "react";
import { Link } from "react-router-dom";
import "./CircularHistory.css";

const circularHistory = [
  {
    id: 1,
    title: "Practical Examination Schedule",
    category: "Examination",
    audience: "BCA Students",
    issuedDate: "26 Aug 2026",
    deadline: "12 Sep 2026",
    status: "Completed",
    description:
      "The practical examination schedule for BCA students was published with subject-wise dates and timings.",
  },
  {
    id: 2,
    title: "Student ID Card Renewal",
    category: "Student Services",
    audience: "All Students",
    issuedDate: "10 Sep 2026",
    deadline: "25 Sep 2026",
    status: "Closed",
    description:
      "Students were requested to complete the renewal process for their college identity cards.",
  },
  {
    id: 3,
    title: "Orientation Programme Notice",
    category: "General",
    audience: "Semester 5 Students",
    issuedDate: "05 Aug 2026",
    deadline: "20 Aug 2026",
    status: "Closed",
    description:
      "An orientation programme was conducted for students to provide important academic information.",
  },
  {
    id: 4,
    title: "Independence Day Celebration",
    category: "Events",
    audience: "All Students",
    issuedDate: "08 Aug 2026",
    deadline: "15 Aug 2026",
    status: "Completed",
    description:
      "Students were invited to participate in the college Independence Day celebration.",
  },
  {
    id: 5,
    title: "Semester Registration Notice",
    category: "Academic",
    audience: "All Students",
    issuedDate: "28 Jul 2026",
    deadline: "08 Aug 2026",
    status: "Closed",
    description:
      "Students were required to complete their semester registration within the given period.",
  },
  {
    id: 6,
    title: "Library Membership Renewal",
    category: "Student Services",
    audience: "All Students",
    issuedDate: "22 Jul 2026",
    deadline: "31 Jul 2026",
    status: "Completed",
    description:
      "Students were informed about the annual library membership renewal process.",
  },
  {
    id: 7,
    title: "Internal Assessment Submission",
    category: "Academic",
    audience: "BCA Students",
    issuedDate: "15 Jul 2026",
    deadline: "25 Jul 2026",
    status: "Closed",
    description:
      "Students were required to submit their internal assessment work before the deadline.",
  },
  {
    id: 8,
    title: "Sports Week Registration",
    category: "Events",
    audience: "All Students",
    issuedDate: "10 Jul 2026",
    deadline: "18 Jul 2026",
    status: "Completed",
    description:
      "Students could register for different sports activities conducted during the college sports week.",
  },
];

function CircularHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  const filteredCirculars = circularHistory.filter((circular) => {
    const matchesSearch =
      circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      circular.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || circular.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleView = (circular) => {
    alert(
      `Title: ${circular.title}\n\nCategory: ${circular.category}\nAudience: ${circular.audience}\nIssued: ${circular.issuedDate}\nDeadline: ${circular.deadline}\nStatus: ${circular.status}\n\n${circular.description}`
    );
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
                <div className="history-item" key={circular.id}>
                  <div className="history-item-left">
                    <div className="history-document-icon">▤</div>

                    <div className="history-item-info">
                      <div className="history-title-row">
                        <h3>{circular.title}</h3>

                        <span
                          className={`history-status ${circular.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {circular.status}
                        </span>
                      </div>

                      <div className="history-meta">
                        <span>{circular.category}</span>
                        <span>•</span>
                        <span>{circular.audience}</span>
                      </div>

                      <div className="history-dates">
                        <span>
                          Issued: <strong>{circular.issuedDate}</strong>
                        </span>

                        <span>
                          Deadline: <strong>{circular.deadline}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="history-view-btn"
                    onClick={() => handleView(circular)}
                  >
                    View Circular
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
    </div>
  );
}

export default CircularHistory;
import { useState } from "react";
import { Link } from "react-router-dom";
import "./ImportantCirculars.css";

const importantCirculars = [
  {
    id: 1,
    title: "Internal Examination Schedule",
    category: "Examination",
    audience: "All Students",
    issuedDate: "28 Sep 2026",
    deadline: "10 Oct 2026",
    priority: "High",
    action: "Required",
    description:
      "Students are required to check the examination schedule and complete the examination form before the deadline.",
  },
  {
    id: 2,
    title: "Semester 5 Project Submission Guidelines",
    category: "Academic",
    audience: "Semester 5",
    issuedDate: "26 Sep 2026",
    deadline: "15 Oct 2026",
    priority: "High",
    action: "Required",
    description:
      "Semester 5 students must submit their project report according to the given submission guidelines.",
  },
  {
    id: 3,
    title: "Workshop Registration - Data Analytics",
    category: "Events",
    audience: "BCA Students",
    issuedDate: "22 Sep 2026",
    deadline: "05 Oct 2026",
    priority: "Medium",
    action: "Required",
    description:
      "Students interested in the Data Analytics workshop must complete their registration before the deadline.",
  },
  {
    id: 4,
    title: "Library Book Return Notice",
    category: "Student Services",
    audience: "All Students",
    issuedDate: "20 Sep 2026",
    deadline: "30 Sep 2026",
    priority: "High",
    action: "Required",
    description:
      "Students with issued library books are requested to return them before the mentioned deadline.",
  },
  {
    id: 5,
    title: "Fee Payment Reminder",
    category: "Finance",
    audience: "All Students",
    issuedDate: "18 Sep 2026",
    deadline: "01 Oct 2026",
    priority: "High",
    action: "Required",
    description:
      "Students are requested to complete their pending fee payment before the payment deadline.",
  },
  {
    id: 6,
    title: "College Cultural Fest Registration",
    category: "Events",
    audience: "All Students",
    issuedDate: "13 Sep 2026",
    deadline: "30 Sep 2026",
    priority: "Medium",
    action: "Required",
    description:
      "Students interested in participating in the cultural fest can complete their registration before the deadline.",
  },
];

function ImportantCirculars() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  const filteredCirculars = importantCirculars.filter((circular) => {
    const matchesSearch =
      circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      circular.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" || circular.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const handleView = (circular) => {
    alert(
      `Title: ${circular.title}\n\nCategory: ${circular.category}\nPriority: ${circular.priority}\nDeadline: ${circular.deadline}\n\n${circular.description}`
    );
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
                <div className="important-item" key={circular.id}>
                  <div className="important-item-left">
                    <div className="circular-symbol">!</div>

                    <div className="important-item-info">
                      <div className="important-title-row">
                        <h3>{circular.title}</h3>

                        <span
                          className={`priority-badge ${circular.priority.toLowerCase()}`}
                        >
                          {circular.priority}
                        </span>
                      </div>

                      <div className="important-meta">
                        <span>{circular.category}</span>
                        <span>•</span>
                        <span>{circular.audience}</span>
                        <span>•</span>
                        <span>Issued {circular.issuedDate}</span>
                      </div>

                      <div className="important-deadline">
                        <span>Deadline</span>
                        <strong>{circular.deadline}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="important-item-right">
                    <span className="action-required">
                      Action Required
                    </span>

                    <button
                      className="view-important-btn"
                      onClick={() => handleView(circular)}
                    >
                      View Circular
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
    </div>
  );
}

export default ImportantCirculars;
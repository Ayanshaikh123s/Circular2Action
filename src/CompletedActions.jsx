import { useState } from "react";
import { Link } from "react-router-dom";
import "./CompletedActions.css";

const completedActionData = [
  {
    id: 1,
    title: "Complete Semester Registration",
    category: "Academic",
    completedDate: "08 Aug 2026",
    deadline: "08 Aug 2026",
    priority: "Medium",
    description:
      "Complete semester registration successfully before the registration deadline.",
  },
  {
    id: 2,
    title: "Renew Student ID Card",
    category: "Student Services",
    completedDate: "25 Sep 2026",
    deadline: "25 Sep 2026",
    priority: "Medium",
    description:
      "Renew the student identity card according to the college instructions.",
  },
  {
    id: 3,
    title: "Submit Internal Assessment",
    category: "Academic",
    completedDate: "25 Jul 2026",
    deadline: "25 Jul 2026",
    priority: "Medium",
    description:
      "Submit the internal assessment work before the specified deadline.",
  },
  {
    id: 4,
    title: "Register for Sports Week",
    category: "Events",
    completedDate: "18 Jul 2026",
    deadline: "18 Jul 2026",
    priority: "Low",
    description:
      "Complete registration for the college Sports Week event.",
  },
  {
    id: 5,
    title: "Submit Scholarship Documents",
    category: "Student Services",
    completedDate: "12 Jul 2026",
    deadline: "15 Jul 2026",
    priority: "High",
    description:
      "Submit all required scholarship documents to the college office.",
  },
  {
    id: 6,
    title: "Complete Library Registration",
    category: "Student Services",
    completedDate: "05 Jul 2026",
    deadline: "08 Jul 2026",
    priority: "Low",
    description:
      "Complete the required library registration process.",
  },
];

function CompletedActions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  const filteredActions = completedActionData.filter((action) => {
    const matchesSearch =
      action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" ||
      action.priority === priorityFilter;

    const matchesCategory =
      categoryFilter === "All" ||
      action.category === categoryFilter;

    return matchesSearch && matchesPriority && matchesCategory;
  });

  const handleView = (action) => {
    alert(
      `Action: ${action.title}\n\nCategory: ${action.category}\nPriority: ${action.priority}\nCompleted: ${action.completedDate}\nDeadline: ${action.deadline}\nStatus: Completed\n\n${action.description}`
    );
  };

  return (
    <div className="completed-page">

      {/* SIDEBAR */}

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

          <p className="student-nav-heading">
            ACTION MANAGEMENT
          </p>

          <Link to="/my-actions" className="student-nav-item">
            <span className="student-nav-icon">✓</span>
            My Actions
          </Link>

          <Link
            to="/pending-actions"
            className="student-nav-item"
          >
            <span className="student-nav-icon">◌</span>
            Pending Actions
          </Link>

          <Link
            to="/completed-actions"
            className="student-nav-item active"
          >
            <span className="student-nav-icon">✓</span>
            Completed Actions
          </Link>

          <p className="student-nav-heading">
            NOTIFICATIONS
          </p>

          <Link
            to="/student-notifications"
            className="student-nav-item"
          >
            <span className="student-nav-icon">♢</span>
            Notifications
          </Link>

          <p className="student-nav-heading">ACADEMIC</p>

          <Link
            to="/academic-calendar"
            className="student-nav-item"
          >
            <span className="student-nav-icon">▣</span>
            Academic Calendar
          </Link>

          <Link
            to="/important-dates"
            className="student-nav-item"
          >
            <span className="student-nav-icon">◫</span>
            Important Dates
          </Link>

          <p className="student-nav-heading">ACCOUNT</p>

          <Link
            to="/student-profile"
            className="student-nav-item"
          >
            <span className="student-nav-icon">◯</span>
            Profile
          </Link>

          <Link
            to="/login"
            className="student-nav-item logout-item"
          >
            <span className="student-nav-icon">↪</span>
            Logout
          </Link>

        </nav>
      </aside>

      {/* MAIN */}

      <main className="completed-main">

        <header className="completed-header">

          <div>
            <p className="completed-eyebrow">
              ACTION MANAGEMENT
            </p>

            <h1>Completed Actions</h1>

            <p>
              View the actions you have successfully completed.
            </p>
          </div>

          <div className="completed-profile">

            <div className="completed-avatar">
              {studentName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{studentName}</strong>

              <span>
                {semester
                  ? `Semester ${semester}`
                  : "Student"}
              </span>
            </div>

          </div>

        </header>

        {/* SUMMARY */}

        <section className="completed-summary">

          <div className="completed-summary-card">

            <div className="completed-summary-icon">
              ✓
            </div>

            <div>
              <strong>{completedActionData.length}</strong>
              <p>Total Completed</p>
            </div>

          </div>

          <div className="completed-summary-card">

            <div className="completed-summary-icon month-summary">
              ◷
            </div>

            <div>
              <strong>4</strong>
              <p>This Month</p>
            </div>

          </div>

          <div className="completed-summary-card">

            <div className="completed-summary-icon success-summary">
              ✓
            </div>

            <div>
              <strong>5</strong>
              <p>Completed On Time</p>
            </div>

          </div>

        </section>

        {/* CONTENT */}

        <section className="completed-content-card">

          <div className="completed-toolbar">

            <div>
              <h2>Completed Actions</h2>

              <p>
                View your successfully completed tasks and their details.
              </p>
            </div>

            <div className="completed-filters">

              <div className="completed-search">

                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search completed actions..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />

              </div>

              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(e.target.value)
                }
              >
                <option value="All">All Priority</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
              >
                <option value="All">All Categories</option>
                <option value="Academic">Academic</option>
                <option value="Events">Events</option>
                <option value="Student Services">
                  Student Services
                </option>
              </select>

            </div>

          </div>

          {/* LIST */}

          <div className="completed-list">

            {filteredActions.length > 0 ? (
              filteredActions.map((action) => (

                <div
                  className="completed-item"
                  key={action.id}
                >

                  <div className="completed-item-left">

                    <div className="completed-action-icon">
                      ✓
                    </div>

                    <div className="completed-action-info">

                      <div className="completed-title-row">

                        <h3>{action.title}</h3>

                        <span
                          className={`completed-priority ${action.priority.toLowerCase()}`}
                        >
                          {action.priority}
                        </span>

                      </div>

                      <div className="completed-meta">

                        <span>{action.category}</span>

                        <span>•</span>

                        <span>
                          Completed {action.completedDate}
                        </span>

                      </div>

                      <div className="completed-date">

                        <span>Deadline</span>

                        <strong>
                          {action.deadline}
                        </strong>

                      </div>

                    </div>

                  </div>

                  <div className="completed-item-right">

                    <span className="completed-status">
                      Completed
                    </span>

                    <button
                      className="completed-view-btn"
                      onClick={() => handleView(action)}
                    >
                      View Action
                    </button>

                  </div>

                </div>

              ))
            ) : (
              <div className="completed-empty">

                <div>✓</div>

                <h3>
                  No completed actions found
                </h3>

                <p>
                  Try changing your current search or filters.
                </p>

              </div>
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default CompletedActions;
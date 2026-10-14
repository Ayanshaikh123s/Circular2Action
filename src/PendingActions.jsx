import { useState } from "react";
import { Link } from "react-router-dom";
import "./PendingActions.css";

const pendingActionData = [
  {
    id: 1,
    title: "Submit Examination Form",
    category: "Examination",
    assignedDate: "28 Sep 2026",
    deadline: "10 Oct 2026",
    priority: "High",
    description:
      "Complete and submit the semester examination form before the deadline.",
  },
  {
    id: 2,
    title: "Register for Data Analytics Workshop",
    category: "Events",
    assignedDate: "22 Sep 2026",
    deadline: "05 Oct 2026",
    priority: "Medium",
    description:
      "Complete registration for the Data Analytics workshop before registration closes.",
  },
  {
    id: 3,
    title: "Return Library Books",
    category: "Student Services",
    assignedDate: "20 Sep 2026",
    deadline: "30 Sep 2026",
    priority: "High",
    description:
      "Return all issued library books before the specified deadline.",
  },
  {
    id: 4,
    title: "Complete Fee Payment",
    category: "Finance",
    assignedDate: "18 Sep 2026",
    deadline: "01 Oct 2026",
    priority: "High",
    description:
      "Complete the pending college fee payment before the payment deadline.",
  },
  {
    id: 5,
    title: "Submit Project Report",
    category: "Academic",
    assignedDate: "26 Sep 2026",
    deadline: "15 Oct 2026",
    priority: "High",
    description:
      "Prepare and submit the Semester 5 project report according to the given guidelines.",
  },
];

function PendingActions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  const filteredActions = pendingActionData.filter((action) => {
    const matchesSearch =
      action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" || action.priority === priorityFilter;

    const matchesCategory =
      categoryFilter === "All" || action.category === categoryFilter;

    return matchesSearch && matchesPriority && matchesCategory;
  });

  const handleView = (action) => {
    alert(
      `Action: ${action.title}\n\nCategory: ${action.category}\nPriority: ${action.priority}\nAssigned: ${action.assignedDate}\nDeadline: ${action.deadline}\nStatus: Pending\n\n${action.description}`
    );
  };

  return (
    <div className="pending-page">
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

          <Link to="/circular-history" className="student-nav-item">
            <span className="student-nav-icon">◷</span>
            Circular History
          </Link>

          <p className="student-nav-heading">ACTION MANAGEMENT</p>

          <Link to="/my-actions" className="student-nav-item">
            <span className="student-nav-icon">✓</span>
            My Actions
          </Link>

          <Link
            to="/pending-actions"
            className="student-nav-item active"
          >
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

      <main className="pending-main">
        <header className="pending-header">
          <div>
            <p className="pending-eyebrow">ACTION MANAGEMENT</p>
            <h1>Pending Actions</h1>
            <p>
              View tasks that still need to be completed before their
              deadlines.
            </p>
          </div>

          <div className="pending-profile">
            <div className="pending-avatar">
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

        <section className="pending-summary">
          <div className="pending-summary-card">
            <div className="pending-summary-icon">◌</div>
            <div>
              <strong>{pendingActionData.length}</strong>
              <p>Total Pending</p>
            </div>
          </div>

          <div className="pending-summary-card">
            <div className="pending-summary-icon high-summary">
              ↑
            </div>
            <div>
              <strong>
                {
                  pendingActionData.filter(
                    (item) => item.priority === "High"
                  ).length
                }
              </strong>
              <p>High Priority</p>
            </div>
          </div>

          <div className="pending-summary-card">
            <div className="pending-summary-icon deadline-summary">
              !
            </div>
            <div>
              <strong>3</strong>
              <p>Due Soon</p>
            </div>
          </div>
        </section>

        <section className="pending-content-card">
          <div className="pending-toolbar">
            <div>
              <h2>Tasks to Complete</h2>
              <p>
                Complete these actions before their respective deadlines.
              </p>
            </div>

            <div className="pending-filters">
              <div className="pending-search">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search pending actions..."
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
                <option value="Low">Low Priority</option>
              </select>

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
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          <div className="pending-list">
            {filteredActions.length > 0 ? (
              filteredActions.map((action) => (
                <div className="pending-item" key={action.id}>
                  <div className="pending-item-left">
                    <div className="pending-action-icon">!</div>

                    <div className="pending-action-info">
                      <div className="pending-title-row">
                        <h3>{action.title}</h3>

                        <span
                          className={`pending-priority ${action.priority.toLowerCase()}`}
                        >
                          {action.priority}
                        </span>
                      </div>

                      <div className="pending-meta">
                        <span>{action.category}</span>
                        <span>•</span>
                        <span>Assigned {action.assignedDate}</span>
                      </div>

                      <div className="pending-deadline">
                        <span>Deadline</span>
                        <strong>{action.deadline}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pending-item-right">
                    <span className="pending-status">
                      Pending
                    </span>

                    <button
                      className="pending-view-btn"
                      onClick={() => handleView(action)}
                    >
                      View Action
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="pending-empty">
                <div>✓</div>
                <h3>No pending actions found</h3>
                <p>
                  Great! There are no actions matching your current filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default PendingActions;
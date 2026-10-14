import { useState } from "react";
import { Link } from "react-router-dom";
import "./MyActions.css";

const actionData = [
  {
    id: 1,
    title: "Submit Examination Form",
    category: "Examination",
    assignedDate: "28 Sep 2026",
    deadline: "10 Oct 2026",
    status: "Pending",
    priority: "High",
    description:
      "Complete and submit the semester examination form before the deadline.",
  },
  {
    id: 2,
    title: "Submit Project Report",
    category: "Academic",
    assignedDate: "26 Sep 2026",
    deadline: "15 Oct 2026",
    status: "In Progress",
    priority: "High",
    description:
      "Prepare and submit the Semester 5 project report according to the given guidelines.",
  },
  {
    id: 3,
    title: "Register for Data Analytics Workshop",
    category: "Events",
    assignedDate: "22 Sep 2026",
    deadline: "05 Oct 2026",
    status: "Pending",
    priority: "Medium",
    description:
      "Complete registration for the Data Analytics workshop before registration closes.",
  },
  {
    id: 4,
    title: "Return Library Books",
    category: "Student Services",
    assignedDate: "20 Sep 2026",
    deadline: "30 Sep 2026",
    status: "Pending",
    priority: "High",
    description:
      "Return all issued library books before the specified deadline.",
  },
  {
    id: 5,
    title: "Complete Semester Registration",
    category: "Academic",
    assignedDate: "28 Jul 2026",
    deadline: "08 Aug 2026",
    status: "Completed",
    priority: "Medium",
    description:
      "Semester registration was successfully completed.",
  },
  {
    id: 6,
    title: "Renew Student ID Card",
    category: "Student Services",
    assignedDate: "10 Sep 2026",
    deadline: "25 Sep 2026",
    status: "Completed",
    priority: "Medium",
    description:
      "Student ID card renewal process has been completed.",
  },
  {
    id: 7,
    title: "Submit Internal Assessment",
    category: "Academic",
    assignedDate: "15 Jul 2026",
    deadline: "25 Jul 2026",
    status: "Completed",
    priority: "Medium",
    description:
      "Internal assessment work was submitted successfully.",
  },
  {
    id: 8,
    title: "Register for Sports Week",
    category: "Events",
    assignedDate: "10 Jul 2026",
    deadline: "18 Jul 2026",
    status: "Completed",
    priority: "Low",
    description:
      "Sports Week registration was completed successfully.",
  },
];

function MyActions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  const filteredActions = actionData.filter((action) => {
    const matchesSearch =
      action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || action.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" || action.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleView = (action) => {
    alert(
      `Action: ${action.title}\n\nCategory: ${action.category}\nPriority: ${action.priority}\nAssigned: ${action.assignedDate}\nDeadline: ${action.deadline}\nStatus: ${action.status}\n\n${action.description}`
    );
  };

  return (
    <div className="actions-page">
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

          <Link to="/my-actions" className="student-nav-item active">
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

      <main className="actions-main">
        <header className="actions-header">
          <div>
            <p className="actions-eyebrow">ACTION MANAGEMENT</p>
            <h1>My Actions</h1>
            <p>
              Track all tasks and actions assigned to you from college
              circulars.
            </p>
          </div>

          <div className="actions-profile">
            <div className="actions-avatar">
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

        <section className="actions-summary">
          <div className="actions-summary-card">
            <div className="actions-summary-icon">✓</div>
            <div>
              <strong>{actionData.length}</strong>
              <p>Total Actions</p>
            </div>
          </div>

          <div className="actions-summary-card">
            <div className="actions-summary-icon pending-icon">
              ◌
            </div>
            <div>
              <strong>
                {
                  actionData.filter(
                    (item) => item.status === "Pending"
                  ).length
                }
              </strong>
              <p>Pending</p>
            </div>
          </div>

          <div className="actions-summary-card">
            <div className="actions-summary-icon progress-icon">
              ◐
            </div>
            <div>
              <strong>
                {
                  actionData.filter(
                    (item) => item.status === "In Progress"
                  ).length
                }
              </strong>
              <p>In Progress</p>
            </div>
          </div>

          <div className="actions-summary-card">
            <div className="actions-summary-icon completed-icon">
              ✓
            </div>
            <div>
              <strong>
                {
                  actionData.filter(
                    (item) => item.status === "Completed"
                  ).length
                }
              </strong>
              <p>Completed</p>
            </div>
          </div>
        </section>

        <section className="actions-content-card">
          <div className="actions-toolbar">
            <div>
              <h2>All My Actions</h2>
              <p>
                Keep track of tasks generated from important college
                circulars.
              </p>
            </div>

            <div className="actions-filters">
              <div className="actions-search">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search actions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
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
              </select>
            </div>
          </div>

          <div className="actions-list">
            {filteredActions.length > 0 ? (
              filteredActions.map((action) => (
                <div className="action-item" key={action.id}>
                  <div className="action-item-left">
                    <div className="action-icon">✓</div>

                    <div className="action-info">
                      <div className="action-title-row">
                        <h3>{action.title}</h3>

                        <span
                          className={`priority-badge ${action.priority.toLowerCase()}`}
                        >
                          {action.priority}
                        </span>
                      </div>

                      <div className="action-meta">
                        <span>{action.category}</span>
                        <span>•</span>
                        <span>Assigned {action.assignedDate}</span>
                      </div>

                      <div className="action-deadline">
                        <span>Deadline</span>
                        <strong>{action.deadline}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="action-item-right">
                    <span
                      className={`action-status ${action.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {action.status}
                    </span>

                    <button
                      className="action-view-btn"
                      onClick={() => handleView(action)}
                    >
                      View Action
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="actions-empty">
                <div>⌕</div>
                <h3>No actions found</h3>
                <p>
                  Try changing your search or filter options.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyActions;
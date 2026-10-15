import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { actionAPI } from "./api";
import ActionNotificationModal from "./ActionNotificationModal";
import "./MyActions.css";

function MyActions() {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedAction, setSelectedAction] = useState(null);

  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  const loadActions = async () => {
    try {
      const data = await actionAPI.getAll();
      const list = Array.isArray(data) ? data : (data?.actions || []);
      setActions(list);
    } catch (err) {
      console.error("Failed to fetch actions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActions();
  }, []);

  const filteredActions = actions.filter((action) => {
    const title = action.title || "";
    const category = action.category || "";
    const status = action.status || "Pending";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" || category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleView = (action) => {
    setSelectedAction(action);
  };

  const handleStatusChange = (updatedAction) => {
    setActions((prev) =>
      prev.map((a) =>
        (a._id || a.id) === (updatedAction._id || updatedAction.id)
          ? { ...a, status: updatedAction.status }
          : a
      )
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
              <strong>{actions.length}</strong>
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
                  actions.filter(
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
                  actions.filter(
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
                  actions.filter(
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
                <div className="action-item" key={action._id || action.id}>
                  <div className="action-item-left">
                    <div className="action-icon">✓</div>

                    <div className="action-info">
                      <div className="action-title-row">
                        <h3>{action.title}</h3>

                        <span
                          className={`priority-badge ${(action.priority || "Normal").toLowerCase()}`}
                        >
                          {action.priority || "Normal"}
                        </span>
                      </div>

                      <div className="action-meta">
                        <span>{action.category || "General"}</span>
                        <span>•</span>
                        <span>Assigned {action.assignedDate || action.date || "Recent"}</span>
                      </div>

                      <div className="action-deadline">
                        <span>Deadline</span>
                        <strong>{action.deadline || "—"}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="action-item-right">
                    <span
                      className={`action-status ${(action.status || "Pending")
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {action.status || "Pending"}
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

      {selectedAction && (
        <ActionNotificationModal
          action={selectedAction}
          onClose={() => setSelectedAction(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default MyActions;
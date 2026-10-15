import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { actionAPI } from "./api";
import ActionNotificationModal from "./ActionNotificationModal";
import "./PendingActions.css";

function PendingActions() {
  const [pendingActions, setPendingActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedAction, setSelectedAction] = useState(null);

  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  const loadPendingActions = async () => {
    try {
      const data = await actionAPI.getAll();
      const list = Array.isArray(data) ? data : (data?.actions || []);
      const pending = list.filter((item) => item.status !== "Completed");
      setPendingActions(pending);
    } catch (err) {
      console.error("Failed to load pending actions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingActions();
  }, []);

  const filteredActions = pendingActions.filter((action) => {
    const title = action.title || "";
    const category = action.category || "";
    const priority = action.priority || "Normal";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" || priority === priorityFilter;

    const matchesCategory =
      categoryFilter === "All" || category === categoryFilter;

    return matchesSearch && matchesPriority && matchesCategory;
  });

  const handleView = (action) => {
    setSelectedAction(action);
  };

  const handleStatusChange = (updatedAction) => {
    if (updatedAction.status === "Completed") {
      setPendingActions((prev) =>
        prev.filter((a) => (a._id || a.id) !== (updatedAction._id || updatedAction.id))
      );
    } else {
      setPendingActions((prev) =>
        prev.map((a) =>
          (a._id || a.id) === (updatedAction._id || updatedAction.id)
            ? { ...a, status: updatedAction.status }
            : a
        )
      );
    }
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
              <strong>{pendingActions.length}</strong>
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
                  pendingActions.filter(
                    (item) => item.priority === "High" || item.priority === "Urgent"
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
              <strong>{pendingActions.length}</strong>
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
                <div className="pending-item" key={action._id || action.id}>
                  <div className="pending-item-left">
                    <div className="pending-action-icon">!</div>

                    <div className="pending-action-info">
                      <div className="pending-title-row">
                        <h3>{action.title}</h3>

                        <span
                          className={`pending-priority ${(action.priority || "Normal").toLowerCase()}`}
                        >
                          {action.priority || "Normal"}
                        </span>
                      </div>

                      <div className="pending-meta">
                        <span>{action.category || "General"}</span>
                        <span>•</span>
                        <span>Assigned {action.assignedDate || action.date || "Recent"}</span>
                      </div>

                      <div className="pending-deadline">
                        <span>Deadline</span>
                        <strong>{action.deadline || "—"}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pending-item-right">
                    <span className="pending-status">
                      {action.status || "Pending"}
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

export default PendingActions;
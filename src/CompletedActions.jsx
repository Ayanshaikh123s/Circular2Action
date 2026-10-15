import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { actionAPI } from "./api";
import ActionNotificationModal from "./ActionNotificationModal";
import "./CompletedActions.css";

function CompletedActions() {
  const [completedActions, setCompletedActions] = useState([]);
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

  const loadCompletedActions = async () => {
    try {
      const data = await actionAPI.getAll();
      const list = Array.isArray(data) ? data : (data?.actions || []);
      const completed = list.filter((item) => item.status === "Completed");
      setCompletedActions(completed);
    } catch (err) {
      console.error("Failed to load completed actions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompletedActions();
  }, []);

  const filteredActions = completedActions.filter((action) => {
    const title = action.title || "";
    const category = action.category || "";
    const priority = action.priority || "Normal";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" ||
      priority === priorityFilter;

    const matchesCategory =
      categoryFilter === "All" ||
      category === categoryFilter;

    return matchesSearch && matchesPriority && matchesCategory;
  });

  const handleView = (action) => {
    setSelectedAction(action);
  };

  const handleStatusChange = (updatedAction) => {
    if (updatedAction.status !== "Completed") {
      setCompletedActions((prev) =>
        prev.filter((a) => (a._id || a.id) !== (updatedAction._id || updatedAction.id))
      );
    } else {
      setCompletedActions((prev) =>
        prev.map((a) =>
          (a._id || a.id) === (updatedAction._id || updatedAction.id)
            ? { ...a, status: updatedAction.status }
            : a
        )
      );
    }
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
              <strong>{completedActions.length}</strong>
              <p>Total Completed</p>
            </div>

          </div>

          <div className="completed-summary-card">

            <div className="completed-summary-icon month-summary">
              ◷
            </div>

            <div>
              <strong>{completedActions.length}</strong>
              <p>This Month</p>
            </div>

          </div>

          <div className="completed-summary-card">

            <div className="completed-summary-icon success-summary">
              ✓
            </div>

            <div>
              <strong>{completedActions.length}</strong>
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
                  key={action._id || action.id}
                >

                  <div className="completed-item-left">

                    <div className="completed-action-icon">
                      ✓
                    </div>

                    <div className="completed-action-info">

                      <div className="completed-title-row">

                        <h3>{action.title}</h3>

                        <span
                          className={`completed-priority ${(action.priority || "Normal").toLowerCase()}`}
                        >
                          {action.priority || "Normal"}
                        </span>

                      </div>

                      <div className="completed-meta">

                        <span>{action.category || "General"}</span>

                        <span>•</span>

                        <span>
                          Completed {action.completedDate || action.deadline || "Completed"}
                        </span>

                      </div>

                      <div className="completed-date">

                        <span>Deadline</span>

                        <strong>
                          {action.deadline || "—"}
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

export default CompletedActions;
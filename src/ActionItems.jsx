import { useState } from "react";
import { Link } from "react-router-dom";
import "./ActionItems.css";

function ActionItems() {
  const [actionItems, setActionItems] = useState([
    {
      id: 1,
      title: "Submit Examination Form",
      circular: "Internal Examination Schedule",
      audience: "All Students",
      deadline: "10 Oct 2026",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      title: "Submit Project Report",
      circular: "Semester 5 Project Submission Guidelines",
      audience: "Semester 5",
      deadline: "15 Oct 2026",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Register for Data Analytics Workshop",
      circular: "Workshop Registration - Data Analytics",
      audience: "BCA Students",
      deadline: "05 Oct 2026",
      priority: "Normal",
      status: "Pending",
    },
    {
      id: 4,
      title: "Return Library Books",
      circular: "Library Book Return Notice",
      audience: "All Students",
      deadline: "30 Sep 2026",
      priority: "Normal",
      status: "Completed",
    },
    {
      id: 5,
      title: "Complete Fee Payment",
      circular: "Fee Payment Reminder",
      audience: "All Students",
      deadline: "01 Oct 2026",
      priority: "Urgent",
      status: "Pending",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");

  const [newAction, setNewAction] = useState({
    title: "",
    circular: "",
    audience: "",
    deadline: "",
    priority: "Normal",
    status: "Pending",
  });

  const totalActions = actionItems.length;

  const pendingCount = actionItems.filter(
    (item) => item.status === "Pending"
  ).length;

  const inProgressCount = actionItems.filter(
    (item) => item.status === "In Progress"
  ).length;

  const completedCount = actionItems.filter(
    (item) => item.status === "Completed"
  ).length;

  // Filtering
  const filteredActionItems = actionItems.filter((item) => {
    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;

    const matchesPriority =
      selectedPriority === "All" ||
      item.priority === selectedPriority;

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(search) ||
      item.circular.toLowerCase().includes(search) ||
      item.audience.toLowerCase().includes(search);

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleAddAction = (e) => {
    e.preventDefault();

    if (
      !newAction.title ||
      !newAction.circular ||
      !newAction.audience ||
      !newAction.deadline
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const action = {
      id: Date.now(),
      title: newAction.title,
      circular: newAction.circular,
      audience: newAction.audience,
      deadline: newAction.deadline,
      priority: newAction.priority,
      status: newAction.status,
    };

    setActionItems((prev) => [...prev, action]);

    setNewAction({
      title: "",
      circular: "",
      audience: "",
      deadline: "",
      priority: "Normal",
      status: "Pending",
    });

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this action item?"
    );

    if (confirmDelete) {
      setActionItems((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }
  };

  const handleStatClick = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <div className="sidebar-brand">
          <div className="brand-mark">C</div>

          <div>
            <h2>Circular2Action</h2>
            <span>Admin Portal</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <Link to="/admin-dashboard" className="nav-item">
            <span className="nav-icon">⌂</span>
            Dashboard
          </Link>

          <p className="nav-section-title">
            CIRCULAR MANAGEMENT
          </p>

          <Link to="/upload-circular" className="nav-item">
            <span className="nav-icon">＋</span>
            Upload Circular
          </Link>

          <Link to="/circular-list" className="nav-item">
            <span className="nav-icon">▤</span>
            Manage Circulars
          </Link>

          <Link to="/categories" className="nav-item">
            <span className="nav-icon">◇</span>
            Categories
          </Link>

          <p className="nav-section-title">
            ACTION MANAGEMENT
          </p>

          <Link
            to="/action-items"
            className="nav-item active"
          >
            <span className="nav-icon">✓</span>
            Action Items
          </Link>

          <Link to="/notifications" className="nav-item">
            <span className="nav-icon">♢</span>
            Notifications
            
          </Link>

          <p className="nav-section-title">
            STUDENT MANAGEMENT
          </p>

          <Link to="/students" className="nav-item">
            <span className="nav-icon">○</span>
            Students
          </Link>

          <p className="nav-section-title">
            INSIGHTS
          </p>

          <Link to="/analytics" className="nav-item">
            <span className="nav-icon">◩</span>
            Analytics
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <Link to="/profile" className="nav-item">
            <span className="nav-icon">⚙</span>
            Profile
          </Link>

          <Link to="/login" className="nav-item logout-item">
            <span className="nav-icon">↪</span>
            Logout
          </Link>

        </div>

      </aside>

      {/* Main Content */}
      <main className="admin-main">

        {/* Header */}
        <header className="page-header">

          <div>
            <span className="page-eyebrow">
              ACTION MANAGEMENT
            </span>

            <h1>Action Items</h1>

            <p>
              Manage and track actions extracted from college circulars.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Action Item
          </button>

        </header>

        {/* Stats */}
        <section className="stats-grid">

          <div
            className={`stat-card ${
              selectedStatus === "All" ? "selected" : ""
            }`}
            onClick={() => handleStatClick("All")}
          >
            <div className="stat-icon">▤</div>

            <div>
              <span>Total Actions</span>
              <h3>{totalActions}</h3>
            </div>
          </div>

          <div
            className={`stat-card ${
              selectedStatus === "Pending" ? "selected" : ""
            }`}
            onClick={() => handleStatClick("Pending")}
          >
            <div className="stat-icon">◷</div>

            <div>
              <span>Pending</span>
              <h3>{pendingCount}</h3>
            </div>
          </div>

          <div
            className={`stat-card ${
              selectedStatus === "In Progress" ? "selected" : ""
            }`}
            onClick={() => handleStatClick("In Progress")}
          >
            <div className="stat-icon">◌</div>

            <div>
              <span>In Progress</span>
              <h3>{inProgressCount}</h3>
            </div>
          </div>

          <div
            className={`stat-card ${
              selectedStatus === "Completed" ? "selected" : ""
            }`}
            onClick={() => handleStatClick("Completed")}
          >
            <div className="stat-icon">✓</div>

            <div>
              <span>Completed</span>
              <h3>{completedCount}</h3>
            </div>
          </div>

        </section>

        {/* Filters */}
        <section className="filter-section">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search action items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) =>
              setSelectedPriority(e.target.value)
            }
          >
            <option value="All">All Priority</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
          </select>

        </section>

        {/* Table */}
        <section className="content-card">

          <div className="card-header">

            <div>
              <h2>Action Items</h2>

              <p>
                Showing {filteredActionItems.length} of{" "}
                {actionItems.length} action items
              </p>
            </div>

          </div>

          <div className="table-wrapper">

            <table className="action-table">

              <thead>
                <tr>
                  <th>Action Item</th>
                  <th>Related Circular</th>
                  <th>Audience</th>
                  <th>Deadline</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredActionItems.length > 0 ? (
                  filteredActionItems.map((item) => (

                    <tr key={item.id}>

                      <td>
                        <div className="action-title">
                          {item.title}
                        </div>
                      </td>

                      <td>
                        {item.circular}
                      </td>

                      <td>
                        {item.audience}
                      </td>

                      <td>
                        {item.deadline}
                      </td>

                      <td>
                        <span
                          className={`priority-badge ${item.priority
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {item.priority}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${item.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>

                        <div className="table-actions">

                          <button
                            className="edit-btn"
                            title="Edit"
                          >
                            ✎
                          </button>

                          <button
                            className="delete-btn"
                            title="Delete"
                            onClick={() =>
                              handleDelete(item.id)
                            }
                          >
                            ×
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>
                    <td
                      colSpan="7"
                      className="empty-state"
                    >
                      <div>
                        <span>○</span>
                        <h3>No action items found</h3>
                        <p>
                          Try changing your filters or search.
                        </p>
                      </div>
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* AI Info */}
        <section className="ai-info-card">

          <div className="ai-info-icon">✦</div>

          <div>
            <span>AI ACTION EXTRACTION</span>

            <h3>Automatically identify action items</h3>

            <p>
              In the future, AI will analyze uploaded circulars
              and automatically identify tasks, deadlines,
              target students and priorities.
            </p>
          </div>

          <span className="coming-soon">
            Coming Later
          </span>

        </section>

      </main>

      {/* Add Action Modal */}
      {showModal && (

        <div className="modal-overlay">

          <div className="modal-card">

            <div className="modal-header">

              <div>
                <span className="page-eyebrow">
                  ACTION MANAGEMENT
                </span>

                <h2>Add Action Item</h2>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleAddAction}>

              <div className="form-group">
                <label>Action Title</label>

                <input
                  type="text"
                  placeholder="Enter action title"
                  value={newAction.title}
                  onChange={(e) =>
                    setNewAction({
                      ...newAction,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Related Circular</label>

                <input
                  type="text"
                  placeholder="Enter related circular"
                  value={newAction.circular}
                  onChange={(e) =>
                    setNewAction({
                      ...newAction,
                      circular: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Target Audience</label>

                <input
                  type="text"
                  placeholder="e.g. Semester 5"
                  value={newAction.audience}
                  onChange={(e) =>
                    setNewAction({
                      ...newAction,
                      audience: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Deadline</label>

                  <input
                    type="date"
                    value={newAction.deadline}
                    onChange={(e) =>
                      setNewAction({
                        ...newAction,
                        deadline: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Priority</label>

                  <select
                    value={newAction.priority}
                    onChange={(e) =>
                      setNewAction({
                        ...newAction,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

              </div>

              <div className="form-group">
                <label>Status</label>

                <select
                  value={newAction.status}
                  onChange={(e) =>
                    setNewAction({
                      ...newAction,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  Add Action Item
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default ActionItems;
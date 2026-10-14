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

  const [title, setTitle] = useState("");
  const [circular, setCircular] = useState("");
  const [audience, setAudience] = useState("All Students");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [status, setStatus] = useState("Pending");

  const openModal = () => {
    setTitle("");
    setCircular("");
    setAudience("All Students");
    setDeadline("");
    setPriority("Normal");
    setStatus("Pending");

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newAction = {
      id: Date.now(),
      title,
      circular: circular || "General Circular",
      audience,
      deadline: deadline || "Not set",
      priority,
      status,
    };

    setActionItems([newAction, ...actionItems]);

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this action item?"
    );

    if (confirmed) {
      setActionItems(
        actionItems.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <div className="action-page">

      {/* Sidebar */}
      <aside className="action-sidebar">

        <div className="sidebar-brand">
          <div className="brand-mark">C</div>

          <div>
            <h2>Circular2Action</h2>
            <span>Admin Portal</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/admin-dashboard"
            className="nav-item"
          >
            <span className="nav-icon">⌂</span>
            Dashboard
          </Link>

          <p className="nav-section-title">
            CIRCULAR MANAGEMENT
          </p>

          <Link
            to="/upload-circular"
            className="nav-item"
          >
            <span className="nav-icon">＋</span>
            Upload Circular
          </Link>

          <Link
            to="/circular-list"
            className="nav-item"
          >
            <span className="nav-icon">▤</span>
            Manage Circulars
          </Link>

          <Link
            to="/categories"
            className="nav-item"
          >
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

          <Link
            to="/notifications"
            className="nav-item"
          >
            <span className="nav-icon">♢</span>
            Notifications
          
          </Link>

          <p className="nav-section-title">
            STUDENT MANAGEMENT
          </p>

          <Link
            to="/students"
            className="nav-item"
          >
            <span className="nav-icon">○</span>
            Students
          </Link>

          <p className="nav-section-title">
            INSIGHTS
          </p>

          <Link
            to="/analytics"
            className="nav-item"
          >
            <span className="nav-icon">◩</span>
            Analytics
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <Link
            to="/profile"
            className="nav-item"
          >
            <span className="nav-icon">⚙</span>
            Profile
          </Link>

          <Link
            to="/login"
            className="nav-item logout-item"
          >
            <span className="nav-icon">↪</span>
            Logout
          </Link>

        </div>

      </aside>


      {/* Main */}
      <main className="action-main">

        {/* Header */}
        <header className="action-header">

          <div>
            <p className="header-label">
              ACTION MANAGEMENT
            </p>

            <h1>Action Items</h1>

            <p className="header-subtitle">
              Track tasks and deadlines created from college circulars.
            </p>
          </div>

          <button
            className="add-action-btn"
            onClick={openModal}
          >
            <span>＋</span>
            Add Action Item
          </button>

        </header>


        {/* Statistics */}
        <section className="action-stats">

          <div className="action-stat">

            <div className="stat-icon total">
              ✓
            </div>

            <div>
              <span>Total Actions</span>
              <strong>{actionItems.length}</strong>
            </div>

          </div>


          <div className="action-stat">

            <div className="stat-icon pending">
              ◷
            </div>

            <div>
              <span>Pending</span>
              <strong>
                {
                  actionItems.filter(
                    (item) => item.status === "Pending"
                  ).length
                }
              </strong>
            </div>

          </div>


          <div className="action-stat">

            <div className="stat-icon progress">
              ↗
            </div>

            <div>
              <span>In Progress</span>
              <strong>
                {
                  actionItems.filter(
                    (item) => item.status === "In Progress"
                  ).length
                }
              </strong>
            </div>

          </div>


          <div className="action-stat">

            <div className="stat-icon completed">
              ✓
            </div>

            <div>
              <span>Completed</span>
              <strong>
                {
                  actionItems.filter(
                    (item) => item.status === "Completed"
                  ).length
                }
              </strong>
            </div>

          </div>

        </section>


        {/* Filters */}
        <section className="action-filters">

          <div className="action-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search action items..."
            />

          </div>


          <select defaultValue="all">
            <option value="all">
              All Status
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="progress">
              In Progress
            </option>

            <option value="completed">
              Completed
            </option>
          </select>


          <select defaultValue="all">
            <option value="all">
              All Priority
            </option>

            <option value="urgent">
              Urgent
            </option>

            <option value="high">
              High
            </option>

            <option value="normal">
              Normal
            </option>

            <option value="low">
              Low
            </option>
          </select>

        </section>


        {/* Action Table */}
        <section className="action-table-card">

          <div className="action-table-header">

            <div>
              <h2>All Action Items</h2>

              <p>
                Tasks created from published circulars
              </p>
            </div>

          </div>


          <div className="action-table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>ACTION ITEM</th>
                  <th>RELATED CIRCULAR</th>
                  <th>AUDIENCE</th>
                  <th>DEADLINE</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>

              </thead>


              <tbody>

                {actionItems.map((item) => (

                  <tr key={item.id}>

                    <td>

                      <div className="action-title">

                        <div className="task-icon">
                          ✓
                        </div>

                        <div>
                          <strong>
                            {item.title}
                          </strong>

                          <span>
                            Action #{item.id}
                          </span>
                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="related-circular">
                        {item.circular}
                      </span>

                    </td>


                    <td>

                      <span className="audience">
                        {item.audience}
                      </span>

                    </td>


                    <td>

                      <span className="deadline">
                        {item.deadline}
                      </span>

                    </td>


                    <td>

                      <span
                        className={`priority ${item.priority
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {item.priority}
                      </span>

                    </td>


                    <td>

                      <span
                        className={`action-status ${item.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <span className="status-dot"></span>
                        {item.status}
                      </span>

                    </td>


                    <td>

                      <div className="action-buttons">

                        <button
                          className="action-icon-btn edit"
                          title="Edit"
                        >
                          ✎
                        </button>

                        <button
                          className="action-icon-btn delete"
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

                ))}

              </tbody>

            </table>

          </div>


          <div className="action-table-footer">

            Showing <strong>{actionItems.length}</strong>{" "}
            action items

          </div>

        </section>


        {/* Smart Processing */}
        <section className="action-smart-info">

          <div className="smart-symbol">
            ✦
          </div>

          <div>
            <strong>
              AI Action Extraction — Coming Later
            </strong>

            <p>
              When OCR and AI processing are connected,
              Circular2Action will automatically identify
              tasks, deadlines and required actions from
              uploaded circulars.
            </p>
          </div>

          <span>
            Future Feature
          </span>

        </section>

      </main>


      {/* Add Action Modal */}
      {showModal && (
        <div
          className="action-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="action-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-heading">

              <div>
                <h2>
                  Add Action Item
                </h2>

                <p>
                  Create a task that students need to complete.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeModal}
              >
                ×
              </button>

            </div>


            <form onSubmit={handleSubmit}>

              <div className="modal-form-group">

                <label>
                  Action Title <span>*</span>
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="e.g. Submit Examination Form"
                  required
                />

              </div>


              <div className="modal-form-group">

                <label>
                  Related Circular
                </label>

                <select
                  value={circular}
                  onChange={(event) =>
                    setCircular(event.target.value)
                  }
                >

                  <option value="">
                    Select circular
                  </option>

                  <option>
                    Internal Examination Schedule
                  </option>

                  <option>
                    Semester 5 Project Submission Guidelines
                  </option>

                  <option>
                    Workshop Registration - Data Analytics
                  </option>

                  <option>
                    Library Book Return Notice
                  </option>

                  <option>
                    Fee Payment Reminder
                  </option>

                </select>

              </div>


              <div className="modal-two-columns">

                <div className="modal-form-group">

                  <label>
                    Target Audience
                  </label>

                  <select
                    value={audience}
                    onChange={(event) =>
                      setAudience(event.target.value)
                    }
                  >

                    <option>
                      All Students
                    </option>

                    <option>
                      Semester 5
                    </option>

                    <option>
                      BCA Students
                    </option>

                    <option>
                      Specific Department
                    </option>

                  </select>

                </div>


                <div className="modal-form-group">

                  <label>
                    Deadline
                  </label>

                  <input
                    type="date"
                    value={deadline}
                    onChange={(event) =>
                      setDeadline(event.target.value)
                    }
                  />

                </div>

              </div>


              <div className="modal-two-columns">

                <div className="modal-form-group">

                  <label>
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(event) =>
                      setPriority(event.target.value)
                    }
                  >

                    <option>
                      Low
                    </option>

                    <option>
                      Normal
                    </option>

                    <option>
                      High
                    </option>

                    <option>
                      Urgent
                    </option>

                  </select>

                </div>


                <div className="modal-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value)
                    }
                  >

                    <option>
                      Pending
                    </option>

                    <option>
                      In Progress
                    </option>

                    <option>
                      Completed
                    </option>

                  </select>

                </div>

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="modal-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save"
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
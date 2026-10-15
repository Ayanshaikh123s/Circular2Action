import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { notificationAPI } from "./api";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedChannel, setSelectedChannel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    circular: "",
    audience: "",
    channel: "In-App",
    status: "Pending",
  });

  const loadNotifications = async () => {
    try {
      const data = await notificationAPI.getAll();
      const list = Array.isArray(data) ? data : (data?.notifications || []);
      setNotifications(list);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const totalNotifications = notifications.length;

  const deliveredCount = notifications.filter(
    (item) => item.status === "Delivered"
  ).length;

  const readCount = notifications.filter(
    (item) => item.status === "Read"
  ).length;

  const pendingCount = notifications.filter(
    (item) => item.status === "Pending"
  ).length;

  const filteredNotifications = notifications.filter((item) => {
    const status = item.status || "Delivered";
    const channel = item.channel || "In-App";

    const matchesStatus =
      selectedStatus === "All" ||
      status === selectedStatus;

    const matchesChannel =
      selectedChannel === "All" ||
      channel === selectedChannel;

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (item.title || "").toLowerCase().includes(search) ||
      (item.message || "").toLowerCase().includes(search) ||
      (item.circular || "").toLowerCase().includes(search) ||
      (item.audience || item.targetAudience || "").toLowerCase().includes(search);

    return matchesStatus && matchesChannel && matchesSearch;
  });

  const handleStatClick = (status) => {
    setSelectedStatus(status);
  };

  const handleAddNotification = async (e) => {
    e.preventDefault();

    if (
      !newNotification.title ||
      !newNotification.message ||
      !newNotification.circular ||
      !newNotification.audience
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const payload = {
        title: newNotification.title,
        message: newNotification.message,
        circular: newNotification.circular,
        audience: newNotification.audience,
        channel: newNotification.channel,
        sentDate: new Date().toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }),
        status: newNotification.status,
      };

      const created = await notificationAPI.create(payload);
      setNotifications((prev) => [created, ...prev]);

      setNewNotification({
        title: "",
        message: "",
        circular: "",
        audience: "",
        channel: "In-App",
        status: "Pending",
      });

      setShowModal(false);
    } catch (err) {
      alert(err.message || "Failed to create notification");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notification?"
    );

    if (confirmDelete) {
      try {
        await notificationAPI.delete(id);
        setNotifications((prev) =>
          prev.filter((item) => (item._id || item.id) !== id)
        );
      } catch (err) {
        alert(err.message || "Failed to delete notification");
      }
    }
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

          <Link to="/action-items" className="nav-item">
            <span className="nav-icon">✓</span>
            Action Items
          </Link>

          <Link
            to="/notifications"
            className="nav-item active"
          >
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

      {/* Main */}
      <main className="admin-main">

        {/* Header */}
        <header className="page-header">

          <div>
            <span className="page-eyebrow">
              ACTION MANAGEMENT
            </span>

            <h1>Notifications</h1>

            <p>
              Create, manage and track notifications sent to students.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setShowModal(true)}
          >
            + Create Notification
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
            <div className="stat-icon">♢</div>

            <div>
              <span>Total Sent</span>
              <h3>{totalNotifications}</h3>
            </div>
          </div>

          <div
            className={`stat-card ${
              selectedStatus === "Delivered" ? "selected" : ""
            }`}
            onClick={() => handleStatClick("Delivered")}
          >
            <div className="stat-icon">✓</div>

            <div>
              <span>Delivered</span>
              <h3>{deliveredCount}</h3>
            </div>
          </div>

          <div
            className={`stat-card ${
              selectedStatus === "Read" ? "selected" : ""
            }`}
            onClick={() => handleStatClick("Read")}
          >
            <div className="stat-icon">◉</div>

            <div>
              <span>Read</span>
              <h3>{readCount}</h3>
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

        </section>

        {/* Filters */}
        <section className="filter-section">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Read">Read</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            value={selectedChannel}
            onChange={(e) =>
              setSelectedChannel(e.target.value)
            }
          >
            <option value="All">All Channels</option>
            <option value="In-App">In-App</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>

        </section>

        {/* Notification Table */}
        <section className="content-card">

          <div className="card-header">

            <div>
              <h2>Notification History</h2>

              <p>
                Showing {filteredNotifications.length} of{" "}
                {notifications.length} notifications
              </p>
            </div>

          </div>

          <div className="table-wrapper">

            <table className="notification-table">

              <thead>
                <tr>
                  <th>Notification</th>
                  <th>Related Circular</th>
                  <th>Audience</th>
                  <th>Channel</th>
                  <th>Sent Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((item) => (

                    <tr key={item._id || item.id}>

                      <td>
                        <div className="notification-title">
                          {item.title}
                        </div>

                        <div className="notification-message">
                          {item.message}
                        </div>
                      </td>

                      <td>
                        {item.circular}
                      </td>

                      <td>
                        {item.targetAudience || item.audience || "All Students"}
                      </td>

                      <td>
                        <span
                          className={`channel-badge ${(item.channel || "In-App")
                            .toLowerCase()
                            .replace("-", "-")}`}
                        >
                          {item.channel || "In-App"}
                        </span>
                      </td>

                      <td>
                        {item.sentDate || item.date || "Recent"}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${(item.status || "Delivered").toLowerCase()}`}
                        >
                          {item.status || "Delivered"}
                        </span>
                      </td>

                      <td>

                        <div className="table-actions">

                          <button
                            className="view-btn"
                            title="View"
                          >
                            ◉
                          </button>

                          <button
                            className="delete-btn"
                            title="Delete"
                            onClick={() =>
                              handleDelete(item._id || item.id)
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
                        <span>♢</span>

                        <h3>
                          No notifications found
                        </h3>

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

        {/* Future Integration */}
        <section className="integration-card">

          <div className="integration-icon">
            ✦
          </div>

          <div>
            <span>
              FUTURE INTEGRATION
            </span>

            <h3>
              Multi-channel notifications
            </h3>

            <p>
              Notifications can later be connected with
              Email, SMS and WhatsApp APIs to automatically
              alert students about important circulars and
              upcoming deadlines.
            </p>
          </div>

          <span className="coming-soon">
            Coming Later
          </span>

        </section>

      </main>

      {/* Create Notification Modal */}
      {showModal && (

        <div className="modal-overlay">

          <div className="modal-card">

            <div className="modal-header">

              <div>
                <span className="page-eyebrow">
                  ACTION MANAGEMENT
                </span>

                <h2>
                  Create Notification
                </h2>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleAddNotification}>

              <div className="form-group">

                <label>
                  Notification Title
                </label>

                <input
                  type="text"
                  placeholder="Enter notification title"
                  value={newNotification.title}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      title: e.target.value,
                    })
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Message
                </label>

                <textarea
                  placeholder="Write notification message..."
                  value={newNotification.message}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      message: e.target.value,
                    })
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Related Circular
                </label>

                <input
                  type="text"
                  placeholder="Enter related circular"
                  value={newNotification.circular}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      circular: e.target.value,
                    })
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Target Audience
                </label>

                <input
                  type="text"
                  placeholder="e.g. Semester 5"
                  value={newNotification.audience}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      audience: e.target.value,
                    })
                  }
                />

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Channel
                  </label>

                  <select
                    value={newNotification.channel}
                    onChange={(e) =>
                      setNewNotification({
                        ...newNotification,
                        channel: e.target.value,
                      })
                    }
                  >
                    <option value="In-App">
                      In-App
                    </option>

                    <option value="Email">
                      Email
                    </option>

                    <option value="SMS">
                      SMS
                    </option>

                    <option value="WhatsApp">
                      WhatsApp
                    </option>

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                    value={newNotification.status}
                    onChange={(e) =>
                      setNewNotification({
                        ...newNotification,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Read">
                      Read
                    </option>

                  </select>

                </div>

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
                  Create Notification
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Notifications;
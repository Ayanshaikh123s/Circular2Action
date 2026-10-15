import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { notificationAPI } from "./api";
import CircularPosterModal from "./CircularPosterModal";
import "./StudentNotifications.css";

function StudentNotifications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedPosterCircular, setSelectedPosterCircular] = useState(null);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  const loadNotifications = async () => {
    try {
      const data = await notificationAPI.getAll();
      const list = Array.isArray(data) ? data : (data?.notifications || []);
      setNotifications(list);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const filteredNotifications = notifications.filter((notification) => {
    const title = notification.title || "";
    const category = notification.category || "";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      category === categoryFilter;

    const matchesUnread =
      !showUnreadOnly || notification.unread;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesUnread
    );
  });

  const handleView = async (notification) => {
    const notifId = notification._id || notification.id;
    try {
      await notificationAPI.markRead(notifId);
    } catch (e) {
      console.error(e);
    }

    setNotifications((currentNotifications) =>
      currentNotifications.map((item) =>
        (item._id || item.id) === notifId
          ? { ...item, unread: false }
          : item
      )
    );

    setSelectedPosterCircular({
      id: notification._id || notification.id,
      title: notification.title,
      category: notification.category || "General",
      description: notification.message || notification.description || notification.title,
      audience: notification.audience || "All Students",
      date: notification.date || notification.time || "Recent",
      priority: notification.priority || "Normal",
      actionRequired: notification.actionRequired || "",
    });
  };

  const markAllAsRead = async () => {
    try {
      await notificationAPI.markAllRead();
    } catch (e) {
      console.error(e);
    }

    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  return (
    <div className="notification-page">

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

          <p className="student-nav-heading">
            DASHBOARD
          </p>

          <Link
            to="/student-dashboard"
            className="student-nav-item"
          >
            <span className="student-nav-icon">⌂</span>
            Dashboard
          </Link>

          <p className="student-nav-heading">
            CIRCULARS
          </p>

          <Link
            to="/my-circulars"
            className="student-nav-item"
          >
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

          <Link
            to="/my-actions"
            className="student-nav-item"
          >
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
            className="student-nav-item"
          >
            <span className="student-nav-icon">✓</span>
            Completed Actions
          </Link>

          <p className="student-nav-heading">
            NOTIFICATIONS
          </p>

          <Link
            to="/student-notifications"
            className="student-nav-item active"
          >
            <span className="student-nav-icon">♢</span>
            Notifications
          </Link>

          <p className="student-nav-heading">
            ACADEMIC
          </p>

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

          <p className="student-nav-heading">
            ACCOUNT
          </p>

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

      <main className="notification-main">

        <header className="notification-header">

          <div>

            <p className="notification-eyebrow">
              STUDENT PORTAL
            </p>

            <h1>Notifications</h1>

            <p>
              Stay updated with the latest college announcements
              and reminders.
            </p>

          </div>

          <div className="notification-profile">

            <div className="notification-avatar">
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

        <section className="notification-summary">

          <div className="notification-summary-card">

            <div className="notification-summary-icon">
              ♢
            </div>

            <div>
              <strong>{notifications.length}</strong>
              <p>Total Notifications</p>
            </div>

          </div>

          <div className="notification-summary-card">

            <div className="notification-summary-icon unread-summary">
              !
            </div>

            <div>
              <strong>{unreadCount}</strong>
              <p>Unread Notifications</p>
            </div>

          </div>

          <div className="notification-summary-card">

            <div className="notification-summary-icon read-summary">
              ✓
            </div>

            <div>
              <strong>
                {notifications.length - unreadCount}
              </strong>
              <p>Read Notifications</p>
            </div>

          </div>

        </section>

        {/* CONTENT */}

        <section className="notification-content-card">

          <div className="notification-toolbar">

            <div>

              <h2>Recent Notifications</h2>

              <p>
                View your latest college updates and alerts.
              </p>

            </div>

            <div className="notification-toolbar-actions">

              <div className="notification-filters">

                <div className="notification-search">

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
                  value={categoryFilter}
                  onChange={(e) =>
                    setCategoryFilter(e.target.value)
                  }
                >
                  <option value="All">
                    All Categories
                  </option>

                  <option value="Academic">
                    Academic
                  </option>

                  <option value="Examination">
                    Examination
                  </option>

                  <option value="Events">
                    Events
                  </option>

                  <option value="Student Services">
                    Student Services
                  </option>

                  <option value="Finance">
                    Finance
                  </option>
                </select>

              </div>

              <button
                className="mark-all-btn"
                onClick={markAllAsRead}
              >
                Mark All Read
              </button>

            </div>

          </div>

          <div className="notification-list">

            {filteredNotifications.length > 0 ? (

              filteredNotifications.map((notification) => (

                <div
                  className={`notification-item ${
                    notification.unread
                      ? "unread"
                      : ""
                  }`}
                  key={notification._id || notification.id}
                >

                  <div className="notification-item-left">

                    <div
                      className={`notification-icon ${
                        notification.unread
                          ? "unread-icon"
                          : ""
                      }`}
                    >
                      ♢
                    </div>

                    <div className="notification-info">

                      <div className="notification-title-row">

                        <h3>
                          {notification.title}
                        </h3>

                        {notification.unread && (
                          <span className="new-badge">
                            New
                          </span>
                        )}

                      </div>

                      <div className="notification-meta">

                        <span>
                          {notification.category || "General"}
                        </span>

                        <span>•</span>

                        <span>
                          {notification.type || "Circular"}
                        </span>

                        <span>•</span>

                        <span>
                          {notification.time || notification.date || "Recent"}
                        </span>

                      </div>

                      <div className="notification-date">

                        <span>Date</span>

                        <strong>
                          {notification.date || "—"}
                        </strong>

                      </div>

                    </div>

                  </div>

                  <div className="notification-item-right">

                    <span
                      className={
                        notification.unread
                          ? "notification-status unread-status"
                          : "notification-status"
                      }
                    >
                      {notification.unread
                        ? "Unread"
                        : "Read"}
                    </span>

                    <button
                      className="notification-view-btn"
                      onClick={() =>
                        handleView(notification)
                      }
                    >
                      View
                    </button>

                  </div>

                </div>

              ))

            ) : (

              <div className="notification-empty">

                <div>♢</div>

                <h3>
                  No notifications found
                </h3>

                <p>
                  Try changing your current search or filter.
                </p>

              </div>

            )}

          </div>

        </section>

      </main>
      {selectedPosterCircular && (
        <CircularPosterModal
          circular={selectedPosterCircular}
          onClose={() => setSelectedPosterCircular(null)}
        />
      )}
    </div>
  );
}

export default StudentNotifications;
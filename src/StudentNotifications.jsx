import { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentNotifications.css";

const notificationData = [
  {
    id: 1,
    title: "New examination schedule published",
    category: "Examination",
    date: "28 Sep 2026",
    time: "2 hours ago",
    type: "Circular",
    unread: true,
    description:
      "The internal examination schedule has been published. Please check the examination dates and complete the required examination form before the deadline.",
  },
  {
    id: 2,
    title: "Project submission deadline updated",
    category: "Academic",
    date: "27 Sep 2026",
    time: "Yesterday",
    type: "Action",
    unread: true,
    description:
      "The Semester 5 project submission deadline has been updated. Please submit your project report before the new deadline.",
  },
  {
    id: 3,
    title: "Workshop registration is now open",
    category: "Events",
    date: "26 Sep 2026",
    time: "2 days ago",
    type: "Event",
    unread: true,
    description:
      "Registration for the Data Analytics workshop is now open. Complete your registration before the registration deadline.",
  },
  {
    id: 4,
    title: "Library book return reminder",
    category: "Student Services",
    date: "25 Sep 2026",
    time: "3 days ago",
    type: "Reminder",
    unread: false,
    description:
      "This is a reminder to return all issued library books before the specified deadline.",
  },
  {
    id: 5,
    title: "Fee payment reminder",
    category: "Finance",
    date: "24 Sep 2026",
    time: "4 days ago",
    type: "Reminder",
    unread: false,
    description:
      "Please complete your pending college fee payment before the payment deadline.",
  },
  {
    id: 6,
    title: "Student ID card renewal notice",
    category: "Student Services",
    date: "22 Sep 2026",
    time: "6 days ago",
    type: "Circular",
    unread: false,
    description:
      "Students are requested to complete their student ID card renewal process according to college instructions.",
  },
];

function StudentNotifications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [notifications, setNotifications] = useState(notificationData);

  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notification.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      notification.category === categoryFilter;

    const matchesUnread =
      !showUnreadOnly || notification.unread;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesUnread
    );
  });

  const handleView = (notification) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((item) =>
        item.id === notification.id
          ? { ...item, unread: false }
          : item
      )
    );

    alert(
      `Notification: ${notification.title}\n\nCategory: ${notification.category}\nType: ${notification.type}\nDate: ${notification.date}\n\n${notification.description}`
    );
  };

  const markAllAsRead = () => {
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
                  key={notification.id}
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
                          {notification.category}
                        </span>

                        <span>•</span>

                        <span>
                          {notification.type}
                        </span>

                        <span>•</span>

                        <span>
                          {notification.time}
                        </span>

                      </div>

                      <div className="notification-date">

                        <span>Date</span>

                        <strong>
                          {notification.date}
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

    </div>
  );
}

export default StudentNotifications;
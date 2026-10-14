import { Link } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const firstName = studentName.split(" ")[0];

  const recentCirculars = [
    {
      title: "Internal Examination Schedule",
      category: "Examination",
      date: "28 Sep 2026",
      deadline: "10 Oct 2026",
      status: "Important",
    },
    {
      title: "Semester 5 Project Submission Guidelines",
      category: "Academic",
      date: "26 Sep 2026",
      deadline: "15 Oct 2026",
      status: "Action Required",
    },
    {
      title: "Workshop Registration - Data Analytics",
      category: "Events",
      date: "22 Sep 2026",
      deadline: "05 Oct 2026",
      status: "Open",
    },
    {
      title: "Library Book Return Notice",
      category: "Student Services",
      date: "20 Sep 2026",
      deadline: "30 Sep 2026",
      status: "Reminder",
    },
  ];

  const upcomingActions = [
    {
      title: "Submit Examination Form",
      circular: "Internal Examination Schedule",
      deadline: "10 Oct 2026",
      priority: "High",
      status: "Pending",
    },
    {
      title: "Submit Project Report",
      circular: "Semester 5 Project Submission Guidelines",
      deadline: "15 Oct 2026",
      priority: "High",
      status: "In Progress",
    },
    {
      title: "Register for Data Analytics Workshop",
      circular: "Workshop Registration",
      deadline: "05 Oct 2026",
      priority: "Normal",
      status: "Pending",
    },
  ];

  return (
    <div className="student-layout">

      {/* ================= SIDEBAR ================= */}

      <aside className="student-sidebar">

        <div className="student-brand">
          <div className="student-brand-mark">C</div>

          <div>
            <h2>Circular2Action</h2>
            <span>Student Portal</span>
          </div>
        </div>

        <nav className="student-sidebar-nav">

          <Link
            to="/student-dashboard"
            className="student-nav-item active"
          >
            <span className="student-nav-icon">⌂</span>
            Dashboard
          </Link>

          <p className="student-nav-title">CIRCULARS</p>

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
            <span className="student-nav-icon">☆</span>
            Important Circulars
          </Link>

          <Link
            to="/circular-history"
            className="student-nav-item"
          >
            <span className="student-nav-icon">◷</span>
            Circular History
          </Link>

          <p className="student-nav-title">ACTION MANAGEMENT</p>

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
            <span className="student-nav-icon">!</span>
            Pending Actions
          </Link>

          <Link
            to="/completed-actions"
            className="student-nav-item"
          >
            <span className="student-nav-icon">✓</span>
            Completed Actions
          </Link>

          <p className="student-nav-title">NOTIFICATIONS</p>

          <Link
            to="/student-notifications"
            className="student-nav-item"
          >
            <span className="student-nav-icon">♢</span>
            Notifications
          </Link>

          <p className="student-nav-title">ACADEMIC</p>

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

        </nav>

        <div className="student-sidebar-bottom">

          <Link
            to="/student-profile"
            className="student-nav-item"
          >
            <span className="student-nav-icon">○</span>
            Profile
          </Link>

          <Link
            to="/login"
            className="student-nav-item student-logout"
          >
            <span className="student-nav-icon">↪</span>
            Logout
          </Link>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="student-main">

        {/* Header */}

        <header className="student-header">

          <div>
            <p className="student-header-label">
              STUDENT PORTAL
            </p>

            <h1>
              Good morning, {firstName}
            </h1>

            <p className="student-header-subtitle">
              Here’s what’s happening with your college updates today.
            </p>
          </div>

          <div className="student-profile-mini">

            <div className="student-avatar">
              {studentName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{studentName}</strong>
              <span>
                {storedUser?.semester
                  ? `Semester ${storedUser.semester}`
                  : "Student"}
              </span>
            </div>

          </div>

        </header>


        {/* ================= STATS ================= */}

        <section className="student-stats">

          <div className="student-stat-card">
            <div className="student-stat-top">
              <span>My Circulars</span>

              <div className="student-stat-icon">
                ▤
              </div>
            </div>

            <h2>24</h2>

            <p>Received this semester</p>
          </div>


          <div className="student-stat-card pending-stat">
            <div className="student-stat-top">
              <span>Pending Actions</span>

              <div className="student-stat-icon">
                !
              </div>
            </div>

            <h2>3</h2>

            <p>Need your attention</p>
          </div>


          <div className="student-stat-card">
            <div className="student-stat-top">
              <span>Completed Actions</span>

              <div className="student-stat-icon">
                ✓
              </div>
            </div>

            <h2>18</h2>

            <p>Successfully completed</p>
          </div>


          <div className="student-stat-card">
            <div className="student-stat-top">
              <span>Notifications</span>

              <div className="student-stat-icon">
                ♢
              </div>
            </div>

            <h2>5</h2>

            <p>Unread notifications</p>
          </div>

        </section>


        {/* ================= MAIN GRID ================= */}

        <section className="student-dashboard-grid">

          {/* Recent Circulars */}

          <div className="student-card recent-circulars-card">

            <div className="student-card-header">

              <div>
                <h3>Recent Circulars</h3>

                <p>
                  Latest updates relevant to you
                </p>
              </div>

              <Link
                to="/my-circulars"
                className="student-view-all"
              >
                View All
              </Link>

            </div>


            <div className="my-circular-list">

              {recentCirculars.map((circular, index) => (
                <div
                  className="my-circular-item"
                  key={index}
                >

                  <div className="my-circular-icon">
                    ▤
                  </div>

                  <div className="my-circular-content">

                    <h4>{circular.title}</h4>

                    <div className="my-circular-meta">

                      <span className="student-category">
                        {circular.category}
                      </span>

                      <span>
                        {circular.date}
                      </span>

                    </div>

                  </div>

                  <div className="my-circular-status">

                    <span
                      className={
                        circular.status === "Action Required"
                          ? "action-required"
                          : circular.status === "Important"
                          ? "important-status"
                          : "normal-status"
                      }
                    >
                      {circular.status}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>


          {/* Upcoming Actions */}

          <div className="student-card actions-card">

            <div className="student-card-header">

              <div>
                <h3>Upcoming Actions</h3>

                <p>
                  Tasks that need your attention
                </p>
              </div>

              <Link
                to="/my-actions"
                className="student-view-all"
              >
                View All
              </Link>

            </div>


            <div className="student-action-list">

              {upcomingActions.map((action, index) => (
                <div
                  className="student-action-item"
                  key={index}
                >

                  <div className="action-check">
                    {action.status === "In Progress"
                      ? "..."
                      : "!"}
                  </div>

                  <div className="action-content">

                    <h4>{action.title}</h4>

                    <span>
                      Due {action.deadline}
                    </span>

                  </div>

                  <span
                    className={
                      action.priority === "High"
                        ? "priority-high"
                        : "priority-normal"
                    }
                  >
                    {action.priority}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </section>


        {/* ================= BOTTOM GRID ================= */}

        <section className="student-bottom-grid">

          {/* Upcoming Deadlines */}

          <div className="student-card">

            <div className="student-card-header">

              <div>
                <h3>Upcoming Deadlines</h3>

                <p>
                  Important dates to remember
                </p>
              </div>

              <Link
                to="/important-dates"
                className="student-view-all"
              >
                View Calendar
              </Link>

            </div>


            <div className="deadline-list">

              <div className="deadline-item">

                <div className="deadline-date">
                  <strong>30</strong>
                  <span>SEP</span>
                </div>

                <div>
                  <h4>Library Book Return</h4>
                  <p>Student Services</p>
                </div>

                <span className="deadline-days">
                  1 day
                </span>

              </div>


              <div className="deadline-item">

                <div className="deadline-date">
                  <strong>05</strong>
                  <span>OCT</span>
                </div>

                <div>
                  <h4>Workshop Registration</h4>
                  <p>Events</p>
                </div>

                <span className="deadline-days">
                  6 days
                </span>

              </div>


              <div className="deadline-item">

                <div className="deadline-date">
                  <strong>10</strong>
                  <span>OCT</span>
                </div>

                <div>
                  <h4>Examination Form</h4>
                  <p>Examination</p>
                </div>

                <span className="deadline-days">
                  11 days
                </span>

              </div>

            </div>

          </div>


          {/* Notifications */}

          <div className="student-card">

            <div className="student-card-header">

              <div>
                <h3>Recent Notifications</h3>

                <p>
                  Your latest notifications
                </p>
              </div>

              <Link
                to="/student-notifications"
                className="student-view-all"
              >
                View All
              </Link>

            </div>


            <div className="student-notification-list">

              <div className="student-notification-item unread">

                <div className="notification-dot"></div>

                <div>
                  <h4>
                    New examination schedule published
                  </h4>

                  <span>
                    2 hours ago
                  </span>
                </div>

              </div>


              <div className="student-notification-item unread">

                <div className="notification-dot"></div>

                <div>
                  <h4>
                    Project submission deadline updated
                  </h4>

                  <span>
                    Yesterday
                  </span>
                </div>

              </div>


              <div className="student-notification-item">

                <div className="notification-dot read"></div>

                <div>
                  <h4>
                    Workshop registration is now open
                  </h4>

                  <span>
                    2 days ago
                  </span>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default StudentDashboard;
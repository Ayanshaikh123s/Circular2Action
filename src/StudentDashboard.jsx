import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { circularAPI, actionAPI, notificationAPI, statsAPI } from "./api";
import CircularPosterModal from "./CircularPosterModal";
import ActionNotificationModal from "./ActionNotificationModal";
import { isEventCircular, isExamCircular } from "./utils/circularClassifier";
import "./StudentDashboard.css";

function formatDeadlineDisplay(rawDate) {
  if (!rawDate || rawDate === "—" || rawDate === "Not set") {
    return { day: "—", month: "—", label: "No date" };
  }
  const parsed = new Date(rawDate);
  if (!isNaN(parsed.getTime())) {
    const day = String(parsed.getDate()).padStart(2, "0");
    const month = parsed.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((parsed.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const label = diffDays < 0 ? "Past" : diffDays === 0 ? "Today" : diffDays === 1 ? "1 day" : `${diffDays} days`;
    return { day, month, label };
  }
  const parts = String(rawDate).trim().split(" ");
  if (parts.length >= 2) {
    return { day: parts[0], month: parts[1].toUpperCase(), label: rawDate };
  }
  return { day: "!", month: "DUE", label: rawDate };
}

function StudentDashboard() {
  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const firstName = studentName.split(" ")[0];

  const [stats, setStats] = useState({
    circularsCount: 0,
    pendingActionsCount: 0,
    completedActionsCount: 0,
    notificationsCount: 0,
  });
  const [recentCirculars, setRecentCirculars] = useState([]);
  const [upcomingActions, setUpcomingActions] = useState([]);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [selectedPosterCircular, setSelectedPosterCircular] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [statsData, circularsData, actionsData, notifsData] = await Promise.allSettled([
          statsAPI.getStudentStats(),
          circularAPI.getAll(),
          actionAPI.getAll(),
          notificationAPI.getAll(),
        ]);

        const circList = circularsData.status === "fulfilled"
          ? (Array.isArray(circularsData.value) ? circularsData.value : (circularsData.value?.circulars || []))
          : [];
        setRecentCirculars(circList.slice(0, 4));

        const actList = actionsData.status === "fulfilled"
          ? (Array.isArray(actionsData.value) ? actionsData.value : (actionsData.value?.actions || []))
          : [];
        const pending = actList.filter(a => a.status !== "Completed");
        setUpcomingActions(pending.slice(0, 4));

        const notifList = notifsData.status === "fulfilled"
          ? (Array.isArray(notifsData.value) ? notifsData.value : (notifsData.value?.notifications || []))
          : [];
        setRecentNotifications(notifList.slice(0, 3));

        // Derive upcoming deadlines from circulars & actions that have deadlines
        const deadlines = [];
        circList.forEach((c) => {
          if (c.deadline && c.deadline !== "—" && c.deadline !== "Not set") {
            deadlines.push({
              id: `c_${c._id || c.id}`,
              title: c.title,
              category: c.category || "General",
              rawDeadline: c.deadline,
            });
          }
        });
        actList.forEach((a) => {
          if (a.deadline && a.deadline !== "—" && a.deadline !== "Not set") {
            deadlines.push({
              id: `a_${a._id || a.id}`,
              title: a.title,
              category: a.category || "Action",
              rawDeadline: a.deadline,
            });
          }
        });
        setUpcomingDeadlines(deadlines.slice(0, 3));

        if (statsData.status === "fulfilled") {
          const s = statsData.value?.stats || statsData.value || {};
          setStats({
            circularsCount: s.circularsCount ?? s.myCircularsCount ?? circList.length,
            pendingActionsCount: s.pendingActionsCount ?? pending.length,
            completedActionsCount: s.completedActionsCount ?? actList.filter(a => a.status === "Completed").length,
            notificationsCount: s.notificationsCount ?? notifList.filter(n => n.unread).length,
          });
        } else {
          setStats({
            circularsCount: circList.length,
            pendingActionsCount: pending.length,
            completedActionsCount: actList.filter(a => a.status === "Completed").length,
            notificationsCount: notifList.filter(n => n.unread).length,
          });
        }
      } catch (err) {
        console.error("Error loading student dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

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

            <h2>{stats.circularsCount}</h2>

            <p>Received this semester</p>
          </div>


          <div className="student-stat-card pending-stat">
            <div className="student-stat-top">
              <span>Pending Actions</span>

              <div className="student-stat-icon">
                !
              </div>
            </div>

            <h2>{stats.pendingActionsCount}</h2>

            <p>Need your attention</p>
          </div>


          <div className="student-stat-card">
            <div className="student-stat-top">
              <span>Completed Actions</span>

              <div className="student-stat-icon">
                ✓
              </div>
            </div>

            <h2>{stats.completedActionsCount}</h2>

            <p>Successfully completed</p>
          </div>


          <div className="student-stat-card">
            <div className="student-stat-top">
              <span>Notifications</span>

              <div className="student-stat-icon">
                ♢
              </div>
            </div>

            <h2>{stats.notificationsCount}</h2>

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

              {recentCirculars.length > 0 ? (
                recentCirculars.map((circular, index) => {
                  const displayStatus = circular.actionRequired
                    ? "Action Required"
                    : circular.priority === "High"
                    ? "Important"
                    : circular.status || "Published";

                  return (
                    <div
                      className="my-circular-item interactive"
                      key={circular._id || circular.id || index}
                      onClick={() => setSelectedPosterCircular(circular)}
                      style={{ cursor: "pointer" }}
                      title="Click to view full college announcement poster"
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
                            displayStatus === "Action Required"
                              ? "action-required"
                              : displayStatus === "Important"
                              ? "important-status"
                              : "normal-status"
                          }
                        >
                          {displayStatus}
                        </span>

                        <button
                          type="button"
                          className={`view-poster-pill-btn ${
                            isEventCircular(circular)
                              ? "btn-is-event"
                              : isExamCircular(circular)
                              ? "btn-is-exam"
                              : "btn-is-notice"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPosterCircular(circular);
                          }}
                          title={
                            isEventCircular(circular)
                              ? "View Official Event Poster"
                              : isExamCircular(circular)
                              ? "View Examination Timetable Date-Sheet"
                              : "View Official Faculty Notice"
                          }
                        >
                          {isEventCircular(circular)
                            ? "🎨 View Poster"
                            : isExamCircular(circular)
                            ? "📅 View Timetable"
                            : "💬 View Notice"}
                        </button>

                      </div>

                    </div>
                  );
                })
              ) : (
                <p style={{ color: "#64748b", padding: "16px", fontSize: "14px" }}>No circulars published yet</p>
              )}

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

              {upcomingActions.length > 0 ? (
                upcomingActions.map((action, index) => (
                  <div
                    className="student-action-item"
                    key={action._id || action.id || index}
                    onClick={() => setSelectedAction(action)}
                    style={{ cursor: "pointer" }}
                    title="Click to view action directive"
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
                        action.priority === "High" || action.priority === "Urgent"
                          ? "priority-high"
                          : "priority-normal"
                      }
                    >
                      {action.priority}
                    </span>

                  </div>
                ))
              ) : (
                <p style={{ color: "#64748b", padding: "16px", fontSize: "14px" }}>No upcoming pending actions</p>
              )}

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
              {upcomingDeadlines.length > 0 ? (
                upcomingDeadlines.map((item) => {
                  const badge = formatDeadlineDisplay(item.rawDeadline);
                  return (
                    <div className="deadline-item" key={item.id}>
                      <div className="deadline-date">
                        <strong>{badge.day}</strong>
                        <span>{badge.month}</span>
                      </div>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.category}</p>
                      </div>
                      <span className="deadline-days">{badge.label}</span>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: "#64748b", padding: "16px", fontSize: "14px" }}>
                  No upcoming deadlines
                </p>
              )}
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

              {recentNotifications.length > 0 ? (
                recentNotifications.map((notif, index) => (
                  <div
                    className={`student-notification-item ${notif.unread ? "unread" : ""}`}
                    key={notif._id || notif.id || index}
                  >

                    <div className={`notification-dot ${notif.unread ? "" : "read"}`}></div>

                    <div>
                      <h4>
                        {notif.title}
                      </h4>

                      <span>
                        {notif.time || notif.date || "Recent"}
                      </span>
                    </div>

                  </div>
                ))
              ) : (
                <p style={{ color: "#64748b", padding: "16px", fontSize: "14px" }}>No recent notifications</p>
              )}

            </div>

          </div>

        </section>

      </main>
      {selectedPosterCircular && (
        <CircularPosterModal
          circular={selectedPosterCircular}
          onClose={() => setSelectedPosterCircular(null)}
        />
      )}
      {selectedAction && (
        <ActionNotificationModal
          action={selectedAction}
          onClose={() => setSelectedAction(null)}
          onStatusChange={(updatedAction) => {
            if (updatedAction.status === "Completed") {
              setUpcomingActions((prev) =>
                prev.filter((a) => (a._id || a.id) !== (updatedAction._id || updatedAction.id))
              );
              setStats((prev) => ({
                ...prev,
                pendingActionsCount: Math.max(0, prev.pendingActionsCount - 1),
                completedActionsCount: prev.completedActionsCount + 1,
              }));
            }
          }}
        />
      )}
    </div>
  );
}

export default StudentDashboard;
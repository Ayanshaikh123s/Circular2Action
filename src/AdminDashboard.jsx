import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      <aside className="admin-sidebar">

  {/* Brand */}
  <div className="sidebar-brand">
    <div className="brand-mark">C</div>

    <div>
      <h2>Circular2Action</h2>
      <span>Admin Portal</span>
    </div>
  </div>

  {/* Navigation */}
  <nav className="sidebar-nav">

    {/* Main */}
    <Link to="/admin-dashboard" className="nav-item active">
      <span className="nav-icon">⌂</span>
      Dashboard
    </Link>


    {/* Circular Management */}
    <p className="nav-section-title">CIRCULAR MANAGEMENT</p>

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


    {/* Action Management */}
    <p className="nav-section-title">ACTION MANAGEMENT</p>

    <Link to="/action-items" className="nav-item">
      <span className="nav-icon">✓</span>
      Action Items
    </Link>

    <Link to="/notifications" className="nav-item">
      <span className="nav-icon">♢</span>
      Notifications
      
    </Link>


    {/* Student Management */}
    <p className="nav-section-title">STUDENT MANAGEMENT</p>

    <Link to="/students" className="nav-item">
      <span className="nav-icon">○</span>
      Students
    </Link>


    {/* Insights */}
    <p className="nav-section-title">INSIGHTS</p>

    <Link to="/analytics" className="nav-item">
      <span className="nav-icon">◩</span>
      Analytics
    </Link>

  </nav>


  {/* Bottom */}
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

        {/* Top Header */}
        <header className="admin-header">
          <div>
            <p className="header-label">ADMIN PORTAL</p>
            <h1>Good morning, Admin</h1>
            <p className="header-subtitle">
              Here’s what’s happening with your college circulars today.
            </p>
          </div>

          

            <div className="admin-profile">
              <div className="profile-avatar">A</div>

              <div>
                <strong>Administrator</strong>
                <small>College Admin</small>
              </div>
            </div>
    
        </header>

        {/* Statistics */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-top">
              <span className="stat-title">Total Circulars</span>
              <div className="stat-icon purple">▤</div>
            </div>

            <div className="stat-value">128</div>

            <div className="stat-change positive">
              ↑ 12% <span>from last month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span className="stat-title">Pending Actions</span>
              <div className="stat-icon lavender">✓</div>
            </div>

            <div className="stat-value">24</div>

            <div className="stat-change warning">
              8 due this week
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span className="stat-title">Notifications Sent</span>
              <div className="stat-icon soft">♢</div>
            </div>

            <div className="stat-value">342</div>

            <div className="stat-change positive">
              ↑ 18% <span>this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span className="stat-title">Students Reached</span>
              <div className="stat-icon light">○</div>
            </div>

            <div className="stat-value">2,486</div>

            <div className="stat-change positive">
              ↑ 9% <span>this month</span>
            </div>
          </div>

        </section>

        {/* Main Dashboard Grid */}
        <section className="dashboard-grid">

          {/* Recent Circulars */}
          <div className="dashboard-card circulars-card">

            <div className="card-header">
              <div>
                <p className="section-label">OVERVIEW</p>
                <h2>Recent Circulars</h2>
              </div>

              <Link to="/circular-list" className="view-all">
                View all →
              </Link>
            </div>

            <div className="circular-table">

              <div className="table-row table-heading">
                <span>Title</span>
                <span>Category</span>
                <span>Date</span>
                <span>Status</span>
              </div>

              <div className="table-row">
                <div className="circular-title">
                  <div className="mini-icon">A</div>
                  <div>
                    <strong>Internal Examination Schedule</strong>
                    <small>Academic circular</small>
                  </div>
                </div>

                <span className="category-badge academic">
                  Academic
                </span>

                <span className="date-text">28 Sep 2026</span>

                <span className="status-badge published">
                  Published
                </span>
              </div>

              <div className="table-row">
                <div className="circular-title">
                  <div className="mini-icon">E</div>
                  <div>
                    <strong>Holiday Notice - Gandhi Jayanti</strong>
                    <small>General notice</small>
                  </div>
                </div>

                <span className="category-badge general">
                  General
                </span>

                <span className="date-text">26 Sep 2026</span>

                <span className="status-badge published">
                  Published
                </span>
              </div>

              <div className="table-row">
                <div className="circular-title">
                  <div className="mini-icon">F</div>
                  <div>
                    <strong>Fee Payment Reminder</strong>
                    <small>Student services</small>
                  </div>
                </div>

                <span className="category-badge finance">
                  Finance
                </span>

                <span className="date-text">25 Sep 2026</span>

                <span className="status-badge published">
                  Published
                </span>
              </div>

              <div className="table-row">
                <div className="circular-title">
                  <div className="mini-icon">I</div>
                  <div>
                    <strong>Inter-College Sports Event</strong>
                    <small>Student activity</small>
                  </div>
                </div>

                <span className="category-badge event">
                  Event
                </span>

                <span className="date-text">23 Sep 2026</span>

                <span className="status-badge draft">
                  Draft
                </span>
              </div>

            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card quick-card">

            <div className="card-header">
              <div>
                <p className="section-label">SHORTCUTS</p>
                <h2>Quick Actions</h2>
              </div>
            </div>

            <div className="quick-actions">

              <Link to="/upload-circular" className="quick-action">
                <div className="quick-icon">＋</div>

                <div>
                  <strong>Upload Circular</strong>
                  <span>Add a new college circular</span>
                </div>

                <b>→</b>
              </Link>

              <Link to="/circular-list" className="quick-action">
                <div className="quick-icon">▤</div>

                <div>
                  <strong>Manage Circulars</strong>
                  <span>View and edit circulars</span>
                </div>

                <b>→</b>
              </Link>

              <Link to="/notifications" className="quick-action">
                <div className="quick-icon">♢</div>

                <div>
                  <strong>Send Notification</strong>
                  <span>Notify students instantly</span>
                </div>

                <b>→</b>
              </Link>

            </div>
          </div>

        </section>

        {/* Bottom Section */}
        <section className="bottom-grid">

          {/* Recent Activity */}
          <div className="dashboard-card activity-card">

            <div className="card-header">
              <div>
                <p className="section-label">ACTIVITY</p>
                <h2>Recent Activity</h2>
              </div>

              <span className="activity-status">
                ● Live
              </span>
            </div>

            <div className="activity-list">

              <div className="activity-item">
                <div className="activity-dot"></div>

                <div>
                  <strong>New circular published</strong>
                  <p>Internal Examination Schedule</p>
                  <span>15 minutes ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-dot"></div>

                <div>
                  <strong>Notification sent</strong>
                  <p>Semester 5 students were notified</p>
                  <span>1 hour ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-dot"></div>

                <div>
                  <strong>Circular updated</strong>
                  <p>Fee Payment Reminder</p>
                  <span>3 hours ago</span>
                </div>
              </div>

            </div>
          </div>

          {/* System Overview */}
          <div className="dashboard-card overview-card">

            <div className="card-header">
              <div>
                <p className="section-label">SYSTEM</p>
                <h2>System Overview</h2>
              </div>
            </div>

            <div className="overview-item">
              <div>
                <span>Published Circulars</span>
                <strong>112</strong>
              </div>

              <div className="progress">
                <span style={{ width: "87%" }}></span>
              </div>
            </div>

            <div className="overview-item">
              <div>
                <span>Student Engagement</span>
                <strong>78%</strong>
              </div>

              <div className="progress">
                <span style={{ width: "78%" }}></span>
              </div>
            </div>

            <div className="overview-item">
              <div>
                <span>Action Completion</span>
                <strong>64%</strong>
              </div>

              <div className="progress">
                <span style={{ width: "64%" }}></span>
              </div>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;
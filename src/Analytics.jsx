import { useState } from "react";
import { Link } from "react-router-dom";
import "./Analytics.css";

function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 Days");

  const analyticsData = {
    "Last 7 Days": {
      circulars: 18,
      actions: 8,
      completion: 88,
      students: 642,
      categoryData: [
        ["Academic", 6],
        ["Examination", 5],
        ["Events", 3],
        ["Student Services", 2],
        ["Finance", 1],
        ["General", 1],
      ],
      monthlyData: [
        ["Mon", 2],
        ["Tue", 4],
        ["Wed", 3],
        ["Thu", 5],
        ["Fri", 2],
        ["Sat", 1],
        ["Sun", 1],
      ],
      completed: 7,
      progress: 1,
      pending: 0,
      sent: 52,
      delivered: 50,
      read: 44,
    },

    "Last 30 Days": {
      circulars: 34,
      actions: 14,
      completion: 82,
      students: 1248,
      categoryData: [
        ["Academic", 10],
        ["Examination", 8],
        ["Events", 6],
        ["Student Services", 5],
        ["Finance", 3],
        ["General", 2],
      ],
      monthlyData: [
        ["Week 1", 7],
        ["Week 2", 9],
        ["Week 3", 8],
        ["Week 4", 10],
      ],
      completed: 11,
      progress: 2,
      pending: 1,
      sent: 126,
      delivered: 119,
      read: 104,
    },

    "Last 6 Months": {
      circulars: 128,
      actions: 42,
      completion: 78,
      students: 2486,
      categoryData: [
        ["Academic", 34],
        ["Examination", 27],
        ["Events", 22],
        ["Student Services", 18],
        ["Finance", 15],
        ["General", 12],
      ],
      monthlyData: [
        ["Apr", 12],
        ["May", 18],
        ["Jun", 15],
        ["Jul", 22],
        ["Aug", 27],
        ["Sep", 34],
      ],
      completed: 33,
      progress: 6,
      pending: 3,
      sent: 342,
      delivered: 326,
      read: 287,
    },

    "This Semester": {
      circulars: 86,
      actions: 29,
      completion: 81,
      students: 2140,
      categoryData: [
        ["Academic", 25],
        ["Examination", 20],
        ["Events", 15],
        ["Student Services", 12],
        ["Finance", 8],
        ["General", 6],
      ],
      monthlyData: [
        ["Jul", 15],
        ["Aug", 27],
        ["Sep", 34],
        ["Oct", 10],
      ],
      completed: 23,
      progress: 4,
      pending: 2,
      sent: 248,
      delivered: 237,
      read: 211,
    },
  };

  const data = analyticsData[selectedPeriod];

  const mostActiveCategories = [...data.categoryData]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxCategoryValue = Math.max(
    ...data.categoryData.map((item) => item[1])
  );

  const maxMonthlyValue = Math.max(
    ...data.monthlyData.map((item) => item[1])
  );

  return (
    <div className="analytics-page">

      {/* SIDEBAR */}
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

          <Link to="/analytics" className="nav-item active">
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


      {/* MAIN */}
      <main className="analytics-main">

        {/* HEADER */}
        <header className="analytics-header">

          <div>
            <span className="page-eyebrow">
              INSIGHTS
            </span>

            <h1>Analytics</h1>

            <p>
              Understand circular activity, actions and student reach.
            </p>
          </div>

          <select
            className="period-select"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 6 Months</option>
            <option>This Semester</option>
          </select>

        </header>


        {/* STATS */}
        <section className="analytics-stats">

          <div className="analytics-stat-card">
            <span>Total Circulars</span>
            <strong>{data.circulars}</strong>
            <small>{selectedPeriod}</small>
          </div>

          <div className="analytics-stat-card">
            <span>Total Actions</span>
            <strong>{data.actions}</strong>
            <small>Action items created</small>
          </div>

          <div className="analytics-stat-card">
            <span>Completion Rate</span>
            <strong>{data.completion}%</strong>
            <small>Actions completed</small>
          </div>

          <div className="analytics-stat-card">
            <span>Students Reached</span>
            <strong>
              {data.students.toLocaleString()}
            </strong>
            <small>Students reached</small>
          </div>

        </section>


        {/* TOP CHARTS */}
        <section className="analytics-grid">

          {/* CATEGORY CHART */}
          <div className="analytics-card">

            <div className="card-heading">
              <div>
                <h2>Circulars by Category</h2>
                <p>
                  Distribution for {selectedPeriod.toLowerCase()}
                </p>
              </div>
            </div>

            <div className="category-bars">

              {data.categoryData.map(([name, value]) => (

                <div
                  className="category-bar-row"
                  key={name}
                >

                  <div className="category-bar-label">
                    <span>{name}</span>
                    <strong>{value}</strong>
                  </div>

                  <div className="bar-background">

                    <div
                      className="bar-fill"
                      style={{
                        width: `${(value / maxCategoryValue) * 100}%`,
                      }}
                    ></div>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* ACTION STATUS */}
          <div className="analytics-card">

            <div className="card-heading">

              <div>
                <h2>Action Status</h2>
                <p>
                  Current action item progress
                </p>
              </div>

            </div>

            <div className="donut-section">

              <div className="donut-chart">

                <div className="donut-center">
                  <strong>{data.completion}%</strong>
                  <span>Completed</span>
                </div>

              </div>


              <div className="status-list">

                <div className="status-row">
                  <span>
                    <i className="status-dot completed"></i>
                    Completed
                  </span>

                  <strong>{data.completed}</strong>
                </div>

                <div className="status-row">
                  <span>
                    <i className="status-dot progress"></i>
                    In Progress
                  </span>

                  <strong>{data.progress}</strong>
                </div>

                <div className="status-row">
                  <span>
                    <i className="status-dot pending"></i>
                    Pending
                  </span>

                  <strong>{data.pending}</strong>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* MONTHLY ACTIVITY */}
        <section className="analytics-card monthly-card">

          <div className="card-heading">

            <div>
              <h2>Activity</h2>

              <p>
                Circular activity for {selectedPeriod.toLowerCase()}
              </p>
            </div>

          </div>


          <div className="monthly-chart">

            {data.monthlyData.map(([month, value]) => (

              <div
                className="month-column"
                key={month}
              >

                <span>{value}</span>

                <div className="month-bar-area">

                  <div
                    className="month-bar"
                    style={{
                      height: `${(value / maxMonthlyValue) * 100}%`,
                    }}
                  ></div>

                </div>

                <small>{month}</small>

              </div>

            ))}

          </div>

        </section>


        {/* BOTTOM GRID */}
        <section className="analytics-grid bottom-grid">

          {/* NOTIFICATIONS */}
          <div className="analytics-card">

            <div className="card-heading">

              <div>
                <h2>Notification Delivery</h2>
                <p>
                  Notification performance
                </p>
              </div>

            </div>


            <div className="delivery-list">

              <div className="delivery-row">

                <div>
                  <span>Sent</span>
                  <strong>{data.sent}</strong>
                </div>

                <div className="delivery-progress">

                  <div
                    className="delivery-fill"
                    style={{ width: "100%" }}
                  ></div>

                </div>

              </div>


              <div className="delivery-row">

                <div>
                  <span>Delivered</span>
                  <strong>{data.delivered}</strong>
                </div>

                <div className="delivery-progress">

                  <div
                    className="delivery-fill"
                    style={{
                      width: `${(data.delivered / data.sent) * 100}%`,
                    }}
                  ></div>

                </div>

              </div>


              <div className="delivery-row">

                <div>
                  <span>Read</span>
                  <strong>{data.read}</strong>
                </div>

                <div className="delivery-progress">

                  <div
                    className="delivery-fill"
                    style={{
                      width: `${(data.read / data.sent) * 100}%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>


          {/* MOST ACTIVE CATEGORIES */}
          <div className="analytics-card">

            <div className="card-heading">

              <div>
                <h2>Most Active Categories</h2>

                <p>
                  Click a category to view its circulars
                </p>
              </div>

            </div>


            <div className="active-category-list">

              {mostActiveCategories.map(
                ([name, count], index) => (

                  <Link
                    key={name}
                    to={`/circular-list?category=${encodeURIComponent(
                      name
                    )}`}
                    className="active-category"
                  >

                    <div className="active-category-number">
                      {index + 1}
                    </div>


                    <div className="active-category-info">

                      <strong>{name}</strong>

                      <div className="mini-progress">

                        <div
                          style={{
                            width: `${(count / maxCategoryValue) * 100}%`,
                          }}
                        ></div>

                      </div>

                    </div>


                    <span className="active-category-count">
                      {count}
                    </span>


                    <span className="category-arrow">
                      →
                    </span>

                  </Link>

                )
              )}

            </div>

          </div>

        </section>


        {/* INFO */}
        <section className="analytics-info">

          <div className="info-icon">
            i
          </div>

          <div>
            <h3>
              Analytics will connect to live data
            </h3>

            <p>
              The current values are sample frontend data.
              After connecting MongoDB and the backend,
              these analytics will update automatically
              using real circular, action and notification data.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default Analytics;
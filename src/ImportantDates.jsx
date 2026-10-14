import { Link } from "react-router-dom";
import "./ImportantDates.css";

const importantDatesData = [
  {
    id: 1,
    date: "30",
    month: "SEP",
    day: "Wednesday",
    title: "Project Guidance Session",
    category: "Project",
    description:
      "Semester 5 students will attend the project guidance and review session.",
    priority: "High",
  },
  {
    id: 2,
    date: "01",
    month: "OCT",
    day: "Thursday",
    title: "Semester Fee Payment Deadline",
    category: "Academic",
    description:
      "Complete the semester fee payment according to the college schedule.",
    priority: "High",
  },
  {
    id: 3,
    date: "05",
    month: "OCT",
    day: "Monday",
    title: "Data Analytics Workshop",
    category: "Workshop",
    description:
      "Students can attend the Data Analytics workshop and practical learning session.",
    priority: "Medium",
  },
  {
    id: 4,
    date: "10",
    month: "OCT",
    day: "Saturday",
    title: "Examination Form Submission",
    category: "Examination",
    description:
      "Last date for submitting the semester examination form.",
    priority: "High",
  },
  {
    id: 5,
    date: "15",
    month: "OCT",
    day: "Thursday",
    title: "Semester 5 Project Report Submission",
    category: "Project",
    description:
      "Students should submit their Semester 5 project report according to the given guidelines.",
    priority: "High",
  },
  {
    id: 6,
    date: "02",
    month: "NOV",
    day: "Monday",
    title: "Semester Examination Begins",
    category: "Examination",
    description:
      "Semester-end examinations begin according to the examination schedule.",
    priority: "High",
  },
  {
    id: 7,
    date: "10",
    month: "NOV",
    day: "Tuesday",
    title: "Practical Examination",
    category: "Examination",
    description:
      "Practical examinations will be conducted for applicable subjects.",
    priority: "Medium",
  },
  {
    id: 8,
    date: "20",
    month: "NOV",
    day: "Friday",
    title: "Semester Examination Ends",
    category: "Examination",
    description:
      "Semester-end examination period concludes.",
    priority: "High",
  },
  {
    id: 9,
    date: "10",
    month: "DEC",
    day: "Thursday",
    title: "Project Presentation",
    category: "Project",
    description:
      "Semester project presentations and evaluations will be conducted.",
    priority: "Medium",
  },
];

function ImportantDates() {
  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  const handleView = (date) => {
    alert(
      `Event: ${date.title}\n\nDate: ${date.date} ${date.month} 2026\nCategory: ${date.category}\nPriority: ${date.priority}\n\n${date.description}`
    );
  };

  const highPriorityCount = importantDatesData.filter(
    (date) => date.priority === "High"
  ).length;

  const examCount = importantDatesData.filter(
    (date) => date.category === "Examination"
  ).length;

  return (
    <div className="important-dates-page">
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

          <Link to="/important-circulars" className="student-nav-item">
            <span className="student-nav-icon">★</span>
            Important Circulars
          </Link>

          <Link to="/circular-history" className="student-nav-item">
            <span className="student-nav-icon">◷</span>
            Circular History
          </Link>

          <p className="student-nav-heading">ACTION MANAGEMENT</p>

          <Link to="/my-actions" className="student-nav-item">
            <span className="student-nav-icon">✓</span>
            My Actions
          </Link>

          <Link to="/pending-actions" className="student-nav-item">
            <span className="student-nav-icon">◌</span>
            Pending Actions
          </Link>

          <Link to="/completed-actions" className="student-nav-item">
            <span className="student-nav-icon">✓</span>
            Completed Actions
          </Link>

          <p className="student-nav-heading">NOTIFICATIONS</p>

          <Link
            to="/student-notifications"
            className="student-nav-item"
          >
            <span className="student-nav-icon">♢</span>
            Notifications
          </Link>

          <p className="student-nav-heading">ACADEMIC</p>

          <Link to="/academic-calendar" className="student-nav-item">
            <span className="student-nav-icon">▣</span>
            Academic Calendar
          </Link>

          <Link
            to="/important-dates"
            className="student-nav-item active"
          >
            <span className="student-nav-icon">◫</span>
            Important Dates
          </Link>

          <p className="student-nav-heading">ACCOUNT</p>

          <Link to="/student-profile" className="student-nav-item">
            <span className="student-nav-icon">◯</span>
            Profile
          </Link>

          <Link to="/login" className="student-nav-item logout-item">
            <span className="student-nav-icon">↪</span>
            Logout
          </Link>
        </nav>
      </aside>

      <main className="important-dates-main">
        <header className="important-dates-header">
          <div>
            <p className="important-dates-eyebrow">ACADEMIC</p>

            <h1>Important Dates</h1>

            <p>
              Keep track of important academic dates, examinations and
              college activities.
            </p>
          </div>

          <div className="important-dates-profile">
            <div className="important-dates-avatar">
              {studentName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{studentName}</strong>

              <span>
                {semester ? `Semester ${semester}` : "Student"}
              </span>
            </div>
          </div>
        </header>

        <section className="important-dates-summary">
          <div className="important-dates-summary-card">
            <div className="important-dates-summary-icon">
              ◫
            </div>

            <div>
              <strong>{importantDatesData.length}</strong>
              <p>Important Dates</p>
            </div>
          </div>

          <div className="important-dates-summary-card">
            <div className="important-dates-summary-icon high-summary">
              !
            </div>

            <div>
              <strong>{highPriorityCount}</strong>
              <p>High Priority</p>
            </div>
          </div>

          <div className="important-dates-summary-card">
            <div className="important-dates-summary-icon exam-summary">
              ▣
            </div>

            <div>
              <strong>{examCount}</strong>
              <p>Examination Dates</p>
            </div>
          </div>
        </section>

        <section className="important-dates-content-card">
          <div className="important-dates-toolbar">
            <div>
              <h2>Upcoming Important Dates</h2>

              <p>
                Important dates you should keep track of during the semester.
              </p>
            </div>
          </div>

          <div className="important-dates-list">
            {importantDatesData.map((item) => (
              <div className="important-date-item" key={item.id}>
                <div className="important-date-box">
                  <strong>{item.date}</strong>
                  <span>{item.month}</span>
                </div>

                <div className="important-date-info">
                  <div className="important-date-title-row">
                    <h3>{item.title}</h3>

                    <span
                      className={`important-priority ${item.priority.toLowerCase()}`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <div className="important-date-meta">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.day}</span>
                  </div>

                  <p>{item.description}</p>
                </div>

                <div className="important-date-right">
                  <button
                    className="important-date-view-btn"
                    onClick={() => handleView(item)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ImportantDates;
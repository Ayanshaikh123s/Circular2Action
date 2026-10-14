import { Link } from "react-router-dom";
import "./AcademicCalendar.css";

const academicCalendarData = [
  {
    id: 1,
    month: "July 2026",
    events: [
      {
        id: 1,
        date: "06",
        day: "Mon",
        title: "Semester 5 Begins",
        category: "Academic",
        description:
          "The new academic semester begins for Semester 5 students.",
      },
      {
        id: 2,
        date: "08",
        day: "Wed",
        title: "Semester Orientation Program",
        category: "Academic",
        description:
          "Orientation session for students to understand the semester structure, subjects and academic activities.",
      },
      {
        id: 3,
        date: "13",
        day: "Mon",
        title: "Regular Lectures Begin",
        category: "Academic",
        description:
          "Regular lectures and classroom teaching begin according to the semester timetable.",
      },
      {
        id: 4,
        date: "25",
        day: "Sat",
        title: "Student Clubs Registration",
        category: "Events",
        description:
          "Students can participate in college clubs and student activities.",
      },
    ],
  },
  {
    id: 2,
    month: "August 2026",
    events: [
      {
        id: 5,
        date: "15",
        day: "Sat",
        title: "Independence Day Celebration",
        category: "Events",
        description:
          "College Independence Day celebration and cultural activities.",
      },
      {
        id: 6,
        date: "20",
        day: "Thu",
        title: "Internal Assessment Begins",
        category: "Examination",
        description:
          "Internal assessment activities begin according to the academic schedule.",
      },
      {
        id: 7,
        date: "28",
        day: "Fri",
        title: "Academic Workshop",
        category: "Workshop",
        description:
          "Academic workshop for students covering practical and industry-related topics.",
      },
    ],
  },
  {
    id: 3,
    month: "September 2026",
    events: [
      {
        id: 8,
        date: "07",
        day: "Mon",
        title: "Mid-Semester Examination",
        category: "Examination",
        description:
          "Mid-semester examinations begin for eligible Semester 5 students.",
      },
      {
        id: 9,
        date: "18",
        day: "Fri",
        title: "Mid-Semester Examination Ends",
        category: "Examination",
        description:
          "Mid-semester examination period concludes.",
      },
      {
        id: 10,
        date: "24",
        day: "Thu",
        title: "Navratri Cultural Activities",
        category: "Events",
        description:
          "College cultural activities and student events are organized during the festive period.",
      },
      {
        id: 11,
        date: "28",
        day: "Mon",
        title: "Project Guidance Session",
        category: "Project",
        description:
          "Project guidance and review session for Semester 5 students.",
      },
    ],
  },
  {
    id: 4,
    month: "October 2026",
    events: [
      {
        id: 12,
        date: "05",
        day: "Mon",
        title: "Data Analytics Workshop",
        category: "Workshop",
        description:
          "Workshop focused on data analytics concepts, tools and practical applications.",
      },
      {
        id: 13,
        date: "12",
        day: "Mon",
        title: "Project Development Phase",
        category: "Project",
        description:
          "Students continue project development and practical implementation work.",
      },
      {
        id: 14,
        date: "19",
        day: "Mon",
        title: "Practical Activity Week",
        category: "Academic",
        description:
          "Practical and laboratory activities are conducted according to the academic schedule.",
      },
      {
        id: 15,
        date: "31",
        day: "Sat",
        title: "Sports and Cultural Activities",
        category: "Events",
        description:
          "Inter-college and student participation activities are conducted.",
      },
    ],
  },
  {
    id: 5,
    month: "November 2026",
    events: [
      {
        id: 16,
        date: "02",
        day: "Mon",
        title: "Semester Examination Begins",
        category: "Examination",
        description:
          "Semester-end examination period begins according to the examination schedule.",
      },
      {
        id: 17,
        date: "10",
        day: "Tue",
        title: "Practical Examination",
        category: "Examination",
        description:
          "Practical examinations are conducted for applicable subjects.",
      },
      {
        id: 18,
        date: "20",
        day: "Fri",
        title: "Semester Examination Ends",
        category: "Examination",
        description:
          "Semester-end examination period concludes.",
      },
      {
        id: 19,
        date: "25",
        day: "Wed",
        title: "Project Evaluation",
        category: "Project",
        description:
          "Project evaluation and review activities are conducted for students.",
      },
    ],
  },
  {
    id: 6,
    month: "December 2026",
    events: [
      {
        id: 20,
        date: "01",
        day: "Tue",
        title: "Semester 5 Academic Activities Conclude",
        category: "Academic",
        description:
          "Regular academic activities for Semester 5 conclude.",
      },
      {
        id: 21,
        date: "10",
        day: "Thu",
        title: "Project Presentation",
        category: "Project",
        description:
          "Students present their semester projects according to the evaluation schedule.",
      },
      {
        id: 22,
        date: "18",
        day: "Fri",
        title: "Semester Result Preparation",
        category: "Academic",
        description:
          "Academic result processing and semester documentation activities take place.",
      },
      {
        id: 23,
        date: "25",
        day: "Fri",
        title: "Winter Break Begins",
        category: "Holiday",
        description:
          "Winter vacation period begins according to the academic calendar.",
      },
    ],
  },
];

function AcademicCalendar() {
  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const studentName = storedUser?.name || "Student";
  const semester = storedUser?.semester || "";

  const totalEvents = academicCalendarData.reduce(
    (total, month) => total + month.events.length,
    0
  );

  const examinationEvents = academicCalendarData.reduce(
    (total, month) =>
      total +
      month.events.filter(
        (event) => event.category === "Examination"
      ).length,
    0
  );

  const eventActivities = academicCalendarData.reduce(
    (total, month) =>
      total +
      month.events.filter(
        (event) =>
          event.category === "Events" ||
          event.category === "Workshop"
      ).length,
    0
  );

  const handleView = (event) => {
    alert(
      `Event: ${event.title}\n\nDate: ${event.date}\nCategory: ${event.category}\n\n${event.description}`
    );
  };

  return (
    <div className="academic-calendar-page">
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

          <Link
            to="/academic-calendar"
            className="student-nav-item active"
          >
            <span className="student-nav-icon">▣</span>
            Academic Calendar
          </Link>

          <Link to="/important-dates" className="student-nav-item">
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

      {/* MAIN */}
      <main className="academic-calendar-main">
        <header className="academic-calendar-header">
          <div>
            <p className="academic-calendar-eyebrow">ACADEMIC</p>

            <h1>Academic Calendar</h1>

            <p>
              View important academic events, examinations and college
              activities.
            </p>
          </div>

          <div className="academic-calendar-profile">
            <div className="academic-calendar-avatar">
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

        {/* SUMMARY */}
        <section className="academic-calendar-summary">
          <div className="academic-calendar-summary-card">
            <div className="academic-calendar-summary-icon">
              ▣
            </div>

            <div>
              <strong>{totalEvents}</strong>
              <p>Total Events</p>
            </div>
          </div>

          <div className="academic-calendar-summary-card">
            <div className="academic-calendar-summary-icon exam-summary">
              !
            </div>

            <div>
              <strong>{examinationEvents}</strong>
              <p>Examination Events</p>
            </div>
          </div>

          <div className="academic-calendar-summary-card">
            <div className="academic-calendar-summary-icon event-summary">
              ◷
            </div>

            <div>
              <strong>{eventActivities}</strong>
              <p>Events & Workshops</p>
            </div>
          </div>
        </section>

        {/* CALENDAR */}
        <section className="academic-calendar-content-card">
          <div className="academic-calendar-toolbar">
            <div>
              <h2>Academic Schedule</h2>

              <p>
                July 2026 – December 2026 academic calendar.
              </p>
            </div>
          </div>

          <div className="academic-calendar-list">
            {academicCalendarData.map((month) => (
              <div className="academic-month" key={month.id}>
                <div className="academic-month-header">
                  <h3>{month.month}</h3>

                  <span>
                    {month.events.length}{" "}
                    {month.events.length === 1 ? "Event" : "Events"}
                  </span>
                </div>

                <div className="academic-events">
                  {month.events.map((event) => (
                    <div
                      className="academic-event"
                      key={event.id}
                    >
                      <div className="academic-date-box">
                        <strong>{event.date}</strong>
                        <span>{event.day}</span>
                      </div>

                      <div className="academic-event-info">
                        <div className="academic-event-title-row">
                          <h4>{event.title}</h4>

                          <span
                            className={`academic-category ${event.category
                              .toLowerCase()
                              .replaceAll(" ", "-")}`}
                          >
                            {event.category}
                          </span>
                        </div>

                        <p>{event.description}</p>
                      </div>

                      <button
                        className="academic-view-btn"
                        onClick={() => handleView(event)}
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AcademicCalendar;
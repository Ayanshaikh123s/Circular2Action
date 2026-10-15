import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { studentAPI } from "./api";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await studentAPI.getAll();
      const list = Array.isArray(res) ? res : (res?.students || []);
      setStudents(list);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [semesterFilter, setSemesterFilter] = useState("All Semesters");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "BCA",
    semester: "Semester 1",
    department: "Computer Applications",
    status: "Active",
  });

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        (student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (student.phone && student.phone.includes(searchTerm));

      const matchesCourse =
        courseFilter === "All Courses" ||
        student.course === courseFilter;

      const matchesSemester =
        semesterFilter === "All Semesters" ||
        String(student.semester).includes(semesterFilter.replace("Semester ", ""));

      const matchesStatus =
        statusFilter === "All Status" ||
        student.status === statusFilter;

      return (
        matchesSearch &&
        matchesCourse &&
        matchesSemester &&
        matchesStatus
      );
    });
  }, [
    students,
    searchTerm,
    courseFilter,
    semesterFilter,
    statusFilter,
  ]);

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const bcaStudents = students.filter(
    (student) => student.course === "BCA"
  ).length;

  const bcomStudents = students.filter(
    (student) => student.course === "B.Com"
  ).length;

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await studentAPI.create(formData);
      if (res.student) {
        setStudents((prev) => [res.student, ...prev]);
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "BCA",
        semester: "Semester 1",
        department: "Computer Applications",
        status: "Active",
      });
      setShowModal(false);
      alert("Student added successfully to the database!");
    } catch (err) {
      alert(err.message || "Failed to add student.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    try {
      await studentAPI.delete(id);
      setStudents((prev) =>
        prev.filter((student) => (student._id || student.id) !== id)
      );
      alert("Student deleted successfully.");
    } catch (err) {
      alert("Failed to delete student: " + err.message);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCourseFilter("All Courses");
    setSemesterFilter("All Semesters");
    setStatusFilter("All Status");
  };

  return (
    <div className="admin-layout">

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

          <Link
            to="/students"
            className="nav-item active"
          >
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

      {/* MAIN CONTENT */}
      <main className="admin-main">

        <header className="page-header">

          <div>
            <span className="eyebrow">
              STUDENT MANAGEMENT
            </span>

            <h1>Students</h1>

            <p>
              Manage students across all courses and semesters.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Student
          </button>

        </header>

        {/* STATS */}
        <section className="student-stats">

          <button
            className="student-stat-card"
            onClick={resetFilters}
          >
            <span>Total Students</span>
            <strong>{totalStudents}</strong>
            <small>All registered students</small>
          </button>

          <button
            className="student-stat-card"
            onClick={() => {
              setStatusFilter("Active");
              setCourseFilter("All Courses");
              setSemesterFilter("All Semesters");
            }}
          >
            <span>Active Students</span>
            <strong>{activeStudents}</strong>
            <small>Currently active</small>
          </button>

          <button
            className="student-stat-card"
            onClick={() => {
              setCourseFilter("BCA");
              setSemesterFilter("All Semesters");
              setStatusFilter("All Status");
            }}
          >
            <span>BCA Students</span>
            <strong>{bcaStudents}</strong>
            <small>Across all semesters</small>
          </button>

          <button
            className="student-stat-card"
            onClick={() => {
              setCourseFilter("B.Com");
              setSemesterFilter("All Semesters");
              setStatusFilter("All Status");
            }}
          >
            <span>B.Com Students</span>
            <strong>{bcomStudents}</strong>
            <small>Across all semesters</small>
          </button>

        </section>

        {/* FILTERS */}
        <section className="students-card">

          <div className="filters-top">

            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>

            <select
              value={courseFilter}
              onChange={(e) =>
                setCourseFilter(e.target.value)
              }
            >
              <option>All Courses</option>
              <option>BCA</option>
              <option>B.Com</option>
              <option>BBA</option>
              <option>MCA</option>
              <option>M.Com</option>
              <option>MBA</option>
            </select>

            <select
              value={semesterFilter}
              onChange={(e) =>
                setSemesterFilter(e.target.value)
              }
            >
              <option>All Semesters</option>
              <option>Semester 1</option>
              <option>Semester 2</option>
              <option>Semester 3</option>
              <option>Semester 4</option>
              <option>Semester 5</option>
              <option>Semester 6</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

          </div>

          {/* TABLE */}
          <div className="table-header-row">

            <div>
              Showing{" "}
              <strong>{filteredStudents.length}</strong>{" "}
              students
            </div>

            <button
              className="reset-btn"
              onClick={resetFilters}
            >
              Reset Filters
            </button>

          </div>

          <div className="students-table-wrapper">

            <table className="students-table">

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (

                    <tr key={student.id}>

                      <td>
                        <div className="student-info">
                          <div className="student-avatar">
                            {student.name.charAt(0)}
                          </div>

                          <div>
                            <strong>{student.name}</strong>
                            <span>{student.email}</span>
                          </div>
                        </div>
                      </td>

                      <td>{student.phone}</td>

                      <td>
                        <span className="course-badge">
                          {student.course}
                        </span>
                      </td>

                      <td>{student.semester}</td>

                      <td>{student.department}</td>

                      <td>
                        <span
                          className={`status-badge ${
                            student.status === "Active"
                              ? "active-status"
                              : "inactive-status"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            className="view-btn"
                            onClick={() =>
                              alert(
                                `${student.name}\n${student.course} - ${student.semester}\n${student.email}`
                              )
                            }
                          >
                            View
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(student.id)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="empty-row"
                    >
                      No students found for the selected filters.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* INFO */}
        <section className="students-info">

          <div className="info-icon">i</div>

          <div>
            <h3>Student Audience Management</h3>

            <p>
              Students are organized by course and semester so
              circulars can later be targeted to specific groups,
              such as BCA Semester 5 or B.Com Semester 3.
            </p>
          </div>

        </section>

      </main>

      {/* ADD STUDENT MODAL */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="student-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <span className="eyebrow">
                  STUDENT MANAGEMENT
                </span>

                <h2>Add New Student</h2>

                <p>
                  Add a student to the college directory.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleAddStudent}>

              <div className="form-grid">

                <div className="form-group full-width">
                  <label>Full Name *</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter student name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="student@college.com"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label>Course *</label>

                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleFormChange}
                  >
                    <option>BCA</option>
                    <option>B.Com</option>
                    <option>BBA</option>
                    <option>MCA</option>
                    <option>M.Com</option>
                    <option>MBA</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Semester *</label>

                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleFormChange}
                  >
                    <option>Semester 1</option>
                    <option>Semester 2</option>
                    <option>Semester 3</option>
                    <option>Semester 4</option>
                    <option>Semester 5</option>
                    <option>Semester 6</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Department</label>

                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleFormChange}
                  >
                    <option>Computer Applications</option>
                    <option>Commerce</option>
                    <option>Business Administration</option>
                    <option>Management</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  Add Student
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Students;
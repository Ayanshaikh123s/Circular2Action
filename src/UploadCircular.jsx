import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { circularAPI } from "./api";
import "./UploadCircular.css";

function UploadCircular() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("academic");
  const [circularNumber, setCircularNumber] = useState("");
  const [description, setDescription] = useState("");
  const [targetType, setTargetType] = useState("all");
  const [semester, setSemester] = useState("1");
  const [department, setDepartment] = useState("bca");
  const [actionRequired, setActionRequired] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("normal");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
    }
  };

  const handleSave = async (status = "Published") => {
    if (!title.trim()) {
      alert("Please enter circular title.");
      return;
    }
    if (!description.trim()) {
      alert("Please enter circular description.");
      return;
    }

    try {
      setLoading(true);

      let targetValue = "";
      let audience = "All Students";
      if (targetType === "semester") {
        targetValue = semester;
        audience = `Semester ${semester}`;
      } else if (targetType === "department") {
        targetValue = department;
        audience = `${department.toUpperCase()} Students`;
      }

      const formattedDeadline = deadline
        ? new Date(deadline).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "—";

      // Capitalize category properly
      const categoryMap = {
        academic: "Academic",
        examination: "Examination",
        event: "Events",
        finance: "Finance",
        general: "General",
        "student-affairs": "Student Services",
      };

      const payload = {
        title: title.trim(),
        circularNumber: circularNumber.trim() || undefined,
        category: categoryMap[category] || "General",
        description: description.trim(),
        targetType,
        targetValue,
        audience,
        actionRequired: actionRequired.trim(),
        deadline: formattedDeadline,
        priority: priority.charAt(0).toUpperCase() + priority.slice(1),
        status,
        fileName,
      };

      await circularAPI.create(payload);
      alert(`Circular ${status === "Draft" ? "saved as draft" : "published"} successfully! It is now live for students.`);
      navigate("/circular-list");
    } catch (err) {
      alert(err.message || "Failed to publish circular.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">

      {/* Sidebar */}
      <aside className="upload-sidebar">

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

          <p className="nav-section-title">CIRCULAR MANAGEMENT</p>

          <Link
            to="/upload-circular"
            className="nav-item active"
          >
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

          <p className="nav-section-title">ACTION MANAGEMENT</p>

          <Link to="/action-items" className="nav-item">
            <span className="nav-icon">✓</span>
            Action Items
          </Link>

          <Link to="/notifications" className="nav-item">
            <span className="nav-icon">♢</span>
            Notifications
        
          </Link>

          <p className="nav-section-title">STUDENT MANAGEMENT</p>

          <Link to="/students" className="nav-item">
            <span className="nav-icon">○</span>
            Students
          </Link>

          <p className="nav-section-title">INSIGHTS</p>

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


      {/* Main Content */}
      <main className="upload-main">

        {/* Header */}
        <header className="upload-header">

          <div>
            <p className="header-label">CIRCULAR MANAGEMENT</p>

            <h1>Upload Circular</h1>

            <p className="header-subtitle">
              Create and publish a new college circular for students.
            </p>
          </div>

          <Link
            to="/circular-list"
            className="secondary-header-btn"
          >
            View Circulars
          </Link>

        </header>


        {/* Form */}
        <form className="circular-form">

          {/* Basic Information */}
          <section className="form-card">

            <div className="form-card-header">
              <div className="form-number">01</div>

              <div>
                <h2>Basic Information</h2>
                <p>
                  Add the main details of the circular.
                </p>
              </div>
            </div>


            <div className="form-grid">

              {/* Title */}
              <div className="form-group full-width">

                <label htmlFor="title">
                  Circular Title
                  <span>*</span>
                </label>

                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Internal Examination Schedule"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

              </div>


              {/* Category */}
              <div className="form-group">

                <label htmlFor="category">
                  Category
                  <span>*</span>
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="academic">
                    Academic
                  </option>

                  <option value="examination">
                    Examination
                  </option>

                  <option value="event">
                    Event
                  </option>

                  <option value="finance">
                    Finance
                  </option>

                  <option value="general">
                    General
                  </option>

                  <option value="student-affairs">
                    Student Services
                  </option>
                </select>

              </div>


              {/* Circular Number */}
              <div className="form-group">

                <label htmlFor="circularNumber">
                  Circular Number
                </label>

                <input
                  id="circularNumber"
                  type="text"
                  placeholder="e.g. C2A/2026/045"
                  value={circularNumber}
                  onChange={(e) => setCircularNumber(e.target.value)}
                />

              </div>


              {/* Description */}
              <div className="form-group full-width">

                <label htmlFor="description">
                  Description
                  <span>*</span>
                </label>

                <textarea
                  id="description"
                  rows="5"
                  placeholder="Write the important information students need to know..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>

                <small>
                  Keep the description clear and easy to understand.
                </small>

              </div>

            </div>

          </section>


          {/* Audience */}
          <section className="form-card">

            <div className="form-card-header">
              <div className="form-number">02</div>

              <div>
                <h2>Target Audience</h2>
                <p>
                  Choose which students should receive this circular.
                </p>
              </div>
            </div>


            <div className="target-options">

              <label
                className={`target-option ${
                  targetType === "all" ? "selected" : ""
                }`}
              >

                <input
                  type="radio"
                  name="target"
                  value="all"
                  checked={targetType === "all"}
                  onChange={() => setTargetType("all")}
                />

                <div className="target-icon">○</div>

                <div>
                  <strong>All Students</strong>

                  <span>
                    Send to all registered students
                  </span>
                </div>

              </label>


              <label
                className={`target-option ${
                  targetType === "semester" ? "selected" : ""
                }`}
              >

                <input
                  type="radio"
                  name="target"
                  value="semester"
                  checked={targetType === "semester"}
                  onChange={() => setTargetType("semester")}
                />

                <div className="target-icon">S</div>

                <div>
                  <strong>Specific Semester</strong>

                  <span>
                    Send to students of selected semester
                  </span>
                </div>

              </label>


              <label
                className={`target-option ${
                  targetType === "department" ? "selected" : ""
                }`}
              >

                <input
                  type="radio"
                  name="target"
                  value="department"
                  checked={targetType === "department"}
                  onChange={() => setTargetType("department")}
                />

                <div className="target-icon">D</div>

                <div>
                  <strong>Specific Department</strong>

                  <span>
                    Send to students of selected department
                  </span>
                </div>

              </label>

            </div>


            {/* Semester */}
            {targetType === "semester" && (
              <div className="conditional-field">

                <label htmlFor="semester">
                  Select Semester
                </label>

                <select
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                </select>

              </div>
            )}


            {/* Department */}
            {targetType === "department" && (
              <div className="conditional-field">

                <label htmlFor="department">
                  Select Department
                </label>

                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="bca">
                    BCA
                  </option>

                  <option value="bba">
                    BBA
                  </option>

                  <option value="bcom">
                    B.Com
                  </option>

                  <option value="mca">
                    MCA
                  </option>

                  <option value="mba">
                    MBA
                  </option>
                </select>

              </div>
            )}

          </section>


          {/* Action Details */}
          <section className="form-card">

            <div className="form-card-header">
              <div className="form-number">03</div>

              <div>
                <h2>Action Details</h2>

                <p>
                  Define what students need to do after reading the circular.
                </p>
              </div>
            </div>


            <div className="form-grid">

              <div className="form-group full-width">

                <label htmlFor="action">
                  Action Required
                </label>

                <textarea
                  id="action"
                  rows="4"
                  placeholder="e.g. Students must submit the examination form before the deadline."
                  value={actionRequired}
                  onChange={(e) => setActionRequired(e.target.value)}
                ></textarea>

              </div>


              <div className="form-group">

                <label htmlFor="actionDate">
                  Action Deadline
                </label>

                <input
                  id="actionDate"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />

              </div>


              <div className="form-group">

                <label htmlFor="priority">
                  Priority
                </label>

                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >

                  <option value="low">
                    Low
                  </option>

                  <option value="normal">
                    Normal
                  </option>

                  <option value="high">
                    High
                  </option>

                  <option value="urgent">
                    Urgent
                  </option>

                </select>

              </div>

            </div>

          </section>


          {/* Document */}
          <section className="form-card">

            <div className="form-card-header">
              <div className="form-number">04</div>

              <div>
                <h2>Attach Circular</h2>

                <p>
                  Upload the official circular document.
                </p>
              </div>
            </div>


            <label className="upload-box">

              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />

              <div className="upload-icon">
                ↑
              </div>

              {fileName ? (
                <>
                  <strong>{fileName}</strong>

                  <span>
                    File selected successfully
                  </span>
                </>
              ) : (
                <>
                  <strong>
                    Click to upload a document
                  </strong>

                  <span>
                    PDF, DOC, DOCX, JPG or PNG
                  </span>
                </>
              )}

            </label>

          </section>


          {/* Future Smart Processing */}
          <section className="smart-info">

            <div className="smart-icon">
              ✦
            </div>

            <div>
              <strong>Smart Processing</strong>

              <p>
                In the next phase, Circular2Action will use OCR and AI
                to extract important information, summarize the circular,
                and identify action items automatically.
              </p>
            </div>

            <span className="coming-soon">
              Coming later
            </span>

          </section>


          {/* Form Actions */}
          <div className="form-actions">

            <Link
              to="/admin-dashboard"
              className="cancel-btn"
            >
              Cancel
            </Link>

            <button
              type="button"
              className="draft-btn"
              disabled={loading}
              onClick={() => handleSave("Draft")}
            >
              {loading ? "Saving..." : "Save as Draft"}
            </button>

            <button
              type="button"
              className="publish-btn"
              disabled={loading}
              onClick={() => handleSave("Published")}
            >
              {loading ? "Publishing..." : "Publish Circular"}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default UploadCircular;
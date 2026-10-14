import { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentProfile.css";

function StudentProfile() {
  const storedUser = JSON.parse(
    localStorage.getItem("circular2actionUser") || "null"
  );

  const [user, setUser] = useState({
    name: storedUser?.name || "Student",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "",
    semester: storedUser?.semester || "",
    role: storedUser?.role || "Student",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    name: user.name,
    phone: user.phone,
  });

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...storedUser,
      name: editData.name.trim(),
      phone: editData.phone.trim(),
    };

    localStorage.setItem(
      "circular2actionUser",
      JSON.stringify(updatedUser)
    );

    setUser({
      ...user,
      name: updatedUser.name,
      phone: updatedUser.phone,
    });

    setIsEditing(false);

    alert("Profile updated successfully.");
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      phone: user.phone,
    });

    setIsEditing(false);
  };

  return (
    <div className="student-profile-page">
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

          <p className="student-nav-heading">ACTION MANAGEMENT</p>

          <Link to="/my-actions" className="student-nav-item">
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

          <p className="student-nav-heading">ACCOUNT</p>

          <Link
            to="/student-profile"
            className="student-nav-item active"
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

      <main className="student-profile-main">
        <header className="student-profile-header">
          <div>
            <p className="student-profile-eyebrow">ACCOUNT</p>

            <h1>Profile</h1>

            <p>
              View and manage your student account information.
            </p>
          </div>

          <div className="student-profile-mini">
            <div className="student-profile-mini-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user.name}</strong>

              <span>
                {user.semester
                  ? `Semester ${user.semester}`
                  : "Student"}
              </span>
            </div>
          </div>
        </header>

        {/* PROFILE OVERVIEW */}

        <section className="student-profile-overview">
          <div className="student-profile-avatar-large">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="student-profile-overview-info">
            <h2>{user.name}</h2>

            <p>
              {user.role === "Student"
                ? "Student"
                : user.role}
            </p>

            <span>
              {user.semester
                ? `Semester ${user.semester}`
                : "Student Portal"}
            </span>
          </div>

          {!isEditing && (
            <button
              className="student-edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </section>

        {/* PROFILE DETAILS */}

        <section className="student-profile-content-card">
          <div className="student-profile-card-header">
            <div>
              <h2>Personal Information</h2>

              <p>
                Your basic account and student information.
              </p>
            </div>
          </div>

          {isEditing ? (
            <form
              className="student-profile-edit-form"
              onSubmit={handleSave}
            >
              <div className="student-profile-form-grid">
                <div className="student-profile-field">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="student-profile-field">
                  <label>Email Address</label>

                  <input
                    type="email"
                    value={user.email}
                    disabled
                  />

                  <small>
                    Email address cannot be changed here.
                  </small>
                </div>

                <div className="student-profile-field">
                  <label>Phone Number</label>

                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="student-profile-field">
                  <label>Semester</label>

                  <input
                    type="text"
                    value={
                      user.semester
                        ? `Semester ${user.semester}`
                        : "Not specified"
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="student-profile-form-actions">
                <button
                  type="button"
                  className="student-cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="student-save-btn"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="student-profile-details">
              <div className="student-detail-item">
                <span>Full Name</span>
                <strong>{user.name}</strong>
              </div>

              <div className="student-detail-item">
                <span>Email Address</span>
                <strong>{user.email || "Not provided"}</strong>
              </div>

              <div className="student-detail-item">
                <span>Phone Number</span>
                <strong>{user.phone || "Not provided"}</strong>
              </div>

              <div className="student-detail-item">
                <span>Account Type</span>
                <strong>{user.role}</strong>
              </div>

              <div className="student-detail-item">
                <span>Semester</span>
                <strong>
                  {user.semester
                    ? `Semester ${user.semester}`
                    : "Not specified"}
                </strong>
              </div>

              <div className="student-detail-item">
                <span>Portal</span>
                <strong>Circular2Action Student Portal</strong>
              </div>
            </div>
          )}
        </section>

        {/* ACCOUNT INFORMATION */}

        <section className="student-account-card">
          <div className="student-account-icon">✓</div>

          <div>
            <h3>Account Information</h3>

            <p>
              Your profile information is currently stored locally in
              this frontend version. It will be connected to the
              database when the backend is added.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentProfile;
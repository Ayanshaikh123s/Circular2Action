import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@circular2action.com",
    phone: "+91 98765 43210",
    role: "System Administrator",
    department: "Administration",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page">

      {/* Sidebar */}
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

          <Link to="/analytics" className="nav-item">
            <span className="nav-icon">◩</span>
            Analytics
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <Link to="/profile" className="nav-item active">
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
      <main className="profile-main">

        <header className="profile-header">
          <div>
            <span className="page-eyebrow">ACCOUNT</span>

            <h1>Profile</h1>

            <p>
              Manage your administrator account information.
            </p>
          </div>

          {!isEditing && (
            <button
              className="edit-profile-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </header>


        {/* Profile Overview */}
        <section className="profile-overview">

          <div className="profile-avatar">
            {profile.name.charAt(0)}
          </div>

          <div className="profile-main-info">
            <h2>{profile.name}</h2>

            <p>{profile.email}</p>

            <span className="admin-role-badge">
              {profile.role}
            </span>
          </div>

        </section>


        {/* Personal Information */}
        <section className="profile-card">

          <div className="profile-card-header">
            <div>
              <h2>Personal Information</h2>
              <p>
                Your basic account information.
              </p>
            </div>
          </div>


          <div className="profile-form-grid">

            <div className="profile-field">

              <label>Full Name</label>

              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-value">
                  {profile.name}
                </div>
              )}

            </div>


            <div className="profile-field">

              <label>Email Address</label>

              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-value">
                  {profile.email}
                </div>
              )}

            </div>


            <div className="profile-field">

              <label>Phone Number</label>

              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-value">
                  {profile.phone}
                </div>
              )}

            </div>


            <div className="profile-field">

              <label>Department</label>

              {isEditing ? (
                <input
                  type="text"
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-value">
                  {profile.department}
                </div>
              )}

            </div>


            <div className="profile-field">

              <label>Account Role</label>

              <div className="profile-value disabled-value">
                {profile.role}
              </div>

            </div>


            <div className="profile-field">

              <label>Account Status</label>

              <div className="profile-value status-value">
                <span className="status-dot"></span>
                Active
              </div>

            </div>

          </div>


          {isEditing && (
            <div className="profile-actions">

              <button
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>

            </div>
          )}

        </section>


        {/* Security */}
        <section className="profile-card">

          <div className="profile-card-header">
            <div>
              <h2>Security</h2>
              <p>
                Manage your account security settings.
              </p>
            </div>
          </div>

          <div className="security-row">

            <div>
              <strong>Password</strong>

              <p>
                Last updated recently
              </p>
            </div>

            <button
              className="security-btn"
              onClick={() =>
                alert("Password change will be connected with the backend later.")
              }
            >
              Change Password
            </button>

          </div>

        </section>


        {/* System Information */}
        <section className="profile-card">

          <div className="profile-card-header">
            <div>
              <h2>System Information</h2>
              <p>
                Circular2Action administrator account details.
              </p>
            </div>
          </div>

          <div className="system-info-grid">

            <div>
              <span>Account Type</span>
              <strong>Administrator</strong>
            </div>

            <div>
              <span>Portal</span>
              <strong>Circular2Action Admin</strong>
            </div>

            <div>
              <span>Access Level</span>
              <strong>Full Access</strong>
            </div>

            <div>
              <span>System Status</span>
              <strong className="system-active">
                Active
              </strong>
            </div>

          </div>

        </section>


        {/* Future Backend Info */}
        <section className="profile-info-box">

          <div className="info-icon">i</div>

          <div>
            <h3>Profile data will be stored securely</h3>

            <p>
              This profile currently uses frontend sample data.
              Once the backend and MongoDB are connected, profile
              information will be loaded and updated from the database.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default Profile;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "./api";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Check required fields
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !accountType ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Student must select semester
    if (accountType === "student" && !semester) {
      alert("Please select your semester.");
      return;
    }

    // Check password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Check terms
    if (!termsAccepted) {
      alert("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    try {
      setLoading(true);
      const userPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: accountType === "student" ? "Student" : "Admin",
        semester: accountType === "student" ? semester : "",
        course: "BCA",
        department: "Computer Applications",
      };

      await authAPI.signup(userPayload);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      {/* =========================
          LEFT BRANDING SECTION
      ========================= */}

      <section className="signup-intro">

        <div className="signup-brand">
          <div className="signup-brand-icon">C</div>

          <div>
            <h1>Circular2Action</h1>
            <span>Smart Circular Management</span>
          </div>
        </div>

        <div className="signup-intro-content">

          <p className="signup-small-heading">
            GET STARTED
          </p>

          <h2>
            One account.
            <br />
            <span>Everything organized.</span>
          </h2>

          <p className="signup-description">
            Create your account and keep your college
            circulars, actions and important updates
            organized in one place.
          </p>

          <div className="signup-points">

            <div className="signup-point">
              <div className="point-icon">✓</div>

              <div>
                <h3>Centralized Updates</h3>
                <p>
                  Find important college information easily.
                </p>
              </div>
            </div>

            <div className="signup-point">
              <div className="point-icon">✓</div>

              <div>
                <h3>Action Tracking</h3>
                <p>
                  Keep track of tasks and deadlines.
                </p>
              </div>
            </div>

            <div className="signup-point">
              <div className="point-icon">✓</div>

              <div>
                <h3>Simple & Organized</h3>
                <p>
                  Everything you need in one platform.
                </p>
              </div>
            </div>

          </div>

        </div>

        <p className="signup-intro-footer">
          Simple • Organized • Connected
        </p>

      </section>


      {/* =========================
          SIGNUP SECTION
      ========================= */}

      <section className="signup-area">

        <div className="signup-card">

          {/* Mobile Brand */}

          <div className="signup-mobile-brand">

            <div className="signup-mobile-icon">
              C
            </div>

            <span>
              Circular2Action
            </span>

          </div>


          {/* Heading */}

          <div className="signup-heading">

            <p className="signup-label">
              CREATE ACCOUNT
            </p>

            <h2>
              Join Circular2Action
            </h2>

            <p>
              Fill in your details to create your account.
            </p>

          </div>


          {/* Form */}

          <form
            className="signup-form"
            onSubmit={handleCreateAccount}
          >

            {/* Full Name */}

            <div className="signup-input-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* Email + Phone */}

            <div className="signup-row">

              <div className="signup-input-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="signup-input-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Account Type */}

            <div className="signup-input-group">

              <label htmlFor="role">
                Account Type
              </label>

              <select
                id="role"
                value={accountType}
                onChange={(e) => {
                  setAccountType(e.target.value);

                  // Clear semester when switching to Admin
                  if (e.target.value !== "student") {
                    setSemester("");
                  }
                }}
                required
              >

                <option value="" disabled>
                  Select account type
                </option>

                <option value="student">
                  Student
                </option>

                <option value="admin">
                  Admin
                </option>

              </select>

            </div>


            {/* Semester
                Only visible for Student */}

            {accountType === "student" && (
              <div className="signup-input-group semester-field">

                <label htmlFor="semester">
                  Semester
                </label>

                <select
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                >

                  <option value="" disabled>
                    Select your semester
                  </option>

                  <option value="1">
                    Semester 1
                  </option>

                  <option value="2">
                    Semester 2
                  </option>

                  <option value="3">
                    Semester 3
                  </option>

                  <option value="4">
                    Semester 4
                  </option>

                  <option value="5">
                    Semester 5
                  </option>

                  <option value="6">
                    Semester 6
                  </option>

                </select>

              </div>
            )}


            {/* Password + Confirm Password */}

            <div className="signup-row">

              <div className="signup-input-group">

                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="signup-input-group">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Terms */}

            <label className="terms-option">

              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />

              <span>
                I agree to the{" "}

                <button type="button">
                  Terms & Conditions
                </button>

                {" "}and Privacy Policy.
              </span>

            </label>


            {/* Create Account Button */}

            <button
              type="submit"
              className="signup-button"
            >
              Create Account
              <span>→</span>
            </button>

          </form>


          {/* Login Link */}

          <div className="signup-login-text">

            Already have an account?

            <Link to="/login">
              Sign in
            </Link>

          </div>

        </div>


        {/* Copyright */}

        <p className="signup-copyright">
          © 2026 Circular2Action · College Management Platform
        </p>

      </section>

    </div>
  );
}

export default Signup;
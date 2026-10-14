import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(
      localStorage.getItem("circular2actionUser") || "null"
    );

    // Check if account exists
    if (!storedUser) {
      alert("No account found. Please create an account first.");
      return;
    }

    // Check email and password
    if (
      email.trim().toLowerCase() !==
        storedUser.email.trim().toLowerCase() ||
      password !== storedUser.password
    ) {
      alert("Invalid email or password.");
      return;
    }

    // Login successful
    localStorage.setItem("isLoggedIn", "true");

    // Role based dashboard
    if (storedUser.role === "Admin") {
      navigate("/admin-dashboard");
    } else if (storedUser.role === "Student") {
      navigate("/student-dashboard");
    }
  };

  return (
    <div className="login-page">

      {/* Decorative Background */}
      <div className="login-decoration decoration-one"></div>
      <div className="login-decoration decoration-two"></div>

      {/* Left Branding */}
      <section className="login-intro">

        <div className="brand">
          <div className="brand-icon">C</div>

          <div>
            <h1>Circular2Action</h1>
            <span>Smart Circular Management</span>
          </div>
        </div>

        <div className="intro-content">

          <p className="small-heading">
            COLLEGE MANAGEMENT SYSTEM
          </p>

          <h2>
            From circulars
            <br />
            to <span>action.</span>
          </h2>

          <p className="intro-text">
            A smarter way to manage college circulars,
            important actions, deadlines and student updates
            in one organized platform.
          </p>

          <div className="feature-list">

            <div className="feature-item">
              <div className="feature-number">01</div>

              <div>
                <h3>Stay Updated</h3>
                <p>Access important college circulars in one place.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-number">02</div>

              <div>
                <h3>Track Actions</h3>
                <p>Know what needs to be completed and when.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-number">03</div>

              <div>
                <h3>Never Miss</h3>
                <p>Keep track of deadlines and important updates.</p>
              </div>
            </div>

          </div>

        </div>

        <p className="intro-footer">
          Simple • Organized • Connected
        </p>

      </section>

      {/* Login Area */}
      <section className="login-area">

        <div className="login-card">

          <div className="mobile-brand">
            <div className="mobile-icon">C</div>
            <span>Circular2Action</span>
          </div>

          <div className="login-heading">

            <p className="welcome-label">
              WELCOME BACK
            </p>

            <h2>
              Sign in to your account
            </h2>

            <p>
              Enter your details to access your dashboard.
            </p>

          </div>

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            {/* Email */}
            <div className="input-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">@</span>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div className="input-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">●</span>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>

            </div>

            <div className="login-options">

              <label className="remember-option">

                <input type="checkbox" />

                <span>
                  Remember me
                </span>

              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>

            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="login-button"
            >
              Sign In
            </button>

          </form>

          <div className="login-divider">
            <span>New to Circular2Action?</span>
          </div>

          <Link
            to="/signup"
            className="create-account"
          >
            Create an account
          </Link>

        </div>

        <p className="copyright">
          © 2026 Circular2Action · College Management Platform
        </p>

      </section>

    </div>
  );
}

export default Login;
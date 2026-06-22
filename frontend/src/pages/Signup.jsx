import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiSignup } from "../api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm]       = useState({ email: "", password: "", confirm: "" });
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await apiSignup(form.email, form.password);
      navigate("/login", { state: { message: "Account created! Please sign in." } });
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="signup-page" className="auth-page">
      <div className="auth-page__glow" />

      <div className="glass-card auth-card animate-fadeInUp">
        <Link to="/" className="auth-logo">
          <span>✈</span> First<span className="gradient-text">Fly</span>
        </Link>

        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Free forever. No credit card needed.</p>

        {error && (
          <div id="signup-error" className="auth-error">
            <span>⚠</span> {error}
          </div>
        )}

        <form id="signup-form" onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              name="password"
              placeholder="Min. 8 characters"
              className="form-input"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              minLength={8}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
            <input
              id="signup-confirm"
              type="password"
              name="confirm"
              placeholder="Repeat your password"
              className="form-input"
              value={form.confirm}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          <button
            id="signup-submit-btn"
            type="submit"
            className="btn btn-primary btn-full mt-md"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create Account →"}
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" id="signup-login-link">Sign in</Link>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: var(--space-xl);
        }
        .auth-page__glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 20%, rgba(99,102,241,0.15) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 20% 80%, rgba(249,115,22,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .auth-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          padding: var(--space-2xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .auth-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          text-decoration: none;
          letter-spacing: -0.03em;
          margin-bottom: var(--space-md);
        }
        .auth-title    { font-size: 1.75rem; font-weight: 800; letter-spacing: -0.03em; }
        .auth-subtitle { font-size: 0.9375rem; color: var(--text-secondary); }
        .auth-form     { margin-top: var(--space-lg); }
        .auth-error {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          background: var(--color-dream-lo);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: var(--radius-md);
          color: var(--color-dream);
          font-size: 0.875rem;
          margin-top: var(--space-md);
        }
        .auth-footer-text {
          text-align: center;
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-top: var(--space-lg);
        }
      `}</style>
    </div>
  );
}

export default Signup;
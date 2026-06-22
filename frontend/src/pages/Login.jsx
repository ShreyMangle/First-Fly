import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { apiLogin } from "../api";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiLogin(form.email, form.password);
      login(data.access_token);
      navigate("/app");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-page" className="auth-page">
      <div className="auth-page__glow" />

      <div className="glass-card auth-card animate-fadeInUp">
        {/* Logo */}
        <Link to="/" className="auth-logo">
          <span>✈</span> First<span className="gradient-text">Fly</span>
        </Link>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to access your recommendations</p>

        {error && (
          <div id="login-error" className="auth-error">
            <span>⚠</span> {error}
          </div>
        )}

        <form id="login-form" onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
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
            <label className="form-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="••••••••"
              className="form-input"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className="btn btn-primary btn-full mt-md"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account?{" "}
          <Link to="/signup" id="login-signup-link">Create one free</Link>
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
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(249,115,22,0.08) 0%, transparent 60%);
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

export default Login;
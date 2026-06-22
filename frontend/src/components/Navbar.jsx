import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { to: "/about",   label: "About" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav id="navbar" className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" id="nav-logo" className="navbar__logo">
          <span className="navbar__logo-icon">✈</span>
          <span>First<span className="gradient-text">Fly</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar__links">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              id={`nav-link-${label.toLowerCase()}`}
              className={`navbar__link${location.pathname === to ? " navbar__link--active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="navbar__actions">
          {isAuthenticated ? (
            <>
              <Link to="/app" id="nav-app-btn" className="btn btn-outline btn-sm">
                Dashboard
              </Link>
              <button id="nav-logout-btn" onClick={logout} className="btn btn-ghost btn-sm">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" id="nav-login-btn" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link to="/app" id="nav-cta-btn" className="btn btn-primary btn-sm">
                Check My Chances
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          id="nav-hamburger"
          className={`navbar__hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="navbar__drawer">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="navbar__drawer-link">{label}</Link>
          ))}
          <div className="navbar__drawer-actions">
            {isAuthenticated ? (
              <>
                <Link to="/app" className="btn btn-outline btn-full">Dashboard</Link>
                <button onClick={logout} className="btn btn-ghost btn-full">Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-full">Login</Link>
                <Link to="/app"  className="btn btn-primary btn-full">Check My Chances</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--nav-height);
          z-index: 100;
          transition: background var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
          border-bottom: 1px solid transparent;
        }
        .navbar--scrolled {
          background: rgba(10, 14, 26, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-color: var(--color-border);
          box-shadow: var(--shadow-sm);
        }
        .navbar__inner {
          display: flex;
          align-items: center;
          height: 100%;
          gap: var(--space-xl);
        }
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          text-decoration: none;
        }
        .navbar__logo-icon { font-size: 1.1rem; }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          flex: 1;
        }
        .navbar__link {
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color var(--transition-fast), background var(--transition-fast);
          text-decoration: none;
        }
        .navbar__link:hover, .navbar__link--active {
          color: var(--text-primary);
          background: var(--color-surface-md);
        }
        .navbar__actions {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          margin-left: auto;
        }
        .navbar__hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all var(--transition-base);
        }
        .navbar__hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .navbar__hamburger.open span:nth-child(2) { opacity: 0; }
        .navbar__hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
        .navbar__drawer {
          background: rgba(10, 14, 26, 0.97);
          backdrop-filter: blur(16px);
          border-top: 1px solid var(--color-border);
          padding: var(--space-lg) var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .navbar__drawer-link {
          padding: var(--space-sm) 0;
          font-size: 1.0625rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--color-border);
          text-decoration: none;
        }
        .navbar__drawer-link:hover { color: var(--text-primary); }
        .navbar__drawer-actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          margin-top: var(--space-md);
        }
        @media (max-width: 768px) {
          .navbar__links, .navbar__actions { display: none; }
          .navbar__hamburger { display: flex; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
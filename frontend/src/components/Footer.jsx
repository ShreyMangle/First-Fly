import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span>✈</span> First<span className="gradient-text">Fly</span>
          </Link>
          <p className="footer__tagline">
            Data-driven college decisions for MHT-CET students.
          </p>
        </div>

        {/* Links */}
        <div className="footer__links-group">
          <h4 className="footer__heading">Product</h4>
          <Link to="/app"     className="footer__link">College Finder</Link>
          <Link to="/pricing" className="footer__link">Pricing</Link>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__heading">Company</h4>
          <Link to="/about"   className="footer__link">About</Link>
          <Link to="/contact" className="footer__link">Contact</Link>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__heading">Legal</h4>
          <Link to="/privacy" className="footer__link">Privacy Policy</Link>
          <Link to="/terms"   className="footer__link">Terms of Service</Link>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {year} First Fly. All rights reserved.</span>
          <span className="footer__bottom-tagline">Built for Maharashtra's future engineers.</span>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--color-bg-alt);
          border-top: 1px solid var(--color-border);
          margin-top: auto;
        }
        .footer__inner {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: var(--space-2xl);
          padding: var(--space-3xl) var(--space-xl);
        }
        .footer__logo {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          text-decoration: none;
          letter-spacing: -0.03em;
          margin-bottom: var(--space-md);
        }
        .footer__tagline {
          font-size: 0.875rem;
          color: var(--text-tertiary);
          line-height: 1.6;
        }
        .footer__heading {
          font-size: 0.8125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-tertiary);
          margin-bottom: var(--space-md);
        }
        .footer__links-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .footer__link {
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .footer__link:hover { color: var(--text-primary); }
        .footer__bottom {
          border-top: 1px solid var(--color-border);
          padding: var(--space-lg) var(--space-xl);
        }
        .footer__bottom-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8125rem;
          color: var(--text-tertiary);
        }
        @media (max-width: 768px) {
          .footer__inner {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-xl);
            padding: var(--space-2xl) var(--space-lg);
          }
          .footer__brand { grid-column: 1 / -1; }
          .footer__bottom-inner { flex-direction: column; gap: var(--space-sm); text-align: center; }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
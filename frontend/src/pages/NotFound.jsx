import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div id="not-found-page" className="not-found">
      <div className="not-found__glow" />
      <div className="not-found__content">
        <div className="not-found__code gradient-text">404</div>
        <h1 className="not-found__title">Page not found</h1>
        <p className="not-found__desc">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" id="not-found-home-btn" className="btn btn-primary btn-lg mt-xl">
          Back to Home →
        </Link>
      </div>

      <style>{`
        .not-found {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          text-align: center;
          padding: var(--space-xl);
        }
        .not-found__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 40%, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .not-found__content { position: relative; display: flex; flex-direction: column; align-items: center; gap: var(--space-md); }
        .not-found__code { font-size: 8rem; font-weight: 900; letter-spacing: -0.05em; line-height: 1; }
        .not-found__title { font-size: 1.75rem; font-weight: 700; }
        .not-found__desc { color: var(--text-secondary); max-width: 360px; }
      `}</style>
    </div>
  );
}

export default NotFound;

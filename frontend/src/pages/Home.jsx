import { Link } from "react-router-dom";

const stats = [
  { value: "500+", label: "Colleges in database" },
  { value: "95%",  label: "Prediction accuracy" },
  { value: "10k+", label: "Students helped" },
  { value: "3",    label: "Years of data" },
];

const features = [
  {
    icon: "🎯",
    title: "Probability Engine",
    desc: "ML-powered admission probability for each college based on your percentile and category.",
  },
  {
    icon: "📊",
    title: "Historical Cutoffs",
    desc: "3 years of MHT-CET CAP cutoff data across all rounds, categories, and branches.",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    desc: "Get ranked recommendations in seconds — no counselor, no waiting.",
  },
  {
    icon: "🔒",
    title: "Category-Aware",
    desc: "Fully supports OPEN, SC, ST, OBC, EWS, and TFWS categories.",
  },
];

function Home() {
  return (
    <div id="home-page">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg-glow" />
        <div className="container hero__content">
          <div className="hero__badge animate-fadeInUp">
            <span>🚀</span> Free for all MHT-CET students
          </div>

          <h1 className="hero__title animate-fadeInUp animate-delay-1">
            Find Your Perfect<br />
            <span className="gradient-text">Engineering College</span>
          </h1>

          <p className="hero__subtitle animate-fadeInUp animate-delay-2">
            Data-driven recommendations powered by real CAP cutoffs.<br />
            Enter your percentile — get your personalised shortlist in seconds.
          </p>

          <div className="hero__ctas animate-fadeInUp animate-delay-3">
            <Link to="/app" id="hero-cta-primary" className="btn btn-primary btn-lg">
              Check My Chances →
            </Link>
            <Link to="/about" id="hero-cta-secondary" className="btn btn-outline btn-lg">
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="container stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card glass-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Everything you need to decide smarter</h2>
            <p className="mt-md">
              First Fly puts years of admission data at your fingertips — for free.
            </p>
          </div>

          <div className="features-grid mt-xl">
            {features.map((f) => (
              <div key={f.title} className="feature-card glass-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>Ready to find your college?</h2>
            <p className="mt-sm">Takes less than 60 seconds. No credit card needed.</p>
          </div>
          <Link to="/app" id="bottom-cta-btn" className="btn btn-primary btn-lg">
            Get Started Free →
          </Link>
        </div>
      </section>

      <style>{`
        /* Hero */
        .hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: var(--space-4xl) 0;
        }
        .hero__bg-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 60%, rgba(249,115,22,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero__content {
          position: relative;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-lg);
        }
        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          padding: 0.375rem 1rem;
          background: var(--color-primary-lo);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-primary-hi);
        }
        .hero__title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
          max-width: 800px;
        }
        .hero__subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 560px;
          line-height: 1.75;
        }
        .hero__ctas {
          display: flex;
          gap: var(--space-md);
          flex-wrap: wrap;
          justify-content: center;
        }
        /* Stats */
        .stats-section { padding: var(--space-2xl) 0; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-lg);
        }
        .stat-card {
          padding: var(--space-xl);
          text-align: center;
        }
        .stat-value {
          font-size: 2.25rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--color-primary-hi), var(--color-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.03em;
        }
        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-top: var(--space-xs);
        }
        /* Features */
        .features-section { padding: var(--space-4xl) 0; }
        .section-header { max-width: 600px; margin: 0 auto; }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }
        .feature-card {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .feature-icon { font-size: 2rem; }
        .feature-title { font-size: 1.125rem; font-weight: 700; }
        .feature-desc { font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.7; margin: 0; }
        /* CTA Banner */
        .cta-banner {
          padding: var(--space-3xl) 0;
          border-top: 1px solid var(--color-border);
        }
        .cta-banner__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-xl);
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .stats-grid    { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: 1fr; }
          .cta-banner__inner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
}

export default Home;
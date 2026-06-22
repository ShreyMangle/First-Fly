const milestones = [
  { year: "2022", desc: "First Fly founded after seeing students struggle with CAP counseling." },
  { year: "2023", desc: "Launched college recommendation engine with 2 years of cutoff data." },
  { year: "2024", desc: "Added ML-based admission probability scores." },
  { year: "2025", desc: "10,000+ students used First Fly during MHT-CET counseling." },
];

const values = [
  { icon: "🔍", title: "Transparency", desc: "Every recommendation is backed by real historical data. No black boxes." },
  { icon: "⚖️", title: "Equity",       desc: "Supporting all categories — OPEN, SC, ST, OBC, EWS, TFWS — equally." },
  { icon: "🎓", title: "Empowerment",  desc: "We help students make informed decisions, not follow fear." },
];

function About() {
  return (
    <div id="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__glow" />
        <div className="container text-center">
          <div className="badge badge-primary animate-fadeInUp">Our Story</div>
          <h1 className="mt-lg animate-fadeInUp animate-delay-1">
            Built for students who deserve <span className="gradient-text">clarity</span>
          </h1>
          <p className="about-hero__sub mt-lg animate-fadeInUp animate-delay-2">
            First Fly was born from a simple frustration — thousands of Maharashtra engineering
            students make life-altering college decisions based on guesswork. We built the tool
            we wished existed.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="about-section">
        <div className="container about-mission">
          <div>
            <h2>Our Mission</h2>
            <p className="mt-md">
              To democratise transparent, data-driven college admission planning for every
              MHT-CET student — regardless of background or access to paid counselors.
            </p>
            <p className="mt-md">
              Every year, CAP cutoffs are published, yet interpreting them accurately requires
              expertise most students don't have. First Fly translates raw cutoff data into
              meaningful, personalised insights.
            </p>
          </div>
          <div className="about-mission__stats">
            {[
              { v: "500+",  l: "Colleges" },
              { v: "3yrs",  l: "Of data" },
              { v: "95%",   l: "Accuracy" },
              { v: "10k+",  l: "Students" },
            ].map(({ v, l }) => (
              <div key={l} className="glass-card about-stat">
                <div className="about-stat__value gradient-text">{v}</div>
                <div className="about-stat__label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section">
        <div className="container">
          <h2 className="text-center">What we believe in</h2>
          <div className="about-values mt-xl">
            {values.map((v) => (
              <div key={v.title} className="glass-card about-value-card">
                <div className="about-value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-section">
        <div className="container">
          <h2 className="text-center">Our journey</h2>
          <div className="about-timeline mt-xl">
            {milestones.map((m, i) => (
              <div key={m.year} className="timeline-item">
                <div className="timeline-dot" />
                <div className="glass-card timeline-card">
                  <div className="timeline-year">{m.year}</div>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .about-hero {
          position: relative;
          padding: 8rem 0 5rem;
          overflow: hidden;
        }
        .about-hero__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .about-hero__sub {
          max-width: 600px;
          margin: 0 auto;
          font-size: 1.125rem;
          line-height: 1.75;
        }
        .about-section { padding: var(--space-4xl) 0; border-top: 1px solid var(--color-border); }
        .about-mission {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3xl);
          align-items: start;
        }
        .about-mission__stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
        }
        .about-stat {
          padding: var(--space-xl);
          text-align: center;
        }
        .about-stat__value { font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; }
        .about-stat__label { font-size: 0.8125rem; color: var(--text-tertiary); margin-top: 0.25rem; }
        .about-values {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
        }
        .about-value-card {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .about-value-icon { font-size: 2rem; }
        .about-timeline {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          max-width: 640px;
          margin: 0 auto;
          position: relative;
        }
        .about-timeline::before {
          content: '';
          position: absolute;
          left: 12px;
          top: 12px;
          bottom: 12px;
          width: 2px;
          background: var(--color-border);
        }
        .timeline-item {
          display: flex;
          gap: var(--space-lg);
          align-items: flex-start;
        }
        .timeline-dot {
          width: 26px;
          height: 26px;
          min-width: 26px;
          border-radius: 50%;
          background: var(--color-primary);
          border: 3px solid var(--color-bg);
          box-shadow: 0 0 0 2px var(--color-primary);
          z-index: 1;
        }
        .timeline-card { padding: var(--space-lg); flex: 1; }
        .timeline-year {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--color-primary-hi);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: var(--space-sm);
        }
        @media (max-width: 768px) {
          .about-mission { grid-template-columns: 1fr; }
          .about-values  { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default About;
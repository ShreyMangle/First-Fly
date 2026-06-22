import { Link } from "react-router-dom";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "forever",
    badge: null,
    description: "Everything you need to find the right college.",
    cta: "Get Started Free",
    ctaLink: "/app",
    ctaClass: "btn-outline",
    features: [
      "College recommendations",
      "ML probability scores",
      "Top-N filtering",
      "Category-aware results (all 6)",
      "Unlimited searches",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹199",
    period: "per month",
    badge: "Coming Soon",
    description: "Advanced tools for serious aspirants.",
    cta: "Join Waitlist",
    ctaLink: "/contact",
    ctaClass: "btn-primary",
    features: [
      "Everything in Free",
      "Multi-year trend analysis",
      "Advanced admission simulation",
      "Personalized strategy report",
      "Priority counseling support",
      "College comparison tool",
    ],
  },
];

function Pricing() {
  return (
    <div id="pricing-page">
      {/* Hero */}
      <section className="pricing-hero">
        <div className="pricing-hero__glow" />
        <div className="container text-center">
          <div className="badge badge-primary animate-fadeInUp">Pricing</div>
          <h1 className="mt-lg animate-fadeInUp animate-delay-1">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h1>
          <p className="pricing-hero__sub mt-lg animate-fadeInUp animate-delay-2">
            Start free. Upgrade when you need more power.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="pricing-plans">
        <div className="container pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              id={`pricing-card-${plan.id}`}
              className={`glass-card pricing-card${plan.id === "pro" ? " pricing-card--featured" : ""}`}
            >
              {plan.badge && (
                <div className="pricing-badge">{plan.badge}</div>
              )}

              <div className="pricing-card__header">
                <h3 className="pricing-plan-name">{plan.name}</h3>
                <div className="pricing-price">
                  <span className="pricing-amount">{plan.price}</span>
                  <span className="pricing-period">/{plan.period}</span>
                </div>
                <p className="pricing-desc">{plan.description}</p>
              </div>

              <ul className="pricing-features">
                {plan.features.map((f) => (
                  <li key={f} className="pricing-feature">
                    <span className="pricing-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.ctaLink}
                id={`pricing-cta-${plan.id}`}
                className={`btn ${plan.ctaClass} btn-full mt-xl`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="pricing-note">
        <div className="container text-center">
          <p>
            Have questions?{" "}
            <Link to="/contact">Reach out to us</Link> — we're happy to help.
          </p>
        </div>
      </section>

      <style>{`
        .pricing-hero {
          position: relative;
          padding: 8rem 0 4rem;
          overflow: hidden;
        }
        .pricing-hero__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .pricing-hero__sub {
          max-width: 480px;
          margin: 0 auto;
          font-size: 1.125rem;
        }
        .pricing-plans { padding: var(--space-2xl) 0 var(--space-4xl); }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-xl);
          max-width: 820px;
          margin: 0 auto;
        }
        .pricing-card {
          padding: var(--space-2xl);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .pricing-card--featured {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 1px var(--color-primary), var(--shadow-glow);
        }
        .pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--color-primary), #4f46e5);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.875rem;
          border-radius: var(--radius-full);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .pricing-card__header { margin-bottom: var(--space-xl); }
        .pricing-plan-name {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: var(--space-sm);
        }
        .pricing-price { display: flex; align-items: baseline; gap: 0.25rem; margin-bottom: var(--space-sm); }
        .pricing-amount { font-size: 3rem; font-weight: 900; letter-spacing: -0.04em; color: var(--text-primary); }
        .pricing-period { font-size: 0.9rem; color: var(--text-tertiary); }
        .pricing-desc { font-size: 0.9rem; color: var(--text-secondary); }
        .pricing-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          flex: 1;
        }
        .pricing-feature {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }
        .pricing-check {
          width: 20px;
          height: 20px;
          min-width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-primary-lo);
          color: var(--color-primary-hi);
          border-radius: 50%;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .pricing-note {
          padding: var(--space-2xl) 0;
          border-top: 1px solid var(--color-border);
          color: var(--text-secondary);
          font-size: 0.9375rem;
        }
        @media (max-width: 640px) {
          .pricing-grid { grid-template-columns: 1fr; max-width: 420px; }
        }
      `}</style>
    </div>
  );
}

export default Pricing;
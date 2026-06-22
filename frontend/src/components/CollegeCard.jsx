import { useEffect, useState } from "react";

const STATUS_CONFIG = {
  SAFE:     { label: "Safe",     colorVar: "--color-safe",     bgVar: "--color-safe-lo" },
  MODERATE: { label: "Moderate", colorVar: "--color-moderate", bgVar: "--color-moderate-lo" },
  DREAM:    { label: "Dream",    colorVar: "--color-dream",    bgVar: "--color-dream-lo" },
};

function CollegeCard({ college, rank }) {
  // ✅ Fixed field names to match backend response schema
  const {
    college_name,
    branch_name,
    category,
    year,
    round,
    cutoff,
    difference,
    probability,
    status,
  } = college;

  const percentage = probability ? Math.round(probability * 100) : 0;
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG.DREAM;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedWidth(percentage), 150);
    return () => clearTimeout(timer);
  }, [percentage]);

  const differenceLabel =
    difference > 0
      ? `+${difference.toFixed(2)} above cutoff`
      : difference === 0
      ? "At cutoff"
      : `${Math.abs(difference).toFixed(2)} below cutoff`;

  const differenceClass =
    difference > 0 ? "diff-positive" : difference < 0 ? "diff-negative" : "diff-neutral";

  return (
    <div id={`college-card-${rank}`} className="college-card glass-card">
      {/* Header */}
      <div className="college-card__header">
        <div className="college-card__rank">#{rank}</div>
        <div className="college-card__info">
          <h3 className="college-card__name">{college_name}</h3>
          <p className="college-card__branch">{branch_name}</p>
        </div>
        <div
          className="college-card__status-badge"
          style={{
            background: `var(${statusCfg.bgVar})`,
            color: `var(${statusCfg.colorVar})`,
          }}
        >
          {statusCfg.label}
        </div>
      </div>

      {/* Meta chips */}
      <div className="college-card__chips">
        <span className="chip">📅 {year} — Round {round}</span>
        <span className="chip">🏷 {category}</span>
        <span className={`chip chip--diff ${differenceClass}`}>
          {differenceLabel}
        </span>
      </div>

      {/* Probability bar */}
      <div className="college-card__prob">
        <div className="college-card__prob-header">
          <span>Admission Chance</span>
          <span className="college-card__prob-value">{percentage}%</span>
        </div>
        <div className="prob-bar">
          <div
            className="prob-bar__fill"
            style={{
              width: `${animatedWidth}%`,
              background: `var(${statusCfg.colorVar})`,
              boxShadow: `0 0 8px var(${statusCfg.bgVar})`,
            }}
          />
        </div>
        <div className="college-card__prob-footer">
          <span>Cutoff: <strong>{cutoff?.toFixed(2)}</strong></span>
          <span>
            {percentage >= 80 ? "🟢 High Confidence" : percentage >= 50 ? "🟡 Moderate Chance" : "🔴 Reach School"}
          </span>
        </div>
      </div>

      <style>{`
        .college-card {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          transition: transform var(--transition-base), box-shadow var(--transition-base);
        }
        .college-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .college-card__header {
          display: flex;
          align-items: flex-start;
          gap: var(--space-md);
        }
        .college-card__rank {
          font-size: 0.8125rem;
          font-weight: 800;
          color: var(--text-tertiary);
          min-width: 28px;
          padding-top: 3px;
        }
        .college-card__info { flex: 1; min-width: 0; }
        .college-card__name {
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .college-card__branch {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .college-card__status-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.625rem;
          border-radius: var(--radius-full);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .college-card__chips {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
        }
        .chip {
          font-size: 0.8125rem;
          padding: 0.25rem 0.625rem;
          background: var(--color-surface-md);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
        }
        .chip--diff.diff-positive { color: var(--color-safe);     background: var(--color-safe-lo); }
        .chip--diff.diff-negative { color: var(--color-dream);    background: var(--color-dream-lo); }
        .chip--diff.diff-neutral  { color: var(--color-moderate); background: var(--color-moderate-lo); }
        .college-card__prob {}
        .college-card__prob-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: var(--space-sm);
        }
        .college-card__prob-value { font-weight: 700; color: var(--text-primary); }
        .prob-bar {
          width: 100%;
          height: 8px;
          background: var(--color-surface-hi);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .prob-bar__fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.9s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .college-card__prob-footer {
          display: flex;
          justify-content: space-between;
          font-size: 0.8125rem;
          color: var(--text-tertiary);
          margin-top: var(--space-sm);
        }
      `}</style>
    </div>
  );
}

export default CollegeCard;
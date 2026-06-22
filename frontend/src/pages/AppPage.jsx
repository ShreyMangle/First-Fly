import { useState } from "react";
import RecommendationForm from "../components/RecommendationForm";
import CollegeCard from "../components/CollegeCard";

function AppPage() {
  const [results,  setResults]  = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [searched, setSearched] = useState(false);

  const handleResults = (data) => {
    setResults(data);
    setSearched(true);
  };

  const sorted = [...results].sort((a, b) => (b.probability || 0) - (a.probability || 0));

  return (
    <div id="app-page" className="app-page">
      {/* Page header */}
      <div className="app-page__header">
        <div className="container">
          <h1 className="app-page__title">
            College <span className="gradient-text">Finder</span>
          </h1>
          <p className="app-page__subtitle">
            Enter your MHT-CET details to get personalised admission predictions.
          </p>
        </div>
      </div>

      {/* Layout */}
      <div className="container app-layout">
        {/* Sidebar — Form */}
        <aside className="app-sidebar">
          <div className="glass-card app-form-card">
            <RecommendationForm onResults={handleResults} onLoading={setLoading} />
          </div>
        </aside>

        {/* Main — Results */}
        <main className="app-results">
          {loading && (
            <div className="results-loading">
              <div className="results-spinner" />
              <p>Analyzing cutoffs and probabilities…</p>
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="results-empty">
              <div className="results-empty__icon">🔍</div>
              <h3>No colleges found</h3>
              <p>
                Try lowering the minimum status filter or selecting a different branch / year.
              </p>
            </div>
          )}

          {!loading && !searched && (
            <div className="results-placeholder">
              <div className="results-placeholder__icon">🎓</div>
              <h3>Your results will appear here</h3>
              <p>Fill in your details on the left and hit "Get Recommendations".</p>
            </div>
          )}

          {!loading && sorted.length > 0 && (
            <>
              <div className="results-header">
                <h2 className="results-title">
                  {sorted.length} College{sorted.length !== 1 ? "s" : ""} found
                </h2>
                <span className="results-subtitle text-muted text-sm">
                  Sorted by admission probability
                </span>
              </div>

              <div className="results-list">
                {sorted.map((college, index) => (
                  <CollegeCard key={index} college={college} rank={index + 1} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      <style>{`
        .app-page { min-height: 100vh; }
        .app-page__header {
          padding: var(--space-3xl) 0 var(--space-xl);
          border-bottom: 1px solid var(--color-border);
          background: linear-gradient(180deg, rgba(99,102,241,0.05) 0%, transparent 100%);
        }
        .app-page__title { font-size: clamp(1.75rem, 4vw, 2.5rem); }
        .app-page__subtitle { color: var(--text-secondary); margin-top: var(--space-sm); }
        .app-layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: var(--space-2xl);
          padding-top: var(--space-2xl);
          padding-bottom: var(--space-3xl);
          align-items: start;
        }
        .app-sidebar { position: sticky; top: calc(var(--nav-height) + var(--space-lg)); }
        .app-form-card { padding: var(--space-xl); }
        .app-results { min-height: 400px; }
        .results-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: var(--space-lg);
          padding-bottom: var(--space-md);
          border-bottom: 1px solid var(--color-border);
        }
        .results-title { font-size: 1.125rem; font-weight: 700; }
        .results-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .results-loading,
        .results-empty,
        .results-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: var(--space-4xl) var(--space-xl);
          gap: var(--space-md);
          min-height: 380px;
        }
        .results-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--color-border);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .results-empty__icon,
        .results-placeholder__icon {
          font-size: 3rem;
          margin-bottom: var(--space-sm);
        }
        .results-empty h3,
        .results-placeholder h3 { font-size: 1.125rem; }
        .results-empty p,
        .results-placeholder p { color: var(--text-secondary); max-width: 320px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .app-layout { grid-template-columns: 1fr; }
          .app-sidebar { position: static; }
        }
      `}</style>
    </div>
  );
}

export default AppPage;
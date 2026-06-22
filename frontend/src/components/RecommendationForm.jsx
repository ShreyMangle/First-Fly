import { fetchBranches, fetchRecommendations } from "../api";
import { useState, useEffect } from "react";

const CATEGORIES  = ["OPEN", "SC", "ST", "OBC", "EWS", "TFWS"];
const STATUSES    = ["SAFE", "MODERATE", "DREAM"];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 2021 }, (_, i) => CURRENT_YEAR - i);

function RecommendationForm({ onResults, onLoading }) {
  const [form, setForm] = useState({
    percentile: "",
    category:   "OPEN",
    branch_code: "",
    year:        YEARS[0] ?? 2024,
    min_status:  "",
    top_n:       10,
  });

  const [branches, setBranches] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [branchLoading, setBranchLoading] = useState(true);

  useEffect(() => {
    setBranchLoading(true);
    fetchBranches()
      .then((data) => setBranches(data))
      .catch(() => setError("Failed to load branches. Please refresh."))
      .finally(() => setBranchLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    onLoading?.(true);

    try {
      const data = await fetchRecommendations({
        ...form,
        // Remove empty optional fields
        min_status: form.min_status || undefined,
      });
      onResults(data);
    } catch (err) {
      setError(err.message || "Failed to fetch recommendations. Please try again.");
      onResults([]);
    } finally {
      setLoading(false);
      onLoading?.(false);
    }
  };

  return (
    <form id="recommendation-form" onSubmit={handleSubmit}>
      <h2 className="form-section-title">Your Profile</h2>

      {/* Percentile */}
      <div className="form-group">
        <label className="form-label" htmlFor="rf-percentile">
          MHT-CET Percentile
        </label>
        <input
          id="rf-percentile"
          type="number"
          name="percentile"
          step="0.01"
          min="0"
          max="100"
          placeholder="e.g. 87.50"
          className="form-input"
          value={form.percentile}
          onChange={handleChange}
          required
        />
      </div>

      {/* Category */}
      <div className="form-group">
        <label className="form-label" htmlFor="rf-category">Category</label>
        <select
          id="rf-category"
          name="category"
          className="form-select"
          value={form.category}
          onChange={handleChange}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Branch */}
      <div className="form-group">
        <label className="form-label" htmlFor="rf-branch">Branch</label>
        <select
          id="rf-branch"
          name="branch_code"
          className="form-select"
          value={form.branch_code}
          onChange={handleChange}
          disabled={branchLoading}
          required
        >
          <option value="">
            {branchLoading ? "Loading branches…" : "Select a branch"}
          </option>
          {branches.map((b) => (
            <option key={b.branch_code} value={b.branch_code}>
              {b.branch_name}
            </option>
          ))}
        </select>
      </div>

      {/* Year */}
      <div className="form-group">
        <label className="form-label" htmlFor="rf-year">CAP Year</label>
        <select
          id="rf-year"
          name="year"
          className="form-select"
          value={form.year}
          onChange={handleChange}
        >
          {YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className="form-divider">Filters</div>

      {/* Min Status */}
      <div className="form-group">
        <label className="form-label" htmlFor="rf-status">Minimum Status</label>
        <select
          id="rf-status"
          name="min_status"
          className="form-select"
          value={form.min_status}
          onChange={handleChange}
        >
          <option value="">Show all</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Top N */}
      <div className="form-group">
        <label className="form-label" htmlFor="rf-topn">
          Max Results: <strong>{form.top_n}</strong>
        </label>
        <input
          id="rf-topn"
          type="range"
          name="top_n"
          min="5"
          max="50"
          step="5"
          className="form-range"
          value={form.top_n}
          onChange={handleChange}
        />
        <div className="form-range-labels">
          <span>5</span><span>50</span>
        </div>
      </div>

      {error && <p id="rf-error" className="form-error">{error}</p>}

      <button
        id="rf-submit-btn"
        type="submit"
        className="btn btn-primary btn-full"
        disabled={loading || branchLoading}
        style={{ marginTop: "var(--space-md)" }}
      >
        {loading ? (
          <><span className="btn-spinner" /> Finding colleges…</>
        ) : (
          "Get Recommendations →"
        )}
      </button>

      <style>{`
        .form-section-title {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: var(--space-lg);
          padding-bottom: var(--space-sm);
          border-bottom: 1px solid var(--color-border);
        }
        .form-divider {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-tertiary);
          margin: var(--space-lg) 0 var(--space-md);
          padding-top: var(--space-lg);
          border-top: 1px solid var(--color-border);
        }
        .form-range {
          width: 100%;
          accent-color: var(--color-primary);
          cursor: pointer;
        }
        .form-range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-top: 2px;
        }
        .btn-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}

export default RecommendationForm;

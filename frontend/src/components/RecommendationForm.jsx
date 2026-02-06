import { useState } from "react";
import { fetchRecommendations } from "../api";

function RecommendationForm({ onResults }) {
  const [form, setForm] = useState({
    percentile: "",
    category: "OPEN",
    branch: "Computer Science and Engineering",
    year: 2024,
    min_status: "SAFE",
    top_n: 10,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchRecommendations(form);
      onResults(data);
    } catch (err) {
      setError("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
      <div>
        <label>Percentile:</label><br />
        <input
          type="number"
          step="0.01"
          name="percentile"
          value={form.percentile}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Category:</label><br />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="OPEN">OPEN</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="OBC">OBC</option>
          <option value="EWS">EWS</option>
          <option value="TFWS">TFWS</option>
        </select>
      </div>

      <div>
        <label>Branch:</label><br />
        <select name="branch" value={form.branch} onChange={handleChange}>
          <option>Computer Science and Engineering</option>
          <option>Information Technology</option>
          <option>Computer Engineering</option>
          <option>Electronics and Telecommunication Engg</option>
          <option>Electrical Engineering</option>
          <option>Mechanical Engineering</option>
          <option>Civil Engineering</option>
        </select>
      </div>

      <div>
        <label>Minimum Status:</label><br />
        <select
          name="min_status"
          value={form.min_status}
          onChange={handleChange}
        >
          <option value="SAFE">SAFE</option>
          <option value="MODERATE">MODERATE</option>
          <option value="DREAM">DREAM</option>
        </select>
      </div>

      <div>
        <label>Top N Colleges:</label><br />
        <input
          type="number"
          name="top_n"
          value={form.top_n}
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={loading} style={{ marginTop: "1rem" }}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default RecommendationForm;

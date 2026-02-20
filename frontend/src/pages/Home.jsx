import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Find Your Perfect Engineering College</h1>
      <p style={{ marginTop: "1rem", color: "#555" }}>
        Data-driven college recommendations based on real CET cutoffs
        and admission probability modeling.
      </p>

      <Link to="/app" style={ctaButtonStyle}>
        Check My Chances
      </Link>
    </div>
  );
}

const ctaButtonStyle = {
  display: "inline-block",
  marginTop: "2rem",
  padding: "0.75rem 1.5rem",
  backgroundColor: "#007bff",
  color: "#fff",
  borderRadius: "6px",
  textDecoration: "none",
  fontSize: "1rem",
};

export default Home;
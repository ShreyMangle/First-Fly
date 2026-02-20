function Pricing() {
  return (
    <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Pricing</h1>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", gap: "2rem" }}>
        <div style={cardStyle}>
          <h3>Free Plan</h3>
          <p>₹0 / forever</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>✔ College Recommendations</li>
            <li>✔ Probability Estimates</li>
            <li>✔ Top N Filtering</li>
          </ul>
        </div>

        <div style={cardStyle}>
          <h3>Pro (Coming Soon)</h3>
          <p>₹199 / month</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>✔ Advanced Simulation</li>
            <li>✔ Personalized Strategy Report</li>
            <li>✔ Counseling Support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  padding: "1.5rem",
  borderRadius: "8px",
  width: "300px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.05)"
};

export default Pricing;
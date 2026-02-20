import { useEffect, useState } from "react";

function CollegeCard({ college }) {
  const statusColors = {
    SAFE: "#d4edda",
    MODERATE: "#fff3cd",
    DREAM: "#f8d7da",
  };

  const percentage = college.probability
    ? Math.round(college.probability * 100)
    : 0;

  const getBarColor = (value) => {
    if (value >= 75) return "#28a745";
    if (value >= 50) return "#ffc107";
    return "#dc3545";
  };

  const getChanceLabel = (value) => {
    if (value >= 80) return "High Confidence";
    if (value >= 50) return "Moderate Chance";
    return "Risky Option";
  };

  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedWidth(percentage);
    }, 100);
  }, [percentage]);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "1.5rem",
        marginBottom: "1.2rem",
        backgroundColor: statusColors[college.status],
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: "0.5rem" }}>
        {college.college}
      </h3>

      <p><strong>Branch:</strong> {college.branch}</p>
      <p><strong>Cutoff:</strong> {college.cutoff}</p>
      <p><strong>Difference:</strong> {college.difference}</p>
      <p><strong>Status:</strong> {college.status}</p>

      {/* Probability Section */}
      <div style={{ marginTop: "1rem" }}>
        <p style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>
          🎯 Admission Chance: {percentage}%
        </p>

        <div
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "#e9ecef",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${animatedWidth}%`,
              backgroundColor: getBarColor(percentage),
              transition: "width 0.8s ease-in-out",
            }}
          />
        </div>

        <p style={{ fontSize: "0.85rem", marginTop: "0.4rem", color: "#555" }}>
          {getChanceLabel(percentage)}
        </p>
      </div>
    </div>
  );
}

export default CollegeCard;
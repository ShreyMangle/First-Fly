function CollegeCard({ college }) {
  const statusColors = {
    SAFE: "#d4edda",
    MODERATE: "#fff3cd",
    DREAM: "#f8d7da",
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: statusColors[college.status],
      }}
    >
      <h3>{college.college}</h3>
      <p><strong>Branch:</strong> {college.branch}</p>
      <p><strong>Cutoff:</strong> {college.cutoff}</p>
      <p><strong>Difference:</strong> {college.difference}</p>
      <p><strong>Status:</strong> {college.status}</p>
    </div>
  );
}

export default CollegeCard;

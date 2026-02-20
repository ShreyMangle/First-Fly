import { useState } from "react";
import RecommendationForm from "../components/RecommendationForm";
import CollegeCard from "../components/CollegeCard";

function AppPage() {
  const [results, setResults] = useState([]);

  return (
    <div>
      <h2>College Recommendation Tool</h2>

      <RecommendationForm onResults={setResults} />

      <div style={{ marginTop: "2rem" }}>
        {results.length === 0 && (
          <p style={{ color: "#666" }}>
            Enter your details to see recommended colleges.
          </p>
        )}

        {[...results]
          .sort((a, b) => (b.probability || 0) - (a.probability || 0))
          .map((college, index) => (
            <CollegeCard key={index} college={college} />
        ))}
      </div>
    </div>
  );
}

export default AppPage;
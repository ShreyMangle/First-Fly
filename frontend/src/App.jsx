import { useState } from "react";
import RecommendationForm from "./components/RecommendationForm";
import CollegeCard from "./components/CollegeCard";

function App() {
  const [results, setResults] = useState([]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>First Fly</h1>
      <p>CET College Recommendation Platform</p>

      <RecommendationForm onResults={setResults} />

      <div style={{ marginTop: "2rem" }}>
        {results.length === 0 && <p>No results yet.</p>}

        {results.map((college, index) => (
          <CollegeCard key={index} college={college} />
        ))}
      </div>
    </div>
  );
}

export default App;

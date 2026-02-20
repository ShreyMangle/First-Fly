function Privacy() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Privacy Policy</h1>

      <p style={{ marginTop: "1rem" }}>
        First Fly respects your privacy. We collect only the information
        necessary to provide college recommendations.
      </p>

      <h3 style={{ marginTop: "2rem" }}>What We Collect</h3>
      <ul>
        <li>Percentile input</li>
        <li>Category</li>
        <li>Branch preference</li>
      </ul>

      <h3 style={{ marginTop: "2rem" }}>How We Use Data</h3>
      <p>
        Data is used solely to generate recommendations and improve platform
        performance. We do not sell personal data.
      </p>
    </div>
  );
}

export default Privacy;
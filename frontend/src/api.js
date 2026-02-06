export async function fetchRecommendations(params) {
  const query = new URLSearchParams(params).toString();

  const response = await fetch(
    `http://127.0.0.1:8000/recommendations/?${query}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return response.json();
}

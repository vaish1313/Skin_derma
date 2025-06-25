async function searchSymptoms() {
  const query = document.getElementById('searchInput').value.trim();
  const resultsDiv = document.getElementById('results');

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter some symptoms.</p>";
    return;
  }

  try {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.length === 0) {
      resultsDiv.innerHTML = "<p>No matching diseases found.</p>";
    } else {
      resultsDiv.innerHTML = data.map(disease => `
        <div class="result-item">
          <h3>${disease.name}</h3>
          <p><strong>Symptoms:</strong> ${disease.symptoms}</p>
          <p><strong>Remedies:</strong> ${disease.remedies}</p>
          ${disease.image_url ? `<img src="${disease.image_url}" alt="${disease.name}" style="width:150px;">` : ''}
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Search error:', error);
    resultsDiv.innerHTML = "<p>Error fetching data. Please try again later.</p>";
  }
}

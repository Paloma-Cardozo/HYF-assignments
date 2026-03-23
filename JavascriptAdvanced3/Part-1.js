const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Fetch all teas from the API and log how many there are.

fetch(`${API_BASE}/teas`)
  .then((response) => {
    return response.json();
  })
  .then((teas) => {
    console.log("Found " + teas.length + " teas");
  });

// Fetch a single tea by ID and log its name and origin.

fetch(`${API_BASE}/teas/3`)
  .then((response) => {
    return response.json();
  })
  .then((tea) => {
    console.log(tea.name + " from " + tea.origin);
  });

// Try fetching a tea that doesn't exist (ID 999). Handle the error with .catch().

fetch(`${API_BASE}/teas/999`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((tea) => {
    console.log(tea.name);
  })
  .catch((error) => {
    console.log("Something went wrong! " + error);
  });

// Fetch the inventory endpoint and log which teas are low on stock (less than 50).

fetch(`${API_BASE}/inventory`)
  .then((response) => {
    return response.json();
  })
  .then((report) => {
    console.log("Low stock: ");
    report.forEach((tea) => {
      if (tea.stockCount < 50) {
        console.log(`- ${tea.teaName}: ${tea.stockCount}`);
      }
    });
  });

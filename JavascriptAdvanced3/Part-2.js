const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Fetch a tea, then fetch its inventory status. Log both pieces of information.

let teaId;

fetch(`${API_BASE}/teas/1`)
  .then((response) => response.json())
  .then((tea) => {
    console.log("Tea:", tea.name);
    teaId = tea.id;
    return fetch(`${API_BASE}/inventory`);
  })
  .then((response) => response.json())
  .then((inventory) => {
    const inventoryItem = inventory.find((item) => item.teaId === teaId);
    console.log(`${inventoryItem.stockCount}`);
  })
  .catch((error) => console.error("Error:", error.message));

// Fetch all teas, filter to only Japanese teas, then for each one log its name and price. All using .then() chains.

fetch(`${API_BASE}/teas`)
  .then((response) => response.json())
  .then((teas) => {
    teas
      .filter((tea) => {
        return tea.origin === "Japan";
      })
      .forEach((tea) => {
        console.log(`- ${tea.name}: ${tea.pricePerGram}`);
      });
  })

  .catch((error) => console.error(error));

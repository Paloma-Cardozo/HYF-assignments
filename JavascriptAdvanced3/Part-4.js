const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Rewrite Exercise 1 using async/await.

async function countTeas() {
  const response = await fetch(`${API_BASE}/teas`);
  const teas = await response.json();
  console.log("Found " + teas.length + " teas");
}

countTeas();

// Rewrite Exercise 5 using async/await - fetch a tea, then fetch its inventory.

async function getTeaWithStock(id) {
  const responseTea = await fetch(`${API_BASE}/teas/${id}`);
  const tea = await responseTea.json();

  const responseInventory = await fetch(`${API_BASE}/inventory`);
  const inventory = await responseInventory.json();

  const inventoryItem = inventory.find((item) => item.teaId === tea.id);

  console.log("Tea:", tea.name);
  console.log(`${inventoryItem.stockCount}`);
}

getTeaWithStock(1);

// Add error handling to Exercise 11 using try/catch:

async function getTeaWithStock1(id) {
  try {
    const responseTea = await fetch(`${API_BASE}/teas/${id}`);
    const tea = await responseTea.json();

    const responseInventory = await fetch(`${API_BASE}/inventory`);
    const inventory = await responseInventory.json();

    const inventoryItem = inventory.find((item) => item.teaId === tea.id);

    console.log("Tea:", tea.name);
    console.log(`${inventoryItem.stockCount}`);
  } catch (error) {
    console.error("Failed:", error.message);
    return null;
  }
}

getTeaWithStock1(1);

getTeaWithStock1(999);

// Create an async function

async function getWellStockedOrganicTeas() {
  const responseTeas = await fetch(`${API_BASE}/teas`);
  const teas = await responseTeas.json();

  const responseInventory = await fetch(`${API_BASE}/inventory`);
  const inventory = await responseInventory.json();

  return teas
    .filter((tea) => tea.organic)
    .filter((tea) => {
      const teaFiltered = inventory.find((item) => item.teaId === tea.id);
      return teaFiltered && teaFiltered.stockCount > 100;
    });
}

getWellStockedOrganicTeas().then((teas) => {
  console.log("Well-stocked organic teas:", teas);
});

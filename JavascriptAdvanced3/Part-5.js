const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Fetch 3 specific teas (IDs 1, 5, and 10) in parallel using Promise.all.

async function getThreeTeas() {
  const ids = [1, 5, 10];
  const start = Date.now();

  const responses = await Promise.all(
    ids.map((id) => fetch(`${API_BASE}/teas/${id}`)),
  );
  const teas = await Promise.all(responses.map((response) => response.json()));

  teas.forEach((tea) => console.log(tea.name));
  console.log(`Took ${Date.now() - start} ms to fetch 3 teas`);
}

getThreeTeas();

// Create a function that fetches ALL teas and ALL inventory data in parallel, then combines them into a single report:

async function getFullInventoryReport() {
  const [teas, inventory] = await Promise.all([
    fetch(`${API_BASE}/teas`),
    fetch(`${API_BASE}/inventory`),
  ]);

  const teasResponse = await teas.json();
  const inventoryResponse = await inventory.json();

  return teasResponse.map((tea) => {
    const item = inventoryResponse.find((item) => item.teaId === tea.id);
    return {
      name: tea.name,
      origin: tea.origin,
      stock: item.stockCount,
    };
  });
}

getFullInventoryReport().then((report) => {
  console.log("Inventory Report:");
  report.forEach((item) => {
    console.log(`- ${item.name} (${item.origin}): ${item.stock} in stock`);
  });
});

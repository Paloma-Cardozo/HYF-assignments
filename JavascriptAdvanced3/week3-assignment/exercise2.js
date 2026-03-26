const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Create a function that gets full details for a tea, including its current stock:

async function getTeaDetails(id) {
  const [teas, inventory] = await Promise.all([
    fetch(`${API_BASE}/teas/${id}`),
    fetch(`${API_BASE}/inventory`),
  ]);

  const teasResponse = await teas.json();
  const inventoryResponse = await inventory.json();

  const item = inventoryResponse.find((item) => item.teaId === teasResponse.id);
  return { ...teasResponse, stock: item.stockCount };
}

getTeaDetails(1).then((tea) => {
  console.log(`${tea.name} (${tea.origin})`);
  console.log(`Price: ${tea.pricePerGram} DKK/gram`);
  console.log(`Stock: ${tea.stock} grams`);
  console.log(`Value: ${(tea.pricePerGram * tea.stock).toFixed(2)} DKK`);
});

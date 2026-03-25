const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Create a function that checks if all items in an order are in stock:

export async function checkOrderStock(items) {
  try {
    const response = await fetch(`${API_BASE}/inventory`);
    const inventory = await response.json();

    const shortages = [];

    items.forEach((item) => {
      const tea = inventory.find((tea) => tea.teaId === item.teaId);

      if (!tea) throw new Error(`Tea with ID ${item.teaId} not found`);
      if (tea.stockCount < item.grams) {
        shortages.push({
          name: tea.teaName,
          needed: item.grams,
          available: tea.stockCount,
        });
      }
    });

    return { inStock: shortages.length === 0, shortages };
  } catch (error) {
    console.error("Failed:", error.message);
    return null;
  }
}

const largeOrder = [
  { teaId: 1, grams: 100 },
  { teaId: 2, grams: 500 },
  { teaId: 3, grams: 9999 },
];

checkOrderStock(largeOrder).then((result) => {
  if (result.inStock) {
    console.log("All items in stock!");
  } else {
    console.log("Shortages:");
    result.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
  }
});

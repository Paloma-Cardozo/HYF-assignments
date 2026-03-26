const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Create a function that calculates the total for an order

export async function calculateOrderTotal(items) {
  try {
    const response = await fetch(`${API_BASE}/teas`);
    const teas = await response.json();

    let total = 0;

    items.forEach((item) => {
      const tea = teas.find((tea) => tea.id === item.teaId);

      if (!tea) throw new Error(`Tea with ID ${item.teaId} not found`);

      total += tea.pricePerGram * item.grams;
    });

    return total;
  } catch (error) {
    console.error("Failed:", error.message);
    return null;
  }
}

const order = [
  { teaId: 1, grams: 100 },
  { teaId: 3, grams: 50 },
  { teaId: 8, grams: 200 },
];

calculateOrderTotal(order)
  .then((total) => console.log(`Order total: ${total.toFixed(2)} DKK`))
  .catch((err) => console.error("Error:", err.message));

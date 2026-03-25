const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

import { calculateOrderTotal } from "./exercise3.js";
import { checkOrderStock } from "./exercise4.js";

// Combine everything into a complete order processing flow:

async function processOrder(items) {
  console.log("Processing order...\n");

  console.log("1. Validating items...");

  console.log("2. Checking stock...");
  const stockResult = await checkOrderStock(items);
  if (!stockResult.inStock) {
    throw new Error("Items out of stock");
  }

  console.log("3. Calculating total...");
  const total = await calculateOrderTotal(items);

  console.log("4. Creating summary...\n");

  return {
    items: items.length,
    total,
    status: "ready",
  };
}

const myOrder = [
  { teaId: 1, grams: 50 },
  { teaId: 5, grams: 100 },
];

processOrder(myOrder)
  .then((result) => {
    console.log("Order ready!");
    console.log(`Items: ${result.items}`);
    console.log(`Total: ${result.total.toFixed(2)} DKK`);
  })
  .catch((err) => {
    console.error("Order failed:", err.message);
  });

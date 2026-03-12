import { teas as data } from "../teas.js";

// Create a function that returns teas with low stock (less than 50 items):

function lowStockAlert(teas) {
  return teas
    .filter((tea) => tea.stockCount < 50)
    .map((tea) => ({ name: tea.name, stockCount: tea.stockCount }))
    .sort((a, b) => a.stockCount - b.stockCount);
}

console.log(lowStockAlert(data));

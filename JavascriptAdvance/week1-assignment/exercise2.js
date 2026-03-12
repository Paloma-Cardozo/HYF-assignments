import { teas as data } from "../teas.js";

// Build a function that generates an inventory report

function inventoryReport(teas) {
  let totalInventoryValue = 0;
  let averagePrice = 0;

  teas.forEach((tea) => {
    totalInventoryValue += tea.pricePerGram * tea.stockCount;
    averagePrice += tea.pricePerGram;
  });

  return {
    totalTeas: teas.length,
    inStock: teas.filter((tea) => tea.inStock).length,
    outOfStock: teas.filter((tea) => !tea.inStock).length,
    totalInventoryValue,
    averagePrice: averagePrice / teas.length,
  };
}

console.log(inventoryReport(data));

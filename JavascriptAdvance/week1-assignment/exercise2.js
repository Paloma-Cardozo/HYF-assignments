import { teas as data } from "../teas.js";

// Build a function that generates an inventory report

function inventoryReport(teas) {
  let inStockCount = 0;
  let totalInventoryValue = 0;
  let averagePrice = 0;

  teas.forEach((tea) => {
    if (tea.inStock) {
      inStockCount++;
    }
    totalInventoryValue += tea.pricePerGram * tea.stockCount;
    averagePrice += tea.pricePerGram;
  });

  return {
    totalTeas: teas.length,
    inStock: inStockCount,
    outOfStock: teas.length - inStockCount,
    totalInventoryValue,
    averagePrice: averagePrice / teas.length,
  };
}

console.log(inventoryReport(data));

import { teas } from "../teas.js";
import fs from "fs";

// Use reduce to calculate the total stock for each caffeine level:

function stockByCaffeine(teas) {
  return teas.reduce((acc, tea) => {
    if (!acc[tea.caffeineLevel]) acc[tea.caffeineLevel] = 0;
    acc[tea.caffeineLevel] += tea.stockCount;
    return acc;
  }, {});
}

console.log(stockByCaffeine(teas));

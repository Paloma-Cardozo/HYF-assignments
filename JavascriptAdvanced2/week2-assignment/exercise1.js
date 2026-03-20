import { teas } from "../teas.js";
import fs from "fs";

// Stock by Caffeine Level

function stockByCaffeine(teas) {
  return teas.reduce((acc, tea) => {
    if (!acc[tea.caffeineLevel]) acc[tea.caffeineLevel] = 0;
    acc[tea.caffeineLevel] += tea.stockCount;
    return acc;
  }, {});
}

console.log(stockByCaffeine(teas));

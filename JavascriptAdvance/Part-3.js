import { teas as data } from "./teas.js";
console.log(data);

// Get all organic teas.

const organicTeas = data.filter(function getOrganicTeas(tea) {
  return tea.organic;
});

console.log(organicTeas);

// Get all teas from Japan.

const teasFromJapan = data.filter(function getJapaneseTeas(tea) {
  return tea.origin === "Japan";
});

console.log(teasFromJapan);

// Get all teas with caffeineLevel equal to "high".

const highCaffeineTeas = data.filter(function getHighCaffeineTeas(tea) {
  return tea.caffeineLevel === "high";
});

console.log(highCaffeineTeas);

// Get all teas that are both in stock AND organic.

const organicTeasInStock = data.filter(function getOrganicTeasInStock(tea) {
  return tea.organic && tea.inStock;
});

console.log(organicTeasInStock);

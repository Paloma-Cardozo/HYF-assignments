import { teas } from "./teas.js";

// Use reduce to calculate the total stockCount across all teas.

const totalStock = teas.reduce((sum, tea) => sum + tea.stockCount, 0);

console.log(totalStock);

// Calculate the total inventory value: the sum of pricePerGram * stockCount for each tea.

const inventoryValue = teas.reduce(
  (sum, tea) => sum + tea.pricePerGram * tea.stockCount,
  0,
);

console.log(inventoryValue);

// Use reduce to count how many teas of each type exist.

const countByType = teas.reduce((counts, tea) => {
  if (!counts[tea.type]) counts[tea.type] = 0;
  counts[tea.type] += 1;
  return counts;
}, {});

console.log(countByType);

// Use reduce to group tea names by their origin country.

const groupedByOrigin = teas.reduce((groups, tea) => {
  if (!groups[tea.origin]) groups[tea.origin] = [];
  groups[tea.origin].push(tea.name);
  return groups;
}, {});

console.log(groupedByOrigin);

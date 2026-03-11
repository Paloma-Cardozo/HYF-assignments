import { teas as data } from "../teas.js";

// Use reduce to count how many teas of each type exist:

const countByType = data.reduce((counts, tea) => {
  if (!counts[tea.type]) counts[tea.type] = 0;
  counts[tea.type] += 1;
  return counts;
}, {});

console.log(countByType);

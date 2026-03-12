import { teas as data } from "../teas.js";

// Create a function that groups teas by their origin country:

function teasByOrigin(teas) {
  const groups = {};

  teas.forEach((tea) => {
    if (!groups[tea.origin]) groups[tea.origin] = [];
    groups[tea.origin].push(tea.name);
  });
  return groups;
}

console.log(teasByOrigin(data));

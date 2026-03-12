import { teas as data } from "../teas.js";

// Create a search function for the tea shop:

function searchTeas(teas, query) {
  return teas
    .filter((tea) => tea.name.toLowerCase().includes(query.toLowerCase()))
    .map((tea) => tea.name)
    .sort();
}

// Returns: ["Earl Grey"]

console.log(searchTeas(data, "earl"));

// Returns: ["Dragon Well"]

console.log(searchTeas(data, "dragon"));

// Returns: ["English Breakfast", "Genmaicha", "Lapsang Souchong"]

console.log(searchTeas(data, "ch"));

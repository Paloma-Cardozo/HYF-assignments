import { teas as data } from "../teas.js";

// Rewrite with Array Methods

const result = data
  .filter((tea) => tea.caffeineLevel !== "none")
  .map((tea) => tea.name.toUpperCase());

console.log(result);

import { teas as data } from "../teas.js";

// Calculate the total value of all tea inventory using reduce:

const totalValue = data.reduce((sum, tea) => sum + tea.pricePerGram * tea.stockCount, 0);

console.log("Total inventory value:", totalValue);

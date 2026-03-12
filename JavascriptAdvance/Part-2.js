import { teas as data } from "./teas.js";

// Create an array containing just the tea names.

const teaNames = data.map(function getTeaNames(tea) {
  return tea.name;
});

console.log(teaNames);

// Create an array of prices in DKK for 100 grams (multiply pricePerGram by 100).

const teaPrices = data.map(function getTeaPrices(tea) {
  return Math.round(tea.pricePerGram * 100);
});

console.log(teaPrices);

// Create an array of display strings in the format: "Sencha - 12 DKK/100g"

const teaNamesAndPrices = data.map(function getTeaNamesAndPrices(tea) {
  return `${tea.name} - ${Math.round(tea.pricePerGram * 100)} DKK/100g`;
});

console.log(teaNamesAndPrices);

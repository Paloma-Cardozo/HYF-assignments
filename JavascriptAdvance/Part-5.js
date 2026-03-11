import { teas as data } from "./teas.js";

// Rewrite exercises 1-3 using arrow functions.

// 1. Log each tea's name to the console.

data.forEach((tea) => console.log(tea.name));

// 2. Log each tea in the format: "Sencha (Japan)"

data.forEach((tea) => console.log(`${tea.name} (${tea.origin})`));

// 3. Count how many teas are organic. Use a variable outside the forEach to track the count.

let count = 0;

data.forEach((tea) => {
  if (tea.organic) count = count + 1;
});

console.log(count, "teas are organic");

// Rewrite exercises 4-6 using arrow functions with implicit return (no curly braces).

// 4. Create an array containing just the tea names.

const teaNames = data.map((tea) => tea.name);

console.log(teaNames);

// 5. Create an array of prices in DKK for 100 grams (multiply pricePerGram by 100).

const teaPrices = data.map((tea) => Math.round(tea.pricePerGram * 100));

console.log(teaPrices);

// 6. Create an array of display strings in the format: "Sencha - 12 DKK/100g"

const teaNamesAndPrices = data.map(
  (tea) => `${tea.name} - ${Math.round(tea.pricePerGram * 100)} DKK/100g`,
);

console.log(teaNamesAndPrices);

// When do you need explicit return (curly braces)?
// Rewrite exercise 6 both ways:
// With implicit return (hint: use template literals inline)

const teaNamesPricesImplicit = data.map(
  (tea) => `${tea.name} - ${Math.round(tea.pricePerGram * 100)} DKK/100g`,
);

console.log(teaNamesPricesImplicit);

// With explicit return (curly braces and return keyword)

const teaNamesPricesExplicit = data.map((tea) => {
  return `${tea.name} - ${Math.round(tea.pricePerGram * 100)} DKK/100g`;
});

console.log(teaNamesPricesExplicit);

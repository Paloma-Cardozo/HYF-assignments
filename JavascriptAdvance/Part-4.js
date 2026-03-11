import { teas as data } from "./teas.js";

// Get the names of all green teas.

const greenTeas = data
  .filter(function getGreenTeas(tea) {
    return tea.type === "green";
  })
  .map(function getGreenTeaNames(tea) {
    return tea.name;
  });

console.log(greenTeas);

// Get display prices (format: "Sencha - 12 DKK/100g") for organic teas only.

const organicTeas = data
  .filter(function getOrganicTeas(tea) {
    return tea.organic;
  })
  .map(function getPricesOrganicTeas(tea) {
    return `${tea.name} - ${Math.round(tea.pricePerGram * 100)} DKK/100g`;
  });

console.log(organicTeas);

// Get Japanese teas sorted by price (lowest first).

const japaneseTeas = data
  .filter(function getJapaneseTeas(tea) {
    return tea.origin === "Japan";
  })
  .sort(function sortPrices(a, b) {
    return a.pricePerGram - b.pricePerGram;
  });

console.log(japaneseTeas);

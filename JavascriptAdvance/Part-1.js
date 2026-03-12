import { teas as data } from "./teas.js";

// Log each tea's name to the console.

data.forEach(function logTeaNames(tea) {
  console.log(tea.name);
});

// Log each tea in the format: "Sencha (Japan)"

data.forEach(function logTeaNameAndOrigin(tea) {
  console.log(`${tea.name} (${tea.origin})`);
});

// Count how many teas are organic. Use a variable outside the forEach to track the count.

let count = 0;

data.forEach(function countOrganicTea(tea) {
  if (tea.organic) {
    count = count + 1;
  }
});

console.log(count, "teas are organic");

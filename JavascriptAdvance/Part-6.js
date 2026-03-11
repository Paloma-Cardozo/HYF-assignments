import { teas as data } from "./teas.js";

// Build a filterTeas(teas, criteria) function that accepts a filter object:

function filterTeas(teas, criteria) {
  return teas.filter((tea) => 
    Object.keys(criteria).every((key) => tea[key] === criteria[key])
  );
};

// Returns all organic teas

console.log(filterTeas(data, { organic: true }));

// Returns all Japanese teas

console.log(filterTeas(data, { origin: "Japan" }));

// Returns organic Japanese teas

console.log(filterTeas(data, { organic: true, origin: "Japan" }));

// Returns green teas that are in stock

console.log(filterTeas(data, { type: "green", inStock: true }));

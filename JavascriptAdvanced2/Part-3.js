import { teas } from "./teas.js";

// Create your own myForEach(array, callback) function that works like the built-in forEach.

function myForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

myForEach(teas, function (tea) {
  console.log(tea.name);
});

// Create your own myMap(array, callback) function that works like the built-in map.

function myMap(array, callback) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }

  return result;
}

const names = myMap(teas, function (tea) {
  return tea.name;
});

console.log(names);

// Create your own myFilter(array, callback) function that works like the built-in filter.

function myFilter(array, callback) {
  const filtered = [];

  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) filtered.push(array[i]);
  }

  return filtered;
}

const organic = myFilter(teas, function (tea) {
  return tea.organic;
});

console.log(organic.length);

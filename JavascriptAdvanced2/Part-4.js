import { teas } from "./teas.js";

// What order will these console.logs appear?

console.log("1. Starting");

setTimeout(function () {
  console.log("2. Timeout done");
}, 1000);

console.log("3. Continuing");

/* 🚨 My prediction is:
"1. Starting"
"3. Continuing"
"2. Timeout done" */

// Create a function runAfterDelay(delay, callback) that waits delay milliseconds, then calls the callback.

function runAfterDelay(delay, callback) {
  setTimeout(callback, delay);
}

runAfterDelay(2000, function () {
  console.log("This runs after 2 seconds");
});

runAfterDelay(1000, function () {
  console.log("This runs after 1 second");
});

console.log("This runs immediately");

/* 🚨 My prediction is:
"This runs immediately"
"This runs after 1 second"
"This runs after 2 seconds" */

// Create a function findTeaById(id, callback) that simulates a database lookup with a 500ms delay.

function findTeaById(id, callback) {
  setTimeout(function () {
    const tea = teas.find((tea) => tea.id === id);
    callback(tea);
  }, 500);
}

console.log("Looking up tea...");

findTeaById(3, function (tea) {
  console.log("Found:", tea.name);
});

console.log("Request sent, waiting...");

/* 🚨 My prediction is:
"Looking up tea..."
"Request sent, waiting..."
"Found: Dragon Well" */

// Call findTeaById three times in a row with different IDs.

findTeaById(1, function (tea) {
  console.log("Got:", tea.name);
});

findTeaById(5, function (tea) {
  console.log("Got:", tea.name);
});

findTeaById(10, function (tea) {
  console.log("Got:", tea.name);
});

console.log("All requests sent!");

/* 🚨 My prediction is:
"All requests sent!"
"Got: Sencha"
"Got: Darjeeling"
"Got: White Peony" */

import { teas } from "./teas.js";

// Create a function that logs a tea's name and origin in the format "Sencha (Japan)".

const logTea = function (tea) {
  console.log(`${tea.name} (${tea.origin})`);
};

logTea(teas[0]);

// Create a function called functionRunner that takes a function as a parameter and calls it.

function functionRunner(fn) {
  fn();
}

functionRunner(function () {
  console.log("I was called!");
});

const greetHello = function () {
  console.log("Hello!");
};

functionRunner(greetHello);

// Create an array containing three different functions.

const functions = [
  function () {
    console.log("First");
  },
  function () {
    console.log("Second is here!");
  },
  function () {
    console.log("The last one!");
  },
];

for (let i = 0; i < functions.length; i++) {
  functions[i]();
}

// Create a function createGreeter(greeting) that returns a new function.

function createGreeter(greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

sayHello("Alice");
sayHi("Bob");

// If statements: It will give a user a message based on their bank account balance.

const balance = Number(
  prompt("How much money do you have in your bank account?")
);

if (balance <= 0) {
  console.log("Please deposit some money!");
} else if (balance <= 1000) {
  console.log("Your balance is looking okay");
} else if (balance <= 3000) {
  console.log("Your balance is looking good");
} else if (balance <= 10000) {
  console.log("Your balance is fantastic");
} else {
  console.log("Your balance is AMAZING");
}

// Functions: It should have the radius of a circle as parameter and return the circle area.

const radius = Number(prompt("What is the radius of the circle in your task?"));

function getCircleArea(radius) {
  const circleArea = Math.PI * radius ** 2;

  return circleArea;
}

const result = getCircleArea(radius);
console.log(result);

// Functions: It should have the temperature in degrees Celsius as parameter and return the temperature in Fahrenheit.

const celsius = Number(prompt("What is the temperature in degrees Celsius?"));

function convertCelsiusToFahrenheit(celsius) {
  const toFahrenheit = celsius * 1.8 + 32;

  return toFahrenheit;
}

const temperature = convertCelsiusToFahrenheit(celsius);
console.log(temperature);

// Loops:
// 1. While Loop: Create a loop that logs out the numbers from 74 - 98

const number = Number(
  prompt("Which is your favourite number between 74 and 98?")
);

function incrementByOne(number) {
  while (number >= 74 && number <= 98) {
    number = number + 1;

    console.log(number);
  }
}

incrementByOne(number);

// 2. For Loop: Create a loop that logs out the numbers from 74 - 98

function incrementStepByStep(number) {
  for (; number >= 74 && number <= 98; number = number + 1) {
    console.log(number);
  }
}

incrementStepByStep(number);

// Loops in functions:
// 1. While Loop: Create a function with two parameters (stringToLog and numberOfTimesToLog). It should log out the stringToLog the amount of times specified in numberOfTimesToLog.

const stringToLog = prompt("What do you want to say?");
const numberOfTimesToLog = Number(
  prompt("How many times do you want to say it?")
);

function printString(stringToLog, numberOfTimesToLog) {
  while (numberOfTimesToLog > 0) {
    console.log(stringToLog);

    numberOfTimesToLog--;
  }
}

printString(stringToLog, numberOfTimesToLog);

// 2. For Loop: Create a function with two parameters (stringToLog and numberOfTimesToLog). It should log out the stringToLog the amount of times specified in numberOfTimesToLog.

function logString(stringToLog, numberOfTimesToLog) {
  for (; numberOfTimesToLog > 0; numberOfTimesToLog--) {
    console.log(stringToLog);
  }
}

logString(stringToLog, numberOfTimesToLog);

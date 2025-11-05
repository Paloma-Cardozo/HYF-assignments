console.log("Hello World");

//first exercise: Create a variable that is 24 times 55

const exercise1 = 24 * 55;
console.log(exercise1);

//second exercise: Create a const and set it to be equal to your name

const myName = "Paloma";
console.log(myName);

const exercise2 = "Paloma" == myName;
console.log(exercise2);

//exercise 3: With javascript console.log the first character in your name

console.log(myName[0]);

//exercise 4: Create an array with 3 strings, three numbers and three booleans

const newArray = [
  "Paloma: ",
  "She has a daughter, Matilde,",
  "who is 11 years old.",
  2 * 80,
  11 / 3,
  58 % 9,
  1 === 2,
  9 >= 8,
  56984 !== 56984,
];

console.log(newArray);

for (const element of newArray) {
  console.log(typeof element);
}

//exercise 5: console.log the 4. element in the array made above

console.log(newArray[3]);

//exercise 6: With javascript console.log the last character in your name.

console.log(myName[myName.length - 1]);

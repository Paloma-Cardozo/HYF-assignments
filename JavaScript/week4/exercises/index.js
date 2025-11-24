// ⭐ Fibonacci sequence

let values = [0, 1];

function getFibonacciNumber(numberPosition) {
  if (numberPosition <= 0) {
    console.error("Not allowed");
    return;
  }

  for (let i = 2; i <= numberPosition; i++) {
    const result = values[i - 1] + values[i - 2];
    values.push(result);
  }

  return values[numberPosition - 1];
}

const Fibonacci = getFibonacciNumber(
  Number(prompt("Enter a position number in the Fibonacci sequence:"))
);
console.log(
  "The number in the Fibonacci sequence at that position is: " + Fibonacci
);

// ⭐ Fizz Buzz

function printNumbers(a, b) {
  for (let i = 1; i <= 100; i++) {
    if (i % a === 0 && i % b === 0) {
      console.log("FizzBuzz");
    } else if (i % a === 0) {
      console.log("Fizz");
    } else if (i % b === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

console.log("Let's find multiples by playing FizzBuzz:");
const FizzBuzz = printNumbers(
  Number(prompt("Enter first number:")),
  Number(prompt("Enter second number:"))
);

// ⭐ Sentiment analyser

let positiveWords = {
  love: 20,
  cute: 20,
  sweet: 20,
  lovely: 20,
  pretty: 20,
  smart: 20,
  kind: 20,
  amazing: 20,
  awesome: 20,
  happy: 20,
  cheerful: 20,
  brilliant: 20,
  friendly: 20,
  adorable: 20,
  wonderful: 20,
  fantastic: 20,
  pleasant: 20,
  excellent: 20,
};
let negativeWords = {
  stupid: -20,
  ugly: -20,
  idiot: -20,
  old: -20,
  hate: -20,
  boring: -20,
  angry: -20,
  sad: -20,
  annoying: -20,
  terrible: -20,
  awful: -20,
  horrible: -20,
  mean: -20,
  cruel: -20,
  lazy: -20,
  nasty: -20,
};

const sentence = prompt(
  "Write the first sentence that come to your mind when thinking about your friend"
);

function getSentimentScore(sentence) {
  const sentimentScoreObject = {
    score: 0,
    positiveWords: [],
    negativeWords: [],
  };

  const words = sentence.toLowerCase().split(" ");

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (positiveWords[word]) {
      sentimentScoreObject.score += positiveWords[word];
      sentimentScoreObject.positiveWords.push(word);
    } else if (negativeWords[word]) {
      sentimentScoreObject.score += negativeWords[word];
      sentimentScoreObject.negativeWords.push(word);
    }
  }

  return sentimentScoreObject;
}

const result = getSentimentScore(sentence);
console.log("Sentiment analysis result:", result);

/*



Find characters
let character = {};
const abc = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
function getCharacterFrequencies(sentence, abc) {
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] == abc[i]) {
      character.push();
    }
  }
}

console.log(getCharacterFrequencies("happy"));*/
/*
function getCharacterFrequencies(word) {
  const output = {
    characters: [],
    length: word.length,
  };

  for (let i = 0; i < word.length; i++) {}
}





{
  characters: [
    {
      character: 'a',
      count: 1
    },
    {
      character: 'h',
      count: 1
    },
    {
      character: 'p',
      count: 2
    },
    {
      character: 'y',
      count: 1
    }
  ], length: 5
}
*/

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
  "Write down the first five words that come to mind when you think of your friend"
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

    if (
      positiveWords[word] === undefined &&
      negativeWords[word] === undefined
    ) {
      console.log(
        `Your word: "${word}" is neutral according to the dictionary of feelings.`
      );
    } else if (positiveWords[word]) {
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
console.log("Result of the sentiment analysis of your words:", result);

// ⭐ Count characters

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

function getCharacterFrequencies(sentenceToCount, abc) {
  const lowerSentence = sentenceToCount.toLowerCase();
  const characterCounts = {};

  for (let i = 0; i < lowerSentence.length; i++) {
    const character = lowerSentence[i];

    if (abc.includes(character)) {
      characterCounts[character] = (characterCounts[character] || 0) + 1;
    }
  }

  const charactersArray = [];
  for (let i = 0; i < abc.length; i++) {
    const character = abc[i];
    if (characterCounts[character]) {
      charactersArray.push({
        character: character,
        count: characterCounts[character],
      });
    }
  }

  return {
    characters: charactersArray,
    length: charactersArray.reduce((sum, c) => sum + c.count, 0),
  };
}

const sentenceToCount = prompt(
  "Enter a sentence to have its characters counted:"
);
console.log(getCharacterFrequencies(sentenceToCount, abc));

// ⭐ Palindromic substring

function longestPalindrome(string) {
  let longest = "";

  for (let i = 0; i < string.length; i++) {
    let oddPalindrome = expandAroundCenter(string, i, i);
    if (oddPalindrome.length > longest.length) {
      longest = oddPalindrome;
    }

    let evenPalindrome = expandAroundCenter(string, i, i + 1);
    if (evenPalindrome.length > longest.length) {
      longest = evenPalindrome;
    }
  }

  return longest;
}

function expandAroundCenter(string, left, right) {
  while (left >= 0 && right < string.length && string[left] === string[right]) {
    left--;
    right++;
  }

  return string.slice(left + 1, right);
}

const string = prompt("Enter a word to find its greatest palindrome:");
console.log(longestPalindrome(string));

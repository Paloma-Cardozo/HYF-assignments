const dogName = prompt("What is your dog's name? 🐶");

const dogYearOfBirth = Number(prompt("What year was your dog born? 🗓️"));

const dogYearFuture = Number(
  prompt("Which future year do you want to check? 🗓️")
);

const shouldShowResultInDogYears = prompt(
  "Do you want to see the result in dog years? (yes/no) 🐶"
).toLowerCase();

const dogAgeInHumanYears = dogYearFuture - dogYearOfBirth;

const dogAgeInDogYears = dogAgeInHumanYears * 7;

let resultMessage = "";

if (shouldShowResultInDogYears === "yes") {
  resultMessage = `Your dog ${dogName} will be ${dogAgeInDogYears} dog years old in ${dogYearFuture}. 🐾`;
} else {
  resultMessage = `Your dog ${dogName} will be ${dogAgeInHumanYears} human years old in ${dogYearFuture}. 🐾`;
}

console.log(resultMessage);

document.getElementById("dog-age").innerHTML = `
  <p class="result">${resultMessage}</p>`;

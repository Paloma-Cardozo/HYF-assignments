const yearOfBirth = Number(prompt("What year were you born? 🗓️"));

const yearFuture = Number(prompt("Which future year do you want to check? 🗓️"));

const age = yearFuture - yearOfBirth;

console.log(`You will be ${age} years old in ${yearFuture}. 🎊`);

document.getElementById("age-ify").innerHTML = `
  <p class="result">You will be <strong>${age}</strong> years old in <strong>${yearFuture}</strong>. 🎊</p>
`;

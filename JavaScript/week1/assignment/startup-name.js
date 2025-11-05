const firstWords = [
  "Smart",
  "Future",
  "Easy",
  "Digital",
  "Next",
  "Happy",
  "Bright",
  "Fast",
  "Green",
  "Magic",
];

const secondWords = [
  "Solutions",
  "Hub",
  "Corp",
  "Network",
  "Systems",
  "Studio",
  "Works",
  "Factory",
  "Project",
  "Vision",
];

const randomNumber = Math.floor(Math.random() * 10);

const startupName = firstWords[randomNumber] + " " + secondWords[randomNumber];

const ideaOfName = `The new startup name is "${startupName}". It contains ${startupName.length} characters 👏🏻`;

console.log(ideaOfName);

document.getElementById("startup-name").innerHTML = `
    <p class="result">${ideaOfName}</p>`;

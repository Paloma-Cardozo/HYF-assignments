const width = Number(prompt("How many meters is your house wide?"));
const depth = Number(prompt("How many meters is your house deep?"));
const height = Number(prompt("How many meters is your house high?"));
const gardenSizeInM2 = Number(prompt("How many meters is your garden size?"));
const cost = Number(prompt("How much does your future house cost?"));

function checkHouseMarket(width, depth, height, gardenSizeInM2, cost) {
  const volumeInMeters = width * depth * height;
  const housePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;

  if (housePrice < cost) {
    return `You are paying too much! 💸. The estimated price is ${housePrice}, but the house costs ${cost} 🏡`;
  } else if (housePrice > cost) {
    return `You are paying too little! 💵. The estimated price is ${housePrice}, but the house costs ${cost} 🏡`;
  } else {
    return `You are paying the perfect price! 🏡.`;
  }
}

const message = checkHouseMarket(width, depth, height, gardenSizeInM2, cost);

console.log(message);

document.getElementById("house-price").innerHTML = `
  <p class="result">${message}</p>
`;

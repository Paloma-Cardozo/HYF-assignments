const boughtCandyPrices = [];
const amountToSpend = Math.random() * 100;
const pricePerGram = {
  sweet: 0.5,
  chocolate: 0.7,
  toffee: 1.1,
  chewing_gum: 0.03,
};

function addCandy(candyType, weight) {
  if (!pricePerGram[candyType]) {
    return `Unknown candy type: ${candyType}`;
  }

  const price = weight * pricePerGram[candyType];
  boughtCandyPrices.push(price);

  return `Added ${weight}g of ${candyType} for ${price}$.`;
}

function canBuyMoreCandy() {
  const totalSpent = boughtCandyPrices.reduce((sum, price) => sum + price, 0);

  if (totalSpent < amountToSpend) {
    return "You can buy more, so please do! 🍬🍭🍫";
  } else {
    return "Enough candy for you! 💸";
  }
}

document.getElementById("addCandyButton").addEventListener("click", () => {
  const candyType = document
    .getElementById("candyType")
    .value.trim()
    .toLowerCase();
  const weight = Number(document.getElementById("candyQuantity").value);

  const message = addCandy(candyType, weight);
  const moreCandyMessage = canBuyMoreCandy();

  document.getElementById(
    "candyHelperApp"
  ).innerHTML = `<p>${message}</p><p>${moreCandyMessage}</p>`;
});
